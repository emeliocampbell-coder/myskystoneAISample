using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Queries.Badges;

public record GetUserBadgesQuery(Guid UserId) : IQuery<IEnumerable<BadgeDto>>;

public class GetUserBadgesHandler(IAppDbContext db) : IQueryHandler<GetUserBadgesQuery, IEnumerable<BadgeDto>>
{
    public async Task<IEnumerable<BadgeDto>> HandleAsync(GetUserBadgesQuery query, CancellationToken cancellationToken = default)
    {
        var allBadges = await db.Badges.ToListAsync(cancellationToken);
        var earned = await db.UserBadges
            .Where(ub => ub.UserId == query.UserId)
            .ToListAsync(cancellationToken);

        var earnedMap = earned.ToDictionary(ub => ub.BadgeId);

        return allBadges.Select(b =>
        {
            var isEarned = earnedMap.TryGetValue(b.Id, out var ub);
            return new BadgeDto(b.Id, b.Name, b.Description, b.IconName, b.Tier.ToString(), b.Criteria, isEarned, isEarned ? ub!.AwardedAt : null);
        }).OrderByDescending(b => b.IsEarned).ThenBy(b => b.Tier);
    }
}
