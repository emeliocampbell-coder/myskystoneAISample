using Skystone.Domain.Enums;

namespace Skystone.Domain.Entities;

public class Badge
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string IconName { get; set; } = string.Empty;
    public string Criteria { get; set; } = string.Empty;
    public BadgeTier Tier { get; set; }

    public ICollection<UserBadge> UserBadges { get; set; } = [];
}
