namespace Skystone.Domain.Entities;

public class Companion
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Persona { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string IconName { get; set; } = string.Empty;
}
