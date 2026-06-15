using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Domain.Enums;

namespace Skystone.Application.Commands.Profile;

public record SetObservationStatusCommand(Guid ObservationId, Guid UserId, string Status) : ICommand<Unit>;

public class SetObservationStatusHandler(IAppDbContext db) : ICommandHandler<SetObservationStatusCommand, Unit>
{
    public async Task<Unit> HandleAsync(SetObservationStatusCommand command, CancellationToken cancellationToken = default)
    {
        var obs = await db.Observations.FindAsync([command.ObservationId], cancellationToken)
            ?? throw new NotFoundException("Observation not found.");

        if (obs.UserId != command.UserId)
            throw new UnauthorizedException("Not authorized.");

        obs.Status = Enum.Parse<ObservationStatus>(command.Status, true);
        await db.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
