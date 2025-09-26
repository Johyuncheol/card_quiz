"use client";
import { create } from "zustand";

type State = { correct: number; total: number };
type Actions = {
  reset: () => void;
  addResult: (ok: boolean) => void;
};

export const useProgress = create<State & Actions>((set) => ({
  correct: 0,
  total: 0,
  reset: () => set({ correct: 0, total: 0 }),
  addResult: (ok) =>
    set((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 })),
}));
