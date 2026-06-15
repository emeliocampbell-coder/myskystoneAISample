using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skystone.Application.CQRS;
using Skystone.Application.Queries.Modules;

namespace Skystone.Api.Controllers;

[ApiController]
[Route("api/modules")]
[Authorize]
public class ModulesController(IDispatcher dispatcher) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetModules()
        => Ok(await dispatcher.QueryAsync(new GetModulesQuery()));

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetModule(Guid id)
        => Ok(await dispatcher.QueryAsync(new GetModuleByIdQuery(id)));
}
