using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Skystone.Application.CQRS;

namespace Skystone.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assembly = typeof(DependencyInjection).Assembly;

        // FluentValidation
        services.AddValidatorsFromAssembly(assembly);

        // Custom CQRS dispatcher
        services.AddScoped<IDispatcher, Dispatcher>();

        // Register all command handlers: ICommandHandler<TCommand, TResult>
        RegisterHandlers(services, assembly, typeof(ICommandHandler<,>));

        // Register all query handlers: IQueryHandler<TQuery, TResult>
        RegisterHandlers(services, assembly, typeof(IQueryHandler<,>));

        return services;
    }

    private static void RegisterHandlers(IServiceCollection services, System.Reflection.Assembly assembly, Type openInterface)
    {
        foreach (var type in assembly.GetTypes().Where(t => t.IsClass && !t.IsAbstract))
        {
            foreach (var iface in type.GetInterfaces())
            {
                if (!iface.IsGenericType || iface.GetGenericTypeDefinition() != openInterface) continue;
                services.AddScoped(iface, type);
            }
        }
    }
}
