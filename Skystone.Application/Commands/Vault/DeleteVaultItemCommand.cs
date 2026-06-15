using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;

namespace Skystone.Application.Commands.Vault;

public record DeleteVaultItemCommand(Guid ItemId, Guid UserId) : ICommand<Unit>;

public class DeleteVaultItemHandler(IAppDbContext db) : ICommandHandler<DeleteVaultItemCommand, Unit>
{
    public async Task<Unit> HandleAsync(DeleteVaultItemCommand command, CancellationToken cancellationToken = default)
    {
        var item = await db.VaultItems.FindAsync([command.ItemId], cancellationToken)
            ?? throw new NotFoundException("Vault item not found.");

        if (item.UserId != command.UserId)
            throw new UnauthorizedException("Not authorized.");

        db.VaultItems.Remove(item);
        await db.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}
