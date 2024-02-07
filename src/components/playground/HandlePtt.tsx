import { useTrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  isEnabled?: boolean;
  onStart?: () => void;
  onStop?: () => void;
};

function isSpaceKey(e: KeyboardEvent) {
  return e.key === " " || e.code === "Space" || e.keyCode === 32;
}

export function HandlePtt({ isEnabled, onStart, onStop }: Props) {
  const [isOn, setIsOn] = useState(false);
  const tt = useTrackToggle({ source: Track.Source.Microphone });
  const keyUpTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      if (isSpaceKey(e) && !e.repeat) {
        if (keyUpTimeout) {
          clearTimeout(keyUpTimeout.current!);
        }
        setIsOn(true);
      }
    };
    const keyUpListener = (e: KeyboardEvent) => {
      if (isSpaceKey(e)) {
        if (keyUpTimeout) {
          clearTimeout(keyUpTimeout.current!);
        }
        keyUpTimeout.current = setTimeout(() => {
          setIsOn(false);
        }, 200);
      }
    };

    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);
    return () => {
      window.removeEventListener("keydown", keyDownListener);
      window.removeEventListener("keyup", keyUpListener);
    };
  }, []);

  const canToggle = useMemo(() => {
    console.log(new Date());
    return !!tt?.track;
  }, [tt?.track]);

  useEffect(() => {
    if (canToggle) {
      tt.toggle(isOn && isEnabled);
    }
    if (isOn) {
      if (onStart) {
        onStart();
      }
    } else {
      if (onStop) {
        onStop();
      }
    }
  }, [isOn, canToggle, isEnabled]);

  return null;
}
