import { useEffect, useMemo, useRef, useState } from "react";
import { OverlayController, OverlayControlRef } from "./OverlayController";
import { useOverlayStore } from "@/stores/overlayStore";

let elementId = 1;

interface Options {
  exitOnUnmount?: boolean;
  canDuplicate?: boolean;
}
type CreateOverlayElement = (props: {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}) => React.ReactElement;

export function useOverlay({
  exitOnUnmount = true,
  canDuplicate = false,
}: Options = {}) {
  const { mount, unmount, overlays } = useOverlayStore();
  const [id] = useState(() => String(elementId++));

  const overlayRef = useRef<OverlayControlRef | null>(null);

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        unmount(id);
      }
    };
  }, [exitOnUnmount, id, unmount]);

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        if (
          overlays.some((overlay) => overlay.id === id) &&
          canDuplicate === false
        ) {
          return;
        }
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onExit={() => unmount(id)}
          />
        );
      },
      close: () => {
        overlayRef.current?.close();
      },
      exit: () => {
        unmount(id);
      },
      getOverlays: () => overlays,
    }),
    [id, mount, unmount, overlays]
  );
}
