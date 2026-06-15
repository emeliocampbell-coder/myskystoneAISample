using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;

namespace Skystone.Application.Commands.Onboarding;

public record SelectCompanionCommand(Guid UserId, Guid CompanionId) : ICommand<Unit>;

public class SelectCompanionValidator : AbstractValidator<SelectCompanionCommand>
{
    public SelectCompanionValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.CompanionId).NotEmpty();
    }
}

public class SelectCompanionHandler(IAppDbContext db) : ICommandHandler<SelectCompanionCommand, Unit>
{
    public async Task<Unit> HandleAsync(SelectCompanionCommand command, CancellationToken cancellationToken = default)
    {
        var user = await db.Users.FindAsync([command.UserId], cancellationToken)
            ?? throw new NotFoundException("User not found.");

        var companionExists = await db.Companions.AnyAsync(c => c.Id == command.CompanionId, cancellationToken);
        if (!companionExists) throw new NotFoundException("Companion not found.");

        user.CompanionId = command.CompanionId;
        await db.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
