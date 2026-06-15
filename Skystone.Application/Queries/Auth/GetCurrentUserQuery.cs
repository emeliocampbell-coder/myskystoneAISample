using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Queries.Auth;

public record GetCurrentUserQuery(Guid UserId) : IQuery<UserDto>;

public class GetCurrentUserHandler(IAppDbContext db) : IQueryHandler<GetCurrentUserQuery, UserDto>
{
    public async Task<UserDto> HandleAsync(GetCurrentUserQuery query, CancellationToken cancellationToken = default)
    {
        var user = await db.Users.FindAsync([query.UserId], cancellationToken)
            ?? throw new NotFoundException("User not found.");

        return new UserDto(user.Id, user.Email, user.Name, user.Role.ToString(), user.CompanionId, user.OnboardingComplete);
    }
}
