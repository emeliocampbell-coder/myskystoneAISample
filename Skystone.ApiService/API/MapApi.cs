using System;

namespace Skystone.ApiService.API;

public static class MapApi
{
    public static IEndpointRouteBuilder MapModulesApi(this IEndpointRouteBuilder app)
    {
        var modulesApi = app.MapGroup("/api/V1/modules")
            .WithTags("API Endpoints");

        modulesApi.MapGet("/sessions", () => GetCurrentSession);
        modulesApi.MapPost("/sessions", () => CreateNewSession);

        return app;
    }

    private static void GetCurrentSession()
    {
        throw new NotImplementedException();
    }

    private static void CreateNewSession()
    {
        throw new NotImplementedException();
    }

}
