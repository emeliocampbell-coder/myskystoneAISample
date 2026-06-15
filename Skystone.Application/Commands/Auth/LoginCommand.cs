using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Commands.Auth;

public record LoginCommand(string Email, string Password) : ICommand<AuthResponseDto>;

public class LoginValidator : AbstractValidator<LoginCommand>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty();
    }
}

public class LoginHandler(IAppDbContext db, ITokenService tokenService) : ICommandHandler<LoginCommand, AuthResponseDto>
{
    public async Task<AuthResponseDto> HandleAsync(LoginCommand command, CancellationToken cancellationToken = default)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == command.Email.ToLowerInvariant(), cancellationToken)
            ?? throw new UnauthorizedException("Invalid credentials.");

        if (!BCrypt.Net.BCrypt.Verify(command.Password, user.PasswordHash))
            throw new UnauthorizedException("Invalid credentials.");

        var token = tokenService.GenerateToken(user);
        var dto = new UserDto(user.Id, user.Email, user.Name, user.Role.ToString(), user.CompanionId, user.OnboardingComplete);
        return new AuthResponseDto(token, dto);
    }
}
