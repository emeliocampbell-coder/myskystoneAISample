using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;
using Skystone.Domain.Entities;

namespace Skystone.Application.Commands.Badges;

public record CheckAndAwardBadgesCommand(Guid UserId) : ICommand<IEnumerable<BadgeDto>>;

public class CheckAndAwardBadgesHandler(IAppDbContext db) : ICommandHandler<CheckAndAwardBadgesCommand, IEnumerable<BadgeDto>>
{
    public async Task<IEnumerable<BadgeDto>> HandleAsync(CheckAndAwardBadgesCommand command, CancellationToken cancellationToken = default)
    {
        var allBadges = await db.Badges.ToListAsync(cancellationToken);
        var earned = await db.UserBadges.Where(ub => ub.UserId == command.UserId).ToListAsync(cancellationToken);
        var earnedIds = earned.Select(e => e.BadgeId).ToHashSet();

        var journalCount = await db.JournalEntries.CountAsync(j => j.UserId == command.UserId, cancellationToken);
        var vaultCount = await db.VaultItems.CountAsync(v => v.UserId == command.UserId, cancellationToken);
        var keptReflections = await db.Reflections.CountAsync(r => r.JournalEntry.UserId == command.UserId && r.Status == Domain.Enums.ReflectionStatus.Kept, cancellationToken);
        var acceptedObs = await db.Observations.CountAsync(o => o.UserId == command.UserId && o.Status == Domain.Enums.ObservationStatus.Accepted, cancellationToken);
        var user = await db.Users.FindAsync([command.UserId], cancellationToken);
        var moduleSessionCount = await db.JournalEntries.CountAsync(j => j.UserId == command.UserId && j.ModuleId != null, cancellationToken);

        var conditionsMet = new Dictionary<string, bool>
        {
            ["first_journal_entry"] = journalCount >= 1,
            ["first_vault_item"] = vaultCount >= 1,
            ["first_observation_accepted"] = acceptedObs >= 1,
            ["first_module_session"] = moduleSessionCount >= 1,
            ["onboarding_complete"] = user?.OnboardingComplete == true,
            ["five_reflections_kept"] = keptReflections >= 5,
            ["ten_vault_items"] = vaultCount >= 10,
        };

        var newlyAwarded = new List<UserBadge>();
        foreach (var badge in allBadges.Where(b => !earnedIds.Contains(b.Id)))
        {
            if (conditionsMet.TryGetValue(badge.Criteria, out var met) && met)
            {
                var ub = new UserBadge { Id = Guid.NewGuid(), UserId = command.UserId, BadgeId = badge.Id, AwardedAt = DateTime.UtcNow };
                newlyAwarded.Add(ub);
                db.UserBadges.Add(ub);
            }
        }

        if (newlyAwarded.Count > 0)
            await db.SaveChangesAsync(cancellationToken);

        return newlyAwarded.Select(ub =>
        {
            var b = allBadges.First(x => x.Id == ub.BadgeId);
            return new BadgeDto(b.Id, b.Name, b.Description, b.IconName, b.Tier.ToString(), b.Criteria, true, ub.AwardedAt);
        });
    }
}
