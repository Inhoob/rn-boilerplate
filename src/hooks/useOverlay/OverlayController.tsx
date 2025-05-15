import React, {
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

type CreateOverlayElement = (props: {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}) => React.ReactElement;
export interface OverlayControlRef {
  close: () => void;
}

interface Props {
  overlayElement: CreateOverlayElement;
  onExit: () => void;
  ref: Ref<OverlayControlRef>;
}

export const OverlayController = ({
  overlayElement: OverlayElement,
  onExit,
  ref,
}: Props) => {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);

  const handleOverlayClose = useCallback(() => setIsOpenOverlay(false), []);

  useImperativeHandle(
    ref,
    () => ({
      close: handleOverlayClose,
    }),
    [handleOverlayClose]
  );

  useEffect(() => {
    requestAnimationFrame(() => setIsOpenOverlay(true));
  }, []);

  return (
    <OverlayElement
      isOpen={isOpenOverlay}
      close={handleOverlayClose}
      exit={onExit}
    />
  );
};
