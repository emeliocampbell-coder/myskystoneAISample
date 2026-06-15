namespace Skystone.Domain.Entities;

public class VaultItem
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid? ModuleId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ArloQuote { get; set; } = string.Empty;
    public string? UserNote { get; set; }
    public string Tag { get; set; } = "Sparks";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public Module? Module { get; set; }
}
