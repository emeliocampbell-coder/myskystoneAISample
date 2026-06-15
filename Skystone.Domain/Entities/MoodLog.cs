namespace Skystone.Domain.Entities;

public class MoodLog
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateOnly Date { get; set; }
    public int? MoodScore { get; set; }
    public int? SleepScore { get; set; }
    public int? EnergyScore { get; set; }
    public bool Skipped { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
}
