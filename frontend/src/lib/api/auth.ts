import { apiClient } from "./client";
import type { AuthResponse, User } from "@/types";

export const register = (email: string, name: string, password: string, role = "Student") =>
  apiClient.post<AuthResponse>("/auth/register", { email, name, password, role }).then((r) => r.data);

export const login = (email: string, password: string) =>
  apiClient.post<AuthResponse>("/auth/login", { email, password }).then((r) => r.data);

export const getMe = () =>
  apiClient.get<User>("/auth/me").then((r) => r.data);
