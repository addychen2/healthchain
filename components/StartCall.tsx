import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

interface StartCallProps {
  onChatInitiate: () => void;
}

export default function StartCall({ onChatInitiate }: StartCallProps) {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className="w-full flex justify-center mt-2"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0, y: -20 },
            enter: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
          }}
        >
          <Button
            className="flex items-center content-center gap-1.5 bg-diet-green-darker hover:bg-diet-green-darkest text-white px-6 py-3 text-lg rounded-full shadow-lg"
            onClick={() => {
              connect()
                .then(() => {
                  onChatInitiate();
                })
                .catch(() => {})
                .finally(() => {});
            }}
          >
            <Phone
              className="size-5 opacity-70 mr-2"
              strokeWidth={2}
              stroke="currentColor"
            />
            <span>Talk to HealthChain</span>
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
