import { apiClient } from "./client";
import type { BadgeDto } from "@/types";

export const getBadges = () =>
  apiClient.get<BadgeDto[]>("/badges").then((r) => r.data);
