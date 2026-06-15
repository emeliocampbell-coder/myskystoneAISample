using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Skystone.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Persona = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    IconName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Modules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    LongDescription = table.Column<string>(type: "text", nullable: false),
                    IconName = table.Column<string>(type: "text", nullable: false),
                    EstimatedHours = table.Column<int>(type: "integer", nullable: false),
                    OrderIndex = table.Column<int>(type: "integer", nullable: false),
                    IsLocked = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modules", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    CompanionId = table.Column<Guid>(type: "uuid", nullable: true),
                    OnboardingComplete = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Companions_CompanionId",
                        column: x => x.CompanionId,
                        principalTable: "Companions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "JournalEntries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ModuleId = table.Column<Guid>(type: "uuid", nullable: true),
                    Content = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JournalEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JournalEntries_Modules_ModuleId",
                        column: x => x.ModuleId,
                        principalTable: "Modules",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_JournalEntries_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Observations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Observations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Observations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PrivacySettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    AllowPatternRecognition = table.Column<bool>(type: "boolean", nullable: false),
                    AllowEpiphanyAutoSave = table.Column<bool>(type: "boolean", nullable: false),
                    AllowEducatorSummaries = table.Column<bool>(type: "boolean", nullable: false),
                    HearArloSpeak = table.Column<bool>(type: "boolean", nullable: false),
                    AllowMicrophone = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivacySettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PrivacySettings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VaultItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ModuleId = table.Column<Guid>(type: "uuid", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: false),
                    ArloQuote = table.Column<string>(type: "text", nullable: false),
                    UserNote = table.Column<string>(type: "text", nullable: true),
                    Tag = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VaultItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VaultItems_Modules_ModuleId",
                        column: x => x.ModuleId,
                        principalTable: "Modules",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VaultItems_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reflections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    JournalEntryId = table.Column<Guid>(type: "uuid", nullable: false),
                    ArloText = table.Column<string>(type: "text", nullable: false),
                    FollowUpQuestion = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reflections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reflections_JournalEntries_JournalEntryId",
                        column: x => x.JournalEntryId,
                        principalTable: "JournalEntries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Companions",
                columns: new[] { "Id", "Description", "IconName", "ImageUrl", "Name", "Persona" },
                values: new object[,]
                {
                    { new Guid("10000000-0000-0000-0000-000000000001"), "Thoughtful, quiet, and deeply analytical. Helps you connect the dots in your journey.", "fa-eye", "https://storage.googleapis.com/uxpilot-auth.appspot.com/63800f5124-78519c3a4de1263b31c8.png", "The Observer", "observer" },
                    { new Guid("10000000-0000-0000-0000-000000000002"), "Warm, encouraging, and supportive. Walks alongside you as you explore new ideas.", "fa-deer", "https://storage.googleapis.com/uxpilot-auth.appspot.com/d010de51bf-ebd46e3be2ff9fcb84d0.png", "The Guide", "guide" },
                    { new Guid("10000000-0000-0000-0000-000000000003"), "Curious, challenging, and perceptive. Pushes you to think deeper about your choices.", "fa-question", "https://storage.googleapis.com/uxpilot-auth.appspot.com/3a90bd75e6-278ef2b463c2eb024a68.png", "The Questioner", "questioner" },
                    { new Guid("10000000-0000-0000-0000-000000000004"), "Let ARLO choose a companion based on your first few reflections.", "fa-sparkles", "", "Surprise Me", "random" }
                });

            migrationBuilder.InsertData(
                table: "Modules",
                columns: new[] { "Id", "Description", "EstimatedHours", "IconName", "IsLocked", "LongDescription", "OrderIndex", "Title" },
                values: new object[,]
                {
                    { new Guid("20000000-0000-0000-0000-000000000001"), "Tuning out the expectations of others to hear your own quiet voice.", 12, "fa-eye", false, "Before we can figure out where we're going, we often need to quiet the room. This space is about noticing the expectations placed upon you, and gently setting them aside to hear your own voice.", 1, "Seeing Clearly in a Noisy World" },
                    { new Guid("20000000-0000-0000-0000-000000000002"), "Exploring the connection between how you feel and who you are.", 15, "fa-heart-pulse", false, "Your body and mind are interconnected in ways that shape every decision you make. This module explores those connections through gentle reflection.", 2, "Health, Self & Being Human" },
                    { new Guid("20000000-0000-0000-0000-000000000003"), "Noticing what draws your attention and where you find flow.", 10, "fa-compass", true, "What lights you up? What makes time disappear? This module is about recognizing your natural pull toward certain ways of being.", 3, "Signals of Direction" },
                    { new Guid("20000000-0000-0000-0000-000000000004"), "Understanding how narrative shapes identity and possibility.", 12, "fa-book-open", true, "Every belief you hold about yourself is a story. Some serve you. Some don't. This module is about learning to tell new ones.", 4, "The Stories We Tell" },
                    { new Guid("20000000-0000-0000-0000-000000000005"), "Exploring where you come from and how it shapes who you are.", 14, "fa-seedling", true, "Our roots inform our values, our habits, our fears, and our strengths. Understanding them helps us choose what to carry forward.", 5, "Roots & Belonging" },
                    { new Guid("20000000-0000-0000-0000-000000000006"), "Discovering how your unique gifts serve the world around you.", 11, "fa-hands-helping", true, "What do you give freely? What comes naturally that others find difficult? This module connects your strengths to purpose.", 6, "The Art of Contribution" },
                    { new Guid("20000000-0000-0000-0000-000000000007"), "Building resilience for the moments when the map runs out.", 13, "fa-map", true, "Life is full of thresholds where the old maps stop working. This module builds your capacity to be with not-knowing.", 7, "Navigating Uncertainty" },
                    { new Guid("20000000-0000-0000-0000-000000000008"), "Imagining and stepping toward who you are becoming.", 16, "fa-star", true, "This final module brings everything together — your values, your strengths, your stories — into a vision of who you are becoming.", 8, "Your Emerging Future" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_JournalEntries_ModuleId",
                table: "JournalEntries",
                column: "ModuleId");

            migrationBuilder.CreateIndex(
                name: "IX_JournalEntries_UserId",
                table: "JournalEntries",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Observations_UserId",
                table: "Observations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivacySettings_UserId",
                table: "PrivacySettings",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reflections_JournalEntryId",
                table: "Reflections",
                column: "JournalEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CompanionId",
                table: "Users",
                column: "CompanionId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VaultItems_ModuleId",
                table: "VaultItems",
                column: "ModuleId");

            migrationBuilder.CreateIndex(
                name: "IX_VaultItems_UserId",
                table: "VaultItems",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Observations");

            migrationBuilder.DropTable(
                name: "PrivacySettings");

            migrationBuilder.DropTable(
                name: "Reflections");

            migrationBuilder.DropTable(
                name: "VaultItems");

            migrationBuilder.DropTable(
                name: "JournalEntries");

            migrationBuilder.DropTable(
                name: "Modules");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Companions");
        }
    }
}
