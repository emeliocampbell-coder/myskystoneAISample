using Microsoft.EntityFrameworkCore;
using Skystone.Domain.Entities;

namespace Skystone.Application.Common.Interfaces;

public interface IAppDbContext
{
    DbSet<User> Users { get; }
    DbSet<Companion> Companions { get; }
    DbSet<Module> Modules { get; }
    DbSet<JournalEntry> JournalEntries { get; }
    DbSet<Reflection> Reflections { get; }
    DbSet<VaultItem> VaultItems { get; }
    DbSet<Observation> Observations { get; }
    DbSet<PrivacySettings> PrivacySettings { get; }
    DbSet<Badge> Badges { get; }
    DbSet<UserBadge> UserBadges { get; }
    DbSet<MoodLog> MoodLogs { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
