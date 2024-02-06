type ChatMessageProps = {
  message: string;
  accentColor: string;
  name: string | null;
  isSelf: boolean;
};

export const ChatMessage = ({
  name,
  message,
  accentColor,
  isSelf,
}: ChatMessageProps) => {
  return (
    <div className={name ? "flex flex-col gap-1" : "-mt-5"}>
      {name && (
        <div
          className={`text-${
            isSelf ? "gray-700" : accentColor + "-800 text-ts-" + accentColor
          } uppercase text-xs`}
        >
          {name}
        </div>
      )}
      <div
        className={`pr-4 text-${
          isSelf ? "gray-300" : accentColor + "-500"
        } text-sm ${isSelf ? "" : "drop-shadow-" + accentColor}`}
      >
        {message}
      </div>
    </div>
  );
};
