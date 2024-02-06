import { useTrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useCallback, useEffect, useMemo, useState } from "react";

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

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      if (isSpaceKey(e) && !e.repeat) {
        console.log("setIsOn(true);");
        setIsOn(true);
      }
    };
    const keyUpListener = (e: KeyboardEvent) => {
      if (isSpaceKey(e)) {
        console.log("setIsOn(false);");
        setIsOn(false);
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
