using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Domain.Entities;

namespace Skystone.Application.Commands.Onboarding;

public record SavePrivacySettingsCommand(
    Guid UserId,
    bool AllowPatternRecognition,
    bool AllowEpiphanyAutoSave,
    bool AllowEducatorSummaries,
    bool HearArloSpeak,
    bool AllowMicrophone) : ICommand<Unit>;

public class SavePrivacySettingsHandler(IAppDbContext db) : ICommandHandler<SavePrivacySettingsCommand, Unit>
{
    public async Task<Unit> HandleAsync(SavePrivacySettingsCommand command, CancellationToken cancellationToken = default)
    {
        var user = await db.Users.FindAsync([command.UserId], cancellationToken)
            ?? throw new NotFoundException("User not found.");

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

        user.OnboardingComplete = true;
        await db.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
