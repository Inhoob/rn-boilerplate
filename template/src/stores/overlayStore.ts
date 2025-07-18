import { create } from "zustand";
import { ReactNode } from "react";

interface Overlay {
  id: string;
  element: ReactNode;
}

interface OverlayStore {
  overlays: Overlay[];
  mount: (id: string, element: ReactNode) => void;
  unmount: (id: string) => void;
}

export const useOverlayStore = create<OverlayStore>((set) => ({
  overlays: [],
  mount: (id, element) =>
    set((state) => ({ overlays: [...state.overlays, { id, element }] })),
  unmount: (id) =>
    set((state) => ({
      overlays: state.overlays.filter((overlay) => overlay.id !== id),
    })),
}));
