import { apiClient } from "./client";
import type { VaultItem } from "@/types";

export const getVaultItems = (tag?: string) =>
  apiClient.get<VaultItem[]>("/vault", { params: tag ? { tag } : {} }).then((r) => r.data);

export const saveVaultItem = (item: { title: string; arloQuote: string; userNote?: string; tag: string; moduleId?: string }) =>
  apiClient.post<VaultItem>("/vault", item).then((r) => r.data);

export const deleteVaultItem = (itemId: string) =>
  apiClient.delete(`/vault/${itemId}`);
