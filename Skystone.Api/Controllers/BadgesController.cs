using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skystone.Application.CQRS;
using Skystone.Application.Queries.Badges;
using System.Security.Claims;

namespace Skystone.Api.Controllers;

[ApiController]
[Route("api/badges")]
[Authorize]
public class BadgesController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetBadges()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(await dispatcher.QueryAsync(new GetUserBadgesQuery(userId)));
    }
}
