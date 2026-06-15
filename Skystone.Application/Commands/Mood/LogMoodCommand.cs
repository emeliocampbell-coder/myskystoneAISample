using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;
using Skystone.Domain.Entities;

namespace Skystone.Application.Commands.Mood;

public record LogMoodCommand(Guid UserId, int? MoodScore, int? SleepScore, int? EnergyScore, bool Skipped) : ICommand<MoodLogDto>;

public class LogMoodValidator : AbstractValidator<LogMoodCommand>
{
    public LogMoodValidator()
    {
        When(x => !x.Skipped, () =>
        {
            RuleFor(x => x.MoodScore).InclusiveBetween(1, 5);
            RuleFor(x => x.SleepScore).InclusiveBetween(1, 5);
            RuleFor(x => x.EnergyScore).InclusiveBetween(1, 5);
        });
    }
}

public class LogMoodHandler(IAppDbContext db) : ICommandHandler<LogMoodCommand, MoodLogDto>
{
    public async Task<MoodLogDto> HandleAsync(LogMoodCommand command, CancellationToken cancellationToken = default)
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var existing = await db.MoodLogs.FirstOrDefaultAsync(m => m.UserId == command.UserId && m.Date == today, cancellationToken);

        if (existing is not null)
        {
            existing.MoodScore = command.MoodScore;
            existing.SleepScore = command.SleepScore;
            existing.EnergyScore = command.EnergyScore;
            existing.Skipped = command.Skipped;
        }
        else
        {
            existing = new MoodLog
            {
                Id = Guid.NewGuid(),
                UserId = command.UserId,
                Date = today,
                MoodScore = command.MoodScore,
                SleepScore = command.SleepScore,
                EnergyScore = command.EnergyScore,
                Skipped = command.Skipped,
                CreatedAt = DateTime.UtcNow
            };
            db.MoodLogs.Add(existing);
        }

        await db.SaveChangesAsync(cancellationToken);
        return new MoodLogDto(existing.Id, existing.Date, existing.MoodScore, existing.SleepScore, existing.EnergyScore, existing.Skipped, existing.CreatedAt);
    }
}
