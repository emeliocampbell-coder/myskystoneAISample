import { apiClient } from "./client";
import type { LearnerProfile, PrivacySettings } from "@/types";

export const getLearnerProfile = () =>
  apiClient.get<LearnerProfile>("/profile").then((r) => r.data);

export const setObservationStatus = (observationId: string, status: "Accepted" | "Dismissed") =>
  apiClient.post(`/profile/observations/${observationId}/status`, { status });

export const getSettings = () =>
  apiClient.get<PrivacySettings>("/settings").then((r) => r.data);

export const updateSettings = (settings: PrivacySettings) =>
  apiClient.put<PrivacySettings>("/settings", settings).then((r) => r.data);
