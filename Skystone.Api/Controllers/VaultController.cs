using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skystone.Application.Commands.Vault;
using Skystone.Application.CQRS;
using Skystone.Application.Queries.Vault;
using System.Security.Claims;

namespace Skystone.Api.Controllers;

[ApiController]
[Route("api/vault")]
[Authorize]
public class VaultController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetItems([FromQuery] string? tag)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(await dispatcher.QueryAsync(new GetVaultItemsQuery(userId, tag)));
    }

    [HttpPost]
    public async Task<IActionResult> SaveItem([FromBody] SaveVaultItemRequest req)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await dispatcher.SendAsync(new SaveVaultItemCommand(userId, req.Title, req.ArloQuote, req.UserNote, req.Tag, req.ModuleId));
        return CreatedAtAction(nameof(GetItems), result);
    }

    [HttpDelete("{itemId:guid}")]
    public async Task<IActionResult> DeleteItem(Guid itemId)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await dispatcher.SendAsync(new DeleteVaultItemCommand(itemId, userId));
        return NoContent();
    }
}

public record SaveVaultItemRequest(string Title, string ArloQuote, string? UserNote, string Tag, Guid? ModuleId);
