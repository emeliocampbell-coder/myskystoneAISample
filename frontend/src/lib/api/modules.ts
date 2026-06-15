import { apiClient } from "./client";
import type { Module } from "@/types";

export const getModules = () =>
  apiClient.get<Module[]>("/modules").then((r) => r.data);

export const getModule = (id: string) =>
  apiClient.get<Module>(`/modules/${id}`).then((r) => r.data);
