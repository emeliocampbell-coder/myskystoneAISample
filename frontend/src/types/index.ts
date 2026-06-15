export interface User {
  id: string;
  email: string;
  name: string;
  role: "Student" | "Educator";
  companionId?: string;
  onboardingComplete: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Companion {
  id: string;
  name: string;
  persona: string;
  description: string;
  imageUrl: string;
  iconName: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  estimatedHours: number;
  orderIndex: number;
  isLocked: boolean;
}

export interface Reflection {
  id: string;
  arloText: string;
  followUpQuestion?: string;
  status: "Pending" | "Kept" | "Edited" | "Dismissed";
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  content: string;
  moduleId?: string;
  createdAt: string;
  reflections: Reflection[];
}

export interface Observation {
  id: string;
  category: "Values" | "Strengths" | "JoyAnchors" | "Direction" | "Wellness";
  text: string;
  status: "Draft" | "Accepted" | "Dismissed";
  createdAt: string;
}

export interface PatternScores {
  values: number;
  strengths: number;
  joyAnchors: number;
  wellness: number;
  direction: number;
}

export interface LearnerProfile {
  observations: Observation[];
  patternScores: PatternScores;
}

export interface VaultItem {
  id: string;
  title: string;
  arloQuote: string;
  userNote?: string;
  tag: string;
  moduleId?: string;
  createdAt: string;
}

export interface PrivacySettings {
  allowPatternRecognition: boolean;
  allowEpiphanyAutoSave: boolean;
  allowEducatorSummaries: boolean;
  hearArloSpeak: boolean;
  allowMicrophone: boolean;
}

export interface StudentSummary {
  userId: string;
  name: string;
  email: string;
  currentModuleIndex: number;
  engagementNarrative: string;
  wellbeingStatus: "Green" | "Yellow" | "Red";
  wellbeingDescription: string;
}

export interface BadgeDto {
  id: string;
  name: string;
  description: string;
  iconName: string;
  tier: "Bronze" | "Silver" | "Gold";
  criteria: string;
  isEarned: boolean;
  awardedAt?: string;
}

export interface MoodLogDto {
  id: string;
  date: string;
  moodScore?: number;
  sleepScore?: number;
  energyScore?: number;
  skipped: boolean;
  createdAt: string;
}
