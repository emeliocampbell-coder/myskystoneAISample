using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skystone.Application.Commands.Auth;
using Skystone.Application.CQRS;
using Skystone.Application.Queries.Auth;
using System.Security.Claims;

namespace Skystone.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IDispatcher dispatcher) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
        => Ok(await dispatcher.SendAsync(command));

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
        => Ok(await dispatcher.SendAsync(command));

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> Me()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(await dispatcher.QueryAsync(new GetCurrentUserQuery(userId)));
    }
}
