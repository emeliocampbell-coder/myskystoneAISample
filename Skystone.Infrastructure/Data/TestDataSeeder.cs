using Microsoft.EntityFrameworkCore;
using Skystone.Domain.Entities;
using Skystone.Domain.Enums;

namespace Skystone.Infrastructure.Data;

public static class TestDataSeeder
{
    public static async Task SeedTestUsersAsync(AppDbContext db)
    {
        var testUsers = new[]
        {
            new { Email = "student@test.com", Name = "Test Student", Password = "password", Role = UserRole.Student },
            new { Email = "educator@test.com", Name = "Test Educator", Password = "password", Role = UserRole.Educator }
        };

        foreach (var u in testUsers)
        {
            if (!await db.Users.AnyAsync(x => x.Email == u.Email))
            {
                db.Users.Add(new User
                {
                    Id = Guid.NewGuid(),
                    Email = u.Email,
                    Name = u.Name,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(u.Password),
                    Role = u.Role,
                    OnboardingComplete = false
                });
            }
        }

        await db.SaveChangesAsync();
    }
}
