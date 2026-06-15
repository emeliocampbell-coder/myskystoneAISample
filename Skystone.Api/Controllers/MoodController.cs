using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skystone.Application.Commands.Mood;
using Skystone.Application.CQRS;
using Skystone.Application.Queries.Mood;
using System.Security.Claims;

namespace Skystone.Api.Controllers;

[ApiController]
[Route("api/mood")]
[Authorize]
public class MoodController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetHistory([FromQuery] int days = 30)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(await dispatcher.QueryAsync(new GetMoodHistoryQuery(userId, days)));
    }

    [HttpPost]
    public async Task<IActionResult> LogMood([FromBody] LogMoodRequest req)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await dispatcher.SendAsync(new LogMoodCommand(userId, req.MoodScore, req.SleepScore, req.EnergyScore, req.Skipped));
        return Ok(result);
    }
}

public record LogMoodRequest(int? MoodScore, int? SleepScore, int? EnergyScore, bool Skipped = false);
