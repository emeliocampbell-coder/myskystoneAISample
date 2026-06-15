using FluentValidation;
using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;
using Skystone.Domain.Entities;

namespace Skystone.Application.Commands.Vault;

public record SaveVaultItemCommand(Guid UserId, string Title, string ArloQuote, string? UserNote, string Tag, Guid? ModuleId) : ICommand<VaultItemDto>;

public class SaveVaultItemValidator : AbstractValidator<SaveVaultItemCommand>
{
    public SaveVaultItemValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.ArloQuote).NotEmpty().MaximumLength(1000);
    }
}

public class SaveVaultItemHandler(IAppDbContext db) : ICommandHandler<SaveVaultItemCommand, VaultItemDto>
{
    public async Task<VaultItemDto> HandleAsync(SaveVaultItemCommand command, CancellationToken cancellationToken = default)
    {
        _ = await db.Users.FindAsync([command.UserId], cancellationToken)
            ?? throw new NotFoundException("User not found.");

        var item = new VaultItem
        {
            Id = Guid.NewGuid(),
            UserId = command.UserId,
            Title = command.Title,
            ArloQuote = command.ArloQuote,
            UserNote = command.UserNote,
            Tag = command.Tag,
            ModuleId = command.ModuleId,
            CreatedAt = DateTime.UtcNow
        };

        db.VaultItems.Add(item);
        await db.SaveChangesAsync(cancellationToken);

        return new VaultItemDto(item.Id, item.Title, item.ArloQuote, item.UserNote, item.Tag, item.ModuleId, item.CreatedAt);
    }
}
