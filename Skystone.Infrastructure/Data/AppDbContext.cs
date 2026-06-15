using Microsoft.EntityFrameworkCore;
using Skystone.Application.Common.Interfaces;
using Skystone.Domain.Entities;
using Skystone.Domain.Enums;

namespace Skystone.Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options), IAppDbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Companion> Companions => Set<Companion>();
    public DbSet<Module> Modules => Set<Module>();
    public DbSet<JournalEntry> JournalEntries => Set<JournalEntry>();
    public DbSet<Reflection> Reflections => Set<Reflection>();
    public DbSet<VaultItem> VaultItems => Set<VaultItem>();
    public DbSet<Observation> Observations => Set<Observation>();
    public DbSet<PrivacySettings> PrivacySettings => Set<PrivacySettings>();
    public DbSet<Badge> Badges => Set<Badge>();
    public DbSet<UserBadge> UserBadges => Set<UserBadge>();
    public DbSet<MoodLog> MoodLogs => Set<MoodLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(e =>
        {
            e.HasKey(u => u.Id);
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.Role).HasConversion<string>();
            e.HasOne(u => u.Companion).WithMany().HasForeignKey(u => u.CompanionId).IsRequired(false);
            e.HasOne(u => u.PrivacySettings).WithOne(p => p.User).HasForeignKey<PrivacySettings>(p => p.UserId);
        });

        modelBuilder.Entity<JournalEntry>(e =>
        {
            e.HasKey(j => j.Id);
            e.HasOne(j => j.User).WithMany(u => u.JournalEntries).HasForeignKey(j => j.UserId);
            e.HasOne(j => j.Module).WithMany(m => m.JournalEntries).HasForeignKey(j => j.ModuleId).IsRequired(false);
        });

        modelBuilder.Entity<Reflection>(e =>
        {
            e.HasKey(r => r.Id);
            e.Property(r => r.Status).HasConversion<string>();
            e.HasOne(r => r.JournalEntry).WithMany(j => j.Reflections).HasForeignKey(r => r.JournalEntryId);
        });

        modelBuilder.Entity<VaultItem>(e =>
        {
            e.HasKey(v => v.Id);
            e.HasOne(v => v.User).WithMany(u => u.VaultItems).HasForeignKey(v => v.UserId);
            e.HasOne(v => v.Module).WithMany().HasForeignKey(v => v.ModuleId).IsRequired(false);
        });

        modelBuilder.Entity<Observation>(e =>
        {
            e.HasKey(o => o.Id);
            e.Property(o => o.Category).HasConversion<string>();
            e.Property(o => o.Status).HasConversion<string>();
            e.HasOne(o => o.User).WithMany(u => u.Observations).HasForeignKey(o => o.UserId);
        });

        modelBuilder.Entity<Badge>(e =>
        {
            e.HasKey(b => b.Id);
            e.Property(b => b.Tier).HasConversion<string>();
        });

        modelBuilder.Entity<UserBadge>(e =>
        {
            e.HasKey(ub => ub.Id);
            e.HasIndex(ub => new { ub.UserId, ub.BadgeId }).IsUnique();
            e.HasOne(ub => ub.User).WithMany(u => u.UserBadges).HasForeignKey(ub => ub.UserId);
            e.HasOne(ub => ub.Badge).WithMany(b => b.UserBadges).HasForeignKey(ub => ub.BadgeId);
        });

        modelBuilder.Entity<MoodLog>(e =>
        {
            e.HasKey(m => m.Id);
            e.HasIndex(m => new { m.UserId, m.Date }).IsUnique();
            e.HasOne(m => m.User).WithMany(u => u.MoodLogs).HasForeignKey(m => m.UserId);
        });

        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        var companions = new List<Companion>
        {
            new() { Id = new Guid("10000000-0000-0000-0000-000000000001"), Name = "The Observer", Persona = "observer", Description = "Thoughtful, quiet, and deeply analytical. Helps you connect the dots in your journey.", ImageUrl = "https://storage.googleapis.com/uxpilot-auth.appspot.com/63800f5124-78519c3a4de1263b31c8.png", IconName = "fa-eye" },
            new() { Id = new Guid("10000000-0000-0000-0000-000000000002"), Name = "The Guide", Persona = "guide", Description = "Warm, encouraging, and supportive. Walks alongside you as you explore new ideas.", ImageUrl = "https://storage.googleapis.com/uxpilot-auth.appspot.com/d010de51bf-ebd46e3be2ff9fcb84d0.png", IconName = "fa-deer" },
            new() { Id = new Guid("10000000-0000-0000-0000-000000000003"), Name = "The Questioner", Persona = "questioner", Description = "Curious, challenging, and perceptive. Pushes you to think deeper about your choices.", ImageUrl = "https://storage.googleapis.com/uxpilot-auth.appspot.com/3a90bd75e6-278ef2b463c2eb024a68.png", IconName = "fa-question" },
            new() { Id = new Guid("10000000-0000-0000-0000-000000000004"), Name = "Surprise Me", Persona = "random", Description = "Let ARLO choose a companion based on your first few reflections.", ImageUrl = "", IconName = "fa-sparkles" }
        };

        var modules = new List<Module>
        {
            new() { Id = new Guid("20000000-0000-0000-0000-000000000001"), Title = "Seeing Clearly in a Noisy World", Description = "Tuning out the expectations of others to hear your own quiet voice.", LongDescription = "Before we can figure out where we're going, we often need to quiet the room. This space is about noticing the expectations placed upon you, and gently setting them aside to hear your own voice.", IconName = "fa-solid fa-eye", EstimatedHours = 12, OrderIndex = 1, IsLocked = false },
            new() { Id = new Guid("20000000-0000-0000-0000-000000000002"), Title = "Health, Self & Being Human", Description = "Exploring the connection between how you feel and who you are.", LongDescription = "Your body and mind are interconnected in ways that shape every decision you make. This module explores those connections through gentle reflection.", IconName = "fa-solid fa-heart-pulse", EstimatedHours = 15, OrderIndex = 2, IsLocked = false },
            new() { Id = new Guid("20000000-0000-0000-0000-000000000003"), Title = "Signals of Direction", Description = "Noticing what draws your attention and where you find flow.", LongDescription = "What lights you up? What makes time disappear? This module is about recognizing your natural pull toward certain ways of being.", IconName = "fa-solid fa-compass", EstimatedHours = 10, OrderIndex = 3, IsLocked = true },
            new() { Id = new Guid("20000000-0000-0000-0000-000000000004"), Title = "The Stories We Tell", Description = "Understanding how narrative shapes identity and possibility.", LongDescription = "Every belief you hold about yourself is a story. Some serve you. Some don't. This module is about learning to tell new ones.", IconName = "fa-solid fa-book-open", EstimatedHours = 12, OrderIndex = 4, IsLocked = true },
            new() { Id = new Guid("20000000-0000-0000-0000-000000000005"), Title = "Roots & Belonging", Description = "Exploring where you come from and how it shapes who you are.", LongDescription = "Our roots inform our values, our habits, our fears, and our strengths. Understanding them helps us choose what to carry forward.", IconName = "fa-solid fa-seedling", EstimatedHours = 14, OrderIndex = 5, IsLocked = true },
            new() { Id = new Guid("20000000-0000-0000-0000-000000000006"), Title = "The Art of Contribution", Description = "Discovering how your unique gifts serve the world around you.", LongDescription = "What do you give freely? What comes naturally that others find difficult? This module connects your strengths to purpose.", IconName = "fa-solid fa-hands-holding-heart", EstimatedHours = 11, OrderIndex = 6, IsLocked = true },
            new() { Id = new Guid("20000000-0000-0000-0000-000000000007"), Title = "Navigating Uncertainty", Description = "Building resilience for the moments when the map runs out.", LongDescription = "Life is full of thresholds where the old maps stop working. This module builds your capacity to be with not-knowing.", IconName = "fa-solid fa-map", EstimatedHours = 13, OrderIndex = 7, IsLocked = true },
            new() { Id = new Guid("20000000-0000-0000-0000-000000000008"), Title = "Your Emerging Future", Description = "Imagining and stepping toward who you are becoming.", LongDescription = "This final module brings everything together — your values, your strengths, your stories — into a vision of who you are becoming.", IconName = "fa-solid fa-star", EstimatedHours = 16, OrderIndex = 8, IsLocked = true }
        };

        var badges = new List<Badge>
        {
            new() { Id = new Guid("30000000-0000-0000-0000-000000000001"), Name = "First Reflection", Description = "Completed your first journal entry. The journey begins.", IconName = "fa-solid fa-pen-nib", Criteria = "first_journal_entry", Tier = BadgeTier.Bronze },
            new() { Id = new Guid("30000000-0000-0000-0000-000000000002"), Name = "Vault Keeper", Description = "Saved your first moment to the Epiphany Vault.", IconName = "fa-solid fa-box-archive", Criteria = "first_vault_item", Tier = BadgeTier.Bronze },
            new() { Id = new Guid("30000000-0000-0000-0000-000000000003"), Name = "Identity Explorer", Description = "Accepted your first ARLO observation about yourself.", IconName = "fa-solid fa-compass", Criteria = "first_observation_accepted", Tier = BadgeTier.Bronze },
            new() { Id = new Guid("30000000-0000-0000-0000-000000000004"), Name = "Module Pioneer", Description = "Completed your first guided reflection session.", IconName = "fa-solid fa-map", Criteria = "first_module_session", Tier = BadgeTier.Bronze },
            new() { Id = new Guid("30000000-0000-0000-0000-000000000005"), Name = "Odyssey Begun", Description = "Completed the full ARLO onboarding journey.", IconName = "fa-solid fa-star", Criteria = "onboarding_complete", Tier = BadgeTier.Bronze },
            new() { Id = new Guid("30000000-0000-0000-0000-000000000006"), Name = "Pattern Seeker", Description = "Had 5 reflections marked as meaningful — ARLO is learning who you are.", IconName = "fa-solid fa-brain", Criteria = "five_reflections_kept", Tier = BadgeTier.Silver },
            new() { Id = new Guid("30000000-0000-0000-0000-000000000007"), Name = "Deep Roots", Description = "Built up 10 entries in your Epiphany Vault.", IconName = "fa-solid fa-seedling", Criteria = "ten_vault_items", Tier = BadgeTier.Silver }
        };

        modelBuilder.Entity<Companion>().HasData(companions);
        modelBuilder.Entity<Module>().HasData(modules);
        modelBuilder.Entity<Badge>().HasData(badges);
    }
}
