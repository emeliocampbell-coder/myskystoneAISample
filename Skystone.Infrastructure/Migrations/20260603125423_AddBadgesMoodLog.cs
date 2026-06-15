using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Skystone.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBadgesMoodLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Badges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IconName = table.Column<string>(type: "text", nullable: false),
                    Criteria = table.Column<string>(type: "text", nullable: false),
                    Tier = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Badges", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MoodLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    MoodScore = table.Column<int>(type: "integer", nullable: true),
                    SleepScore = table.Column<int>(type: "integer", nullable: true),
                    EnergyScore = table.Column<int>(type: "integer", nullable: true),
                    Skipped = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MoodLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MoodLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserBadges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    BadgeId = table.Column<Guid>(type: "uuid", nullable: false),
                    AwardedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBadges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserBadges_Badges_BadgeId",
                        column: x => x.BadgeId,
                        principalTable: "Badges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBadges_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Badges",
                columns: new[] { "Id", "Criteria", "Description", "IconName", "Name", "Tier" },
                values: new object[,]
                {
                    { new Guid("30000000-0000-0000-0000-000000000001"), "first_journal_entry", "Completed your first journal entry. The journey begins.", "fa-solid fa-pen-nib", "First Reflection", "Bronze" },
                    { new Guid("30000000-0000-0000-0000-000000000002"), "first_vault_item", "Saved your first moment to the Epiphany Vault.", "fa-solid fa-box-archive", "Vault Keeper", "Bronze" },
                    { new Guid("30000000-0000-0000-0000-000000000003"), "first_observation_accepted", "Accepted your first ARLO observation about yourself.", "fa-solid fa-compass", "Identity Explorer", "Bronze" },
                    { new Guid("30000000-0000-0000-0000-000000000004"), "first_module_session", "Completed your first guided reflection session.", "fa-solid fa-map", "Module Pioneer", "Bronze" },
                    { new Guid("30000000-0000-0000-0000-000000000005"), "onboarding_complete", "Completed the full ARLO onboarding journey.", "fa-solid fa-star", "Odyssey Begun", "Bronze" },
                    { new Guid("30000000-0000-0000-0000-000000000006"), "five_reflections_kept", "Had 5 reflections marked as meaningful — ARLO is learning who you are.", "fa-solid fa-brain", "Pattern Seeker", "Silver" },
                    { new Guid("30000000-0000-0000-0000-000000000007"), "ten_vault_items", "Built up 10 entries in your Epiphany Vault.", "fa-solid fa-seedling", "Deep Roots", "Silver" }
                });

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000001"),
                column: "IconName",
                value: "fa-solid fa-eye");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000002"),
                column: "IconName",
                value: "fa-solid fa-heart-pulse");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000003"),
                column: "IconName",
                value: "fa-solid fa-compass");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000004"),
                column: "IconName",
                value: "fa-solid fa-book-open");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000005"),
                column: "IconName",
                value: "fa-solid fa-seedling");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000006"),
                column: "IconName",
                value: "fa-solid fa-hands-holding-heart");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000007"),
                column: "IconName",
                value: "fa-solid fa-map");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000008"),
                column: "IconName",
                value: "fa-solid fa-star");

            migrationBuilder.CreateIndex(
                name: "IX_MoodLogs_UserId_Date",
                table: "MoodLogs",
                columns: new[] { "UserId", "Date" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserBadges_BadgeId",
                table: "UserBadges",
                column: "BadgeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBadges_UserId_BadgeId",
                table: "UserBadges",
                columns: new[] { "UserId", "BadgeId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MoodLogs");

            migrationBuilder.DropTable(
                name: "UserBadges");

            migrationBuilder.DropTable(
                name: "Badges");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000001"),
                column: "IconName",
                value: "fa-eye");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000002"),
                column: "IconName",
                value: "fa-heart-pulse");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000003"),
                column: "IconName",
                value: "fa-compass");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000004"),
                column: "IconName",
                value: "fa-book-open");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000005"),
                column: "IconName",
                value: "fa-seedling");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000006"),
                column: "IconName",
                value: "fa-hands-helping");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000007"),
                column: "IconName",
                value: "fa-map");

            migrationBuilder.UpdateData(
                table: "Modules",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000008"),
                column: "IconName",
                value: "fa-star");
        }
    }
}
