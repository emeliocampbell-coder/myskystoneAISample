using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Queries.Modules;

public record GetModuleByIdQuery(Guid ModuleId) : IQuery<ModuleDto>;

public class GetModuleByIdHandler(IAppDbContext db) : IQueryHandler<GetModuleByIdQuery, ModuleDto>
{
    public async Task<ModuleDto> HandleAsync(GetModuleByIdQuery query, CancellationToken cancellationToken = default)
    {
        var m = await db.Modules.FindAsync([query.ModuleId], cancellationToken)
            ?? throw new NotFoundException($"Module {query.ModuleId} not found.");

        return new ModuleDto(m.Id, m.Title, m.Description, m.LongDescription, m.IconName, m.EstimatedHours, m.OrderIndex, m.IsLocked);
    }
}
