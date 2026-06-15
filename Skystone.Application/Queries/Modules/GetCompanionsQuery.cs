using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Queries.Modules;

public record GetCompanionsQuery : IQuery<IEnumerable<CompanionDto>>;

public class GetCompanionsHandler(IAppDbContext db) : IQueryHandler<GetCompanionsQuery, IEnumerable<CompanionDto>>
{
    public async Task<IEnumerable<CompanionDto>> HandleAsync(GetCompanionsQuery query, CancellationToken cancellationToken = default)
    {
        return await db.Companions
            .Select(c => new CompanionDto(c.Id, c.Name, c.Persona, c.Description, c.ImageUrl, c.IconName))
            .ToListAsync(cancellationToken);
    }
}
