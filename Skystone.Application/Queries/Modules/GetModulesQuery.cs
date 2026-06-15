using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Queries.Modules;

public record GetModulesQuery : IQuery<IEnumerable<ModuleDto>>;

public class GetModulesHandler(IAppDbContext db) : IQueryHandler<GetModulesQuery, IEnumerable<ModuleDto>>
{
    public async Task<IEnumerable<ModuleDto>> HandleAsync(GetModulesQuery query, CancellationToken cancellationToken = default)
    {
        return await db.Modules
            .OrderBy(m => m.OrderIndex)
            .Select(m => new ModuleDto(m.Id, m.Title, m.Description, m.LongDescription, m.IconName, m.EstimatedHours, m.OrderIndex, m.IsLocked))
            .ToListAsync(cancellationToken);
    }
}
