using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skystone.Application.Commands.Onboarding;
using Skystone.Application.CQRS;
using Skystone.Application.Queries.Modules;
using System.Security.Claims;

namespace Skystone.Api.Controllers;

[ApiController]
[Route("api/onboarding")]
[Authorize]
public class OnboardingController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet("companions")]
    public async Task<IActionResult> GetCompanions()
        => Ok(await dispatcher.QueryAsync(new GetCompanionsQuery()));

    [HttpPost("companion")]
    public async Task<IActionResult> SelectCompanion([FromBody] SelectCompanionRequest req)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await dispatcher.SendAsync(new SelectCompanionCommand(userId, req.CompanionId));
        return NoContent();
    }

    [HttpPost("privacy")]
    public async Task<IActionResult> SavePrivacy([FromBody] SavePrivacySettingsCommand req)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await dispatcher.SendAsync(req with { UserId = userId });
        return NoContent();
    }
}

public record SelectCompanionRequest(Guid CompanionId);
