namespace Skystone.Domain.Entities;

public class JournalEntry
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid? ModuleId { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public Module? Module { get; set; }
    public ICollection<Reflection> Reflections { get; set; } = [];
}
