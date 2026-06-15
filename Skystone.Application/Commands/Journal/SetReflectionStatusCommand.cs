using FluentValidation;
using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Domain.Enums;

namespace Skystone.Application.Commands.Journal;

public record SetReflectionStatusCommand(Guid ReflectionId, Guid UserId, string Status) : ICommand<Unit>;

public class SetReflectionStatusValidator : AbstractValidator<SetReflectionStatusCommand>
{
    public SetReflectionStatusValidator()
    {
        RuleFor(x => x.ReflectionId).NotEmpty();
        RuleFor(x => x.Status).Must(s => Enum.TryParse<ReflectionStatus>(s, true, out _))
            .WithMessage("Status must be one of: Kept, Edited, Dismissed");
    }
}

public class SetReflectionStatusHandler(IAppDbContext db) : ICommandHandler<SetReflectionStatusCommand, Unit>
{
    public async Task<Unit> HandleAsync(SetReflectionStatusCommand command, CancellationToken cancellationToken = default)
    {
        var reflection = await db.Reflections.FindAsync([command.ReflectionId], cancellationToken)
            ?? throw new NotFoundException("Reflection not found.");

        reflection.Status = Enum.Parse<ReflectionStatus>(command.Status, true);
        await db.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
