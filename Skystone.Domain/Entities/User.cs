using Skystone.Domain.Enums;

namespace Skystone.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Student;
    public Guid? CompanionId { get; set; }
    public bool OnboardingComplete { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Companion? Companion { get; set; }
    public PrivacySettings? PrivacySettings { get; set; }
    public ICollection<JournalEntry> JournalEntries { get; set; } = [];
    public ICollection<VaultItem> VaultItems { get; set; } = [];
    public ICollection<Observation> Observations { get; set; } = [];
    public ICollection<UserBadge> UserBadges { get; set; } = [];
    public ICollection<MoodLog> MoodLogs { get; set; } = [];
}
