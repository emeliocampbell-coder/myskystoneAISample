using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Queries.Profile;

public record GetSettingsQuery(Guid UserId) : IQuery<PrivacySettingsDto>;

public class GetSettingsHandler(IAppDbContext db) : IQueryHandler<GetSettingsQuery, PrivacySettingsDto>
{
    public async Task<PrivacySettingsDto> HandleAsync(GetSettingsQuery query, CancellationToken cancellationToken = default)
    {
        var settings = await db.PrivacySettings.FirstOrDefaultAsync(p => p.UserId == query.UserId, cancellationToken);
        return new PrivacySettingsDto(
            settings?.AllowPatternRecognition ?? true,
            settings?.AllowEpiphanyAutoSave ?? true,
            settings?.AllowEducatorSummaries ?? true,
            settings?.HearArloSpeak ?? true,
            settings?.AllowMicrophone ?? true
        );
    }
}
