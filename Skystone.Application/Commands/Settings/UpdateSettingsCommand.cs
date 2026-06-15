using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;
using Skystone.Domain.Entities;

namespace Skystone.Application.Commands.Settings;

public record UpdateSettingsCommand(
    Guid UserId,
    bool AllowPatternRecognition,
    bool AllowEpiphanyAutoSave,
    bool AllowEducatorSummaries,
    bool HearArloSpeak,
    bool AllowMicrophone) : ICommand<PrivacySettingsDto>;

public class UpdateSettingsHandler(IAppDbContext db) : ICommandHandler<UpdateSettingsCommand, PrivacySettingsDto>
{
    public async Task<PrivacySettingsDto> HandleAsync(UpdateSettingsCommand command, CancellationToken cancellationToken = default)
    {
        var settings = await db.PrivacySettings.FirstOrDefaultAsync(p => p.UserId == command.UserId, cancellationToken);

        if (settings is null)
        {
            settings = new PrivacySettings { Id = Guid.NewGuid(), UserId = command.UserId };
            db.PrivacySettings.Add(settings);
        }

        settings.AllowPatternRecognition = command.AllowPatternRecognition;
        settings.AllowEpiphanyAutoSave = command.AllowEpiphanyAutoSave;
        settings.AllowEducatorSummaries = command.AllowEducatorSummaries;
        settings.HearArloSpeak = command.HearArloSpeak;
        settings.AllowMicrophone = command.AllowMicrophone;

        await db.SaveChangesAsync(cancellationToken);

        return new PrivacySettingsDto(settings.AllowPatternRecognition, settings.AllowEpiphanyAutoSave,
            settings.AllowEducatorSummaries, settings.HearArloSpeak, settings.AllowMicrophone);
    }
}
