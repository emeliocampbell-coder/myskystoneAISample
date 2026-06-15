namespace Skystone.Domain.Entities;

public class Module
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string LongDescription { get; set; } = string.Empty;
    public string IconName { get; set; } = string.Empty;
    public int EstimatedHours { get; set; }
    public int OrderIndex { get; set; }
    public bool IsLocked { get; set; }

    public ICollection<JournalEntry> JournalEntries { get; set; } = [];
}
