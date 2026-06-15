using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Queries.Vault;

public record GetVaultItemsQuery(Guid UserId, string? Tag = null) : IQuery<IEnumerable<VaultItemDto>>;

public class GetVaultItemsHandler(IAppDbContext db) : IQueryHandler<GetVaultItemsQuery, IEnumerable<VaultItemDto>>
{
    public async Task<IEnumerable<VaultItemDto>> HandleAsync(GetVaultItemsQuery query, CancellationToken cancellationToken = default)
    {
        var q = db.VaultItems.Where(v => v.UserId == query.UserId);

        if (!string.IsNullOrEmpty(query.Tag))
            q = q.Where(v => v.Tag == query.Tag);

        return await q
            .OrderByDescending(v => v.CreatedAt)
            .Select(v => new VaultItemDto(v.Id, v.Title, v.ArloQuote, v.UserNote, v.Tag, v.ModuleId, v.CreatedAt))
            .ToListAsync(cancellationToken);
    }
}
