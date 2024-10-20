import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

export default function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={" w-full  darkMode flex items-center content-center justify-center bg-diet-green-darker"}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1.5 },
                exit: { scale: 0.5 },
              }}
            >
              <Button
                className={"z-50 flex items-center content-center gap-1.5"}
                onClick={() => {
                  connect()
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {});
                }}
              >
                <span>
                  <Phone
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"currentColor"}
                  />
                </span>
                <span>Talk to HealthChain</span>
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
