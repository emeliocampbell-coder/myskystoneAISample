using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skystone.Application.Commands.Journal;
using Skystone.Application.CQRS;
using Skystone.Application.Queries.Journal;
using System.Security.Claims;

namespace Skystone.Api.Controllers;

[ApiController]
[Route("api/journal")]
[Authorize]
public class JournalController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetEntries([FromQuery] Guid? moduleId)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(await dispatcher.QueryAsync(new GetJournalEntriesQuery(userId, moduleId)));
    }

    [HttpPost]
    public async Task<IActionResult> CreateEntry([FromBody] CreateJournalEntryRequest req)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await dispatcher.SendAsync(new CreateJournalEntryCommand(userId, req.Content, req.ModuleId));
        return CreatedAtAction(nameof(GetEntries), result);
    }

    [HttpPost("{reflectionId:guid}/status")]
    public async Task<IActionResult> SetReflectionStatus(Guid reflectionId, [FromBody] SetStatusRequest req)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await dispatcher.SendAsync(new SetReflectionStatusCommand(reflectionId, userId, req.Status));
        return NoContent();
    }
}

public record CreateJournalEntryRequest(string Content, Guid? ModuleId);
public record SetStatusRequest(string Status);
