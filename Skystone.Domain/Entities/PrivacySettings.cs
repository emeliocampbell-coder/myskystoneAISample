namespace Skystone.Domain.Entities;

public class PrivacySettings
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public bool AllowPatternRecognition { get; set; } = true;
    public bool AllowEpiphanyAutoSave { get; set; } = true;
    public bool AllowEducatorSummaries { get; set; } = true;
    public bool HearArloSpeak { get; set; } = true;
    public bool AllowMicrophone { get; set; } = true;

    public User User { get; set; } = null!;
}
