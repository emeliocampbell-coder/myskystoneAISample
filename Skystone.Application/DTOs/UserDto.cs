namespace Skystone.Application.DTOs;

public record UserDto(Guid Id, string Email, string Name, string Role, Guid? CompanionId, bool OnboardingComplete);
public record AuthResponseDto(string Token, UserDto User);
public record CompanionDto(Guid Id, string Name, string Persona, string Description, string ImageUrl, string IconName);
public record ModuleDto(Guid Id, string Title, string Description, string LongDescription, string IconName, int EstimatedHours, int OrderIndex, bool IsLocked);
public record JournalEntryDto(Guid Id, string Content, Guid? ModuleId, DateTime CreatedAt, IEnumerable<ReflectionDto> Reflections);
public record ReflectionDto(Guid Id, string ArloText, string? FollowUpQuestion, string Status, DateTime CreatedAt);
public record VaultItemDto(Guid Id, string Title, string ArloQuote, string? UserNote, string Tag, Guid? ModuleId, DateTime CreatedAt);
public record ObservationDto(Guid Id, string Category, string Text, string Status, DateTime CreatedAt);
public record LearnerProfileDto(IEnumerable<ObservationDto> Observations, PatternScoresDto PatternScores);
public record PatternScoresDto(double Values, double Strengths, double JoyAnchors, double Wellness, double Direction);
public record PrivacySettingsDto(bool AllowPatternRecognition, bool AllowEpiphanyAutoSave, bool AllowEducatorSummaries, bool HearArloSpeak, bool AllowMicrophone);
public record StudentSummaryDto(Guid UserId, string Name, string Email, int CurrentModuleIndex, string EngagementNarrative, string WellbeingStatus, string WellbeingDescription);
public record BadgeDto(Guid Id, string Name, string Description, string IconName, string Tier, string Criteria, bool IsEarned, DateTime? AwardedAt);
public record MoodLogDto(Guid Id, DateOnly Date, int? MoodScore, int? SleepScore, int? EnergyScore, bool Skipped, DateTime CreatedAt);
