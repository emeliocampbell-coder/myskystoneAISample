using Skystone.Domain.Enums;

namespace Skystone.Domain.Entities;

public class Observation
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public ObservationCategory Category { get; set; }
    public string Text { get; set; } = string.Empty;
    public ObservationStatus Status { get; set; } = ObservationStatus.Draft;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
}
