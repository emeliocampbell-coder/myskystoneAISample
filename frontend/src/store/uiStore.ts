"use client";

import { create } from "zustand";

interface UiState {
  isEducator: boolean;
  showConsentModal: boolean;
  selectedCompanionId: string | null;
  setIsEducator: (v: boolean) => void;
  setShowConsentModal: (v: boolean) => void;
  setSelectedCompanionId: (id: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isEducator: false,
  showConsentModal: false,
  selectedCompanionId: null,
  setIsEducator: (v) => set({ isEducator: v }),
  setShowConsentModal: (v) => set({ showConsentModal: v }),
  setSelectedCompanionId: (id) => set({ selectedCompanionId: id }),
}));
