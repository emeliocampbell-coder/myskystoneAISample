using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Queries.Journal;

public record GetJournalEntriesQuery(Guid UserId, Guid? ModuleId = null) : IQuery<IEnumerable<JournalEntryDto>>;

public class GetJournalEntriesHandler(IAppDbContext db) : IQueryHandler<GetJournalEntriesQuery, IEnumerable<JournalEntryDto>>
{
    public async Task<IEnumerable<JournalEntryDto>> HandleAsync(GetJournalEntriesQuery query, CancellationToken cancellationToken = default)
    {
        var q = db.JournalEntries
            .Include(j => j.Reflections)
            .Where(j => j.UserId == query.UserId);

        if (query.ModuleId.HasValue)
            q = q.Where(j => j.ModuleId == query.ModuleId);

        return await q
            .OrderByDescending(j => j.CreatedAt)
            .Select(j => new JournalEntryDto(
                j.Id, j.Content, j.ModuleId, j.CreatedAt,
                j.Reflections.Select(r => new ReflectionDto(r.Id, r.ArloText, r.FollowUpQuestion, r.Status.ToString(), r.CreatedAt))
            ))
            .ToListAsync(cancellationToken);
    }
}
