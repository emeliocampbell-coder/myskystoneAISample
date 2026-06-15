using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Skystone.Infrastructure.Data;
using Skystone.Infrastructure.Services;

namespace Skystone.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("arloDb")));

        services.AddScoped<TokenService>();
        services.AddScoped<Skystone.Application.Common.Interfaces.ITokenService>(sp => sp.GetRequiredService<TokenService>());
        services.AddScoped<Skystone.Application.Common.Interfaces.IAppDbContext>(sp => sp.GetRequiredService<AppDbContext>());

        return services;
    }
}
