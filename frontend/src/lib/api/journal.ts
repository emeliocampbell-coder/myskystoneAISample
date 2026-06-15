import { apiClient } from "./client";
import type { JournalEntry } from "@/types";

export const getJournalEntries = (moduleId?: string) =>
  apiClient.get<JournalEntry[]>("/journal", { params: moduleId ? { moduleId } : {} }).then((r) => r.data);

export const createJournalEntry = (content: string, moduleId?: string) =>
  apiClient.post<JournalEntry>("/journal", { content, moduleId }).then((r) => r.data);

export const setReflectionStatus = (reflectionId: string, status: "Kept" | "Edited" | "Dismissed") =>
  apiClient.post(`/journal/${reflectionId}/status`, { status });
