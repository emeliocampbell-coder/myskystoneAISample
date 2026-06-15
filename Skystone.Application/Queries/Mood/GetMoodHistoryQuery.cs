using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Queries.Mood;

public record GetMoodHistoryQuery(Guid UserId, int Days = 30) : IQuery<IEnumerable<MoodLogDto>>;

public class GetMoodHistoryHandler(IAppDbContext db) : IQueryHandler<GetMoodHistoryQuery, IEnumerable<MoodLogDto>>
{
    public async Task<IEnumerable<MoodLogDto>> HandleAsync(GetMoodHistoryQuery query, CancellationToken cancellationToken = default)
    {
        var since = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-query.Days));
        return await db.MoodLogs
            .Where(m => m.UserId == query.UserId && m.Date >= since)
            .OrderByDescending(m => m.Date)
            .Select(m => new MoodLogDto(m.Id, m.Date, m.MoodScore, m.SleepScore, m.EnergyScore, m.Skipped, m.CreatedAt))
            .ToListAsync(cancellationToken);
    }
}
