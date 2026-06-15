using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skystone.Application.Commands.Profile;
using Skystone.Application.CQRS;
using Skystone.Application.Queries.Profile;
using System.Security.Claims;

namespace Skystone.Api.Controllers;

[ApiController]
[Route("api/profile")]
[Authorize]
public class ProfileController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(await dispatcher.QueryAsync(new GetLearnerProfileQuery(userId)));
    }

    [HttpPost("observations/{observationId:guid}/status")]
    public async Task<IActionResult> SetObservationStatus(Guid observationId, [FromBody] SetObservationStatusRequest req)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await dispatcher.SendAsync(new SetObservationStatusCommand(observationId, userId, req.Status));
        return NoContent();
    }
}

public record SetObservationStatusRequest(string Status);
