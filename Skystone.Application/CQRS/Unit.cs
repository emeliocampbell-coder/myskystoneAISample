namespace Skystone.Application.CQRS;

/// <summary>Represents a void return value for commands with no result.</summary>
public readonly record struct Unit
{
    public static readonly Unit Value = default;
}
