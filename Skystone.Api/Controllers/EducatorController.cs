using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skystone.Application.CQRS;
using Skystone.Application.Queries.Educator;
using System.Security.Claims;

namespace Skystone.Api.Controllers;

[ApiController]
[Route("api/educator")]
[Authorize(Roles = "Educator")]
public class EducatorController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet("students")]
    public async Task<IActionResult> GetStudents()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(await dispatcher.QueryAsync(new GetStudentsQuery(userId)));
    }
}
