import { WelcomeScreen } from "./WelcomeScreen";
import { MessageInput } from "./MessageInput";

export const ChatArea = () => {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <WelcomeScreen />
      </div>
      <MessageInput />
    </main>
  );
};
