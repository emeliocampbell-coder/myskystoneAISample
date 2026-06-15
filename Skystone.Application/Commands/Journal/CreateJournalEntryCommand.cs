using FluentValidation;
using Skystone.Application.Commands.Badges;
using Skystone.Application.Common.Exceptions;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;
using Skystone.Domain.Entities;

namespace Skystone.Application.Commands.Journal;

public record CreateJournalEntryCommand(Guid UserId, string Content, Guid? ModuleId) : ICommand<JournalEntryDto>;

public class CreateJournalEntryValidator : AbstractValidator<CreateJournalEntryCommand>
{
    public CreateJournalEntryValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.Content).NotEmpty().MaximumLength(5000);
    }
}

public class CreateJournalEntryHandler(IAppDbContext db, IDispatcher dispatcher) : ICommandHandler<CreateJournalEntryCommand, JournalEntryDto>
{
    private static readonly string[] ArloResponses =
    [
        "Based on what you've shared so far, it sounds like there's a heavy expectation to have a \"perfectly mapped out\" future, and that pressure is making the present moment feel incredibly noisy and exhausting. I'm wondering... if you could turn down the volume on everyone else's expectations for just one day, what would your quiet mind actually want to focus on?",
        "What you're describing sounds like a tension between who others expect you to be and who you actually are. That tension is worth sitting with. What would it feel like to just let yourself be, even for one afternoon?",
        "There's something meaningful in what you just shared. I notice you mentioned feeling overwhelmed — that often signals that something important to you is being crowded out. What's the thing you keep pushing to the edges of your attention?",
        "It takes courage to put words to feelings like these. The things that frustrate us most are often close neighbors to the things we care about most. What do you think your frustration is trying to tell you?",
        "I hear a lot of comparison in what you're describing. What if the goal wasn't to be where others are, but to understand where *you* want to go? What does your version of moving forward actually look like — in your own words?"
    ];

    private static readonly string[] FollowUpQuestions =
    [
        "If you could turn down the volume on everyone else's expectations for just one day, what would your quiet mind actually want to focus on?",
        "What would it feel like to just let yourself be, without needing to explain it to anyone?",
        "What is the thing you keep pushing to the edges of your attention?",
        "What do you think your frustration is trying to tell you?",
        "What does moving forward look like, in your own words?"
    ];

    public async Task<JournalEntryDto> HandleAsync(CreateJournalEntryCommand command, CancellationToken cancellationToken = default)
    {
        _ = await db.Users.FindAsync([command.UserId], cancellationToken)
            ?? throw new NotFoundException("User not found.");

        var entry = new JournalEntry
        {
            Id = Guid.NewGuid(),
            UserId = command.UserId,
            Content = command.Content,
            ModuleId = command.ModuleId,
            CreatedAt = DateTime.UtcNow
        };

        var rng = new Random();
        var reflection = new Reflection
        {
            Id = Guid.NewGuid(),
            JournalEntryId = entry.Id,
            ArloText = ArloResponses[rng.Next(ArloResponses.Length)],
            FollowUpQuestion = FollowUpQuestions[rng.Next(FollowUpQuestions.Length)],
            CreatedAt = DateTime.UtcNow
        };

        entry.Reflections.Add(reflection);
        db.JournalEntries.Add(entry);
        await db.SaveChangesAsync(cancellationToken);

        _ = Task.Run(() => dispatcher.SendAsync(new CheckAndAwardBadgesCommand(command.UserId), CancellationToken.None));

        return new JournalEntryDto(
            entry.Id, entry.Content, entry.ModuleId, entry.CreatedAt,
            [new ReflectionDto(reflection.Id, reflection.ArloText, reflection.FollowUpQuestion, reflection.Status.ToString(), reflection.CreatedAt)]
        );
    }
}
