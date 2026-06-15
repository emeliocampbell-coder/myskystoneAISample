import { apiClient } from "./client";
import type { MoodLogDto } from "@/types";

export const logMood = (data: { moodScore?: number; sleepScore?: number; energyScore?: number; skipped?: boolean }) =>
  apiClient.post<MoodLogDto>("/mood", { ...data, skipped: data.skipped ?? false }).then((r) => r.data);

export const getMoodHistory = (days = 30) =>
  apiClient.get<MoodLogDto[]>("/mood", { params: { days } }).then((r) => r.data);
