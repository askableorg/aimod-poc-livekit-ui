import { useTrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { Button } from "../button/Button";

type Props = {
  isEnabled?: boolean;
  onStart?: () => void;
  onStop?: () => void;
  children?: React.ReactNode;
};

function isSpaceKey(e: KeyboardEvent) {
  return e.key === " " || e.code === "Space" || e.keyCode === 32;
}

const buttonDefaultClassName = "text-lg uppercase font-medium py-3 px-4 rounded-xl";

export function ReplyToggleSpeaking({ isEnabled, children }: Props) {
  const [hasInit, setHasInit] = useState(false);
  const [hidden, setHidden] = useState(true);

  const tt = useTrackToggle({ source: Track.Source.Microphone });
  useEffect(() => {
    if (!hasInit && tt?.toggle) {
      tt.toggle(false);
      setHasInit(true);
    }
  }, [hasInit, tt?.toggle]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (hidden) {
      timeout = setTimeout(() => {
        setHidden(false);
      }, 1000);
    }
    return () => {
      if (timeout) { clearTimeout(timeout); }
    };
  }, [hidden]);

  useEffect(() => {
    if (isEnabled) {
      setHidden(false);
    }
  }, [isEnabled]);

  if (!isEnabled || !tt?.track || !tt?.toggle || !hasInit || hidden) {
    return null;
  }
  if (tt.enabled) {
    return (
      <>
        <Button
          accentColor="gray"
          className={buttonDefaultClassName}
          autoFocus
          onClick={() => {
            tt.toggle(false);
            setHidden(true);
          }}
        >
          End your response
        </Button>
        {children}
      </>
    );
  }
  return (
    <Button
      accentColor="cyan"
      className={buttonDefaultClassName}
      autoFocus
      onClick={() => {
        tt.toggle(true);
      }}
    >
      Start your response
    </Button>
  );
}
