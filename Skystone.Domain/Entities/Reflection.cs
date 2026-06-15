using Skystone.Domain.Enums;

namespace Skystone.Domain.Entities;

public class Reflection
{
    public Guid Id { get; set; }
    public Guid JournalEntryId { get; set; }
    public string ArloText { get; set; } = string.Empty;
    public string? FollowUpQuestion { get; set; }
    public ReflectionStatus Status { get; set; } = ReflectionStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public JournalEntry JournalEntry { get; set; } = null!;
}
