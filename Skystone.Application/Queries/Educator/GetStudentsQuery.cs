using Skystone.Application.CQRS;
using Skystone.Application.DTOs;

namespace Skystone.Application.Queries.Educator;

public record GetStudentsQuery(Guid EducatorId) : IQuery<IEnumerable<StudentSummaryDto>>;

public class GetStudentsHandler : IQueryHandler<GetStudentsQuery, IEnumerable<StudentSummaryDto>>
{
    public Task<IEnumerable<StudentSummaryDto>> HandleAsync(GetStudentsQuery query, CancellationToken cancellationToken = default)
    {
        var students = new List<StudentSummaryDto>
        {
            new(Guid.NewGuid(), "Maya Lin", "maya.lin@school.edu", 4,
                "Reflections have deepened across recent modules, with consistent themes around belonging and purpose.",
                "Green", "All is well. Maya is engaged and progressing steadily."),
            new(Guid.NewGuid(), "Elijah Thorne", "elijah.thorne@school.edu", 2,
                "Elijah shows thoughtful engagement, particularly around values clarification.",
                "Green", "All is well. Elijah is reflecting consistently."),
            new(Guid.NewGuid(), "Sarah Jenkins", "sarah.jenkins@school.edu", 7,
                "Sarah's reflections show heightened stress around upcoming transitions.",
                "Yellow", "Check-In Recommended. Several reflection inconsistencies and signs of disengagement detected."),
            new(Guid.NewGuid(), "David Chen", "david.chen@school.edu", 1,
                "David is in the early stages of his journey, showing curiosity and openness.",
                "Green", "All is well. David is beginning his ARLO journey.")
        };

        return Task.FromResult<IEnumerable<StudentSummaryDto>>(students);
    }
}
