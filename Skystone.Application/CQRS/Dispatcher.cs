using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Skystone.Application.CQRS;

public class Dispatcher(IServiceProvider sp, ILogger<Dispatcher> logger) : IDispatcher
{
    public async Task<TResult> SendAsync<TResult>(ICommand<TResult> command, CancellationToken cancellationToken = default)
    {
        await ValidateAsync(command, cancellationToken);

        var handlerType = typeof(ICommandHandler<,>).MakeGenericType(command.GetType(), typeof(TResult));
        var handler = sp.GetRequiredService(handlerType);

        var name = command.GetType().Name;
        logger.LogInformation("Handling command {Command}", name);
        var result = await InvokeHandlerAsync<TResult>(handler, handlerType, command, cancellationToken);
        logger.LogInformation("Handled command {Command}", name);
        return result;
    }

    public async Task<TResult> QueryAsync<TResult>(IQuery<TResult> query, CancellationToken cancellationToken = default)
    {
        var handlerType = typeof(IQueryHandler<,>).MakeGenericType(query.GetType(), typeof(TResult));
        var handler = sp.GetRequiredService(handlerType);

        var name = query.GetType().Name;
        logger.LogInformation("Handling query {Query}", name);
        var result = await InvokeHandlerAsync<TResult>(handler, handlerType, query, cancellationToken);
        logger.LogInformation("Handled query {Query}", name);
        return result;
    }

    private async Task ValidateAsync<T>(T instance, CancellationToken cancellationToken)
    {
        var validatorType = typeof(IValidator<>).MakeGenericType(instance!.GetType());
        var validator = sp.GetService(validatorType);
        if (validator is null) return;

        var contextType = typeof(ValidationContext<>).MakeGenericType(instance.GetType());
        var context = Activator.CreateInstance(contextType, instance);

        var validateMethod = validatorType.GetMethod("Validate", [contextType])!;
        dynamic validationResult = validateMethod.Invoke(validator, [context])!;

        if (!validationResult.IsValid)
            throw new ValidationException(validationResult.Errors);
    }

    private static async Task<TResult> InvokeHandlerAsync<TResult>(object handler, Type handlerType, object requestOrQuery, CancellationToken cancellationToken)
    {
        var method = handlerType.GetMethod("HandleAsync")!;
        var task = (Task<TResult>)method.Invoke(handler, [requestOrQuery, cancellationToken])!;
        return await task;
    }
}
