using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;
using Skystone.Domain.Entities;
using Skystone.Domain.Enums;

namespace Skystone.Application.Commands.Auth;

public record RegisterUserCommand(string Email, string Name, string Password, string Role = "Student") : ICommand<AuthResponseDto>;

public class RegisterUserValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
    }
}

public class RegisterUserHandler(IAppDbContext db, ITokenService tokenService) : ICommandHandler<RegisterUserCommand, AuthResponseDto>
{
    public async Task<AuthResponseDto> HandleAsync(RegisterUserCommand command, CancellationToken cancellationToken = default)
    {
        if (await db.Users.AnyAsync(u => u.Email == command.Email, cancellationToken))
            throw new UnauthorizedException("Email already registered.");

        var role = Enum.TryParse<UserRole>(command.Role, true, out var parsed) ? parsed : UserRole.Student;

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = command.Email.ToLowerInvariant(),
            Name = command.Name,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(command.Password),
            Role = role
        };

        db.Users.Add(user);
        await db.SaveChangesAsync(cancellationToken);

        var token = tokenService.GenerateToken(user);
        var dto = new UserDto(user.Id, user.Email, user.Name, user.Role.ToString(), user.CompanionId, user.OnboardingComplete);
        return new AuthResponseDto(token, dto);
    }
}
