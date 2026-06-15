using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Application.CQRS;
using Skystone.Application.DTOs;
using Skystone.Domain.Entities;
using Skystone.Domain.Enums;

namespace Skystone.Application.Queries.Profile;

public record GetLearnerProfileQuery(Guid UserId) : IQuery<LearnerProfileDto>;

public class GetLearnerProfileHandler(IAppDbContext db) : IQueryHandler<GetLearnerProfileQuery, LearnerProfileDto>
{
    public async Task<LearnerProfileDto> HandleAsync(GetLearnerProfileQuery query, CancellationToken cancellationToken = default)
    {
        var observations = await db.Observations
            .Where(o => o.UserId == query.UserId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync(cancellationToken);

        if (observations.Count == 0)
        {
            var seeds = new[]
            {
                (ObservationCategory.Strengths, "You seem to come alive when helping others navigate something complex. Your patience shines in those moments."),
                (ObservationCategory.JoyAnchors, "Quiet mornings before the world wakes up appear to be a recurring source of peace for you."),
                (ObservationCategory.Values, "Authenticity matters deeply to you. You've mentioned feeling unsettled when environments ask you to perform rather than just 'be'."),
                (ObservationCategory.Direction, "You often express curiosity about how things are built and the systems behind them. There's a builder's mindset emerging here."),
                (ObservationCategory.Wellness, "You tend to recharge through solitude and creative output, rather than social stimulation.")
            };

            var newObs = seeds.Select(s => new Observation
            {
                Id = Guid.NewGuid(),
                UserId = query.UserId,
                Category = s.Item1,
                Text = s.Item2,
                Status = ObservationStatus.Draft,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            db.Observations.AddRange(newObs);
            await db.SaveChangesAsync(cancellationToken);
            observations = newObs;
        }

        var obsDtos = observations.Select(o => new ObservationDto(o.Id, o.Category.ToString(), o.Text, o.Status.ToString(), o.CreatedAt));

        var scores = new PatternScoresDto(
            Values: CountCategory(observations, ObservationCategory.Values),
            Strengths: CountCategory(observations, ObservationCategory.Strengths),
            JoyAnchors: CountCategory(observations, ObservationCategory.JoyAnchors),
            Wellness: CountCategory(observations, ObservationCategory.Wellness),
            Direction: CountCategory(observations, ObservationCategory.Direction)
        );

        return new LearnerProfileDto(obsDtos, scores);
    }

    private static double CountCategory(List<Observation> obs, ObservationCategory cat)
        => obs.Count(o => o.Category == cat && o.Status != ObservationStatus.Dismissed) * 1.0;
}
