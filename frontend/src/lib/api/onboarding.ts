import { apiClient } from "./client";
import type { Companion } from "@/types";

export const getCompanions = () =>
  apiClient.get<Companion[]>("/onboarding/companions").then((r) => r.data);

export const selectCompanion = (companionId: string) =>
  apiClient.post("/onboarding/companion", { companionId });

export const savePrivacy = (settings: {
  allowPatternRecognition: boolean;
  allowEpiphanyAutoSave: boolean;
  allowEducatorSummaries: boolean;
  hearArloSpeak: boolean;
  allowMicrophone: boolean;
}) => apiClient.post("/onboarding/privacy", settings);
