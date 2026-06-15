using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skystone.Application.Commands.Settings;
using Skystone.Application.CQRS;
using Skystone.Application.Queries.Profile;
using System.Security.Claims;

namespace Skystone.Api.Controllers;

[ApiController]
[Route("api/settings")]
[Authorize]
public class SettingsController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(await dispatcher.QueryAsync(new GetSettingsQuery(userId)));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateSettings([FromBody] UpdateSettingsCommand req)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await dispatcher.SendAsync(req with { UserId = userId });
        return Ok(result);
    }
}
