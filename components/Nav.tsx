"use client";

import { useLayoutEffect, useState } from "react";
import HumeLogo from "./logos/Hume";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import Github from "./logos/GitHub";
import pkg from '@/package.json';

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  if (isDarkMode) {
    toggleDark();
  }

  return (
    
    <div
      className={
        "px-4 py-2 flex items-center h-14 z-50 bg-card border-b border-border"
      }
  
    >
      <div>
        <HumeLogo className={"h-5 w-auto"} />
      </div>
      <div className={"ml-auto flex items-center gap-1"}>
        <Button
          onClick={() => {
            window.open(
              pkg.homepage,
              "_blank",
              "noopener noreferrer"
            );
          }}
          variant={"ghost"}
          className={"ml-auto flex items-center gap-1.5"}
        >
          <span>
            <Github className={"size-4"} />
          </span>
          <span>Star on GitHub</span>
        </Button>
        <Button
          onClick={toggleDark}
          variant={"ghost"}
          className={"ml-auto flex items-center gap-1.5"}
        >
          <span>
            {isDarkMode ? (
              <Sun className={"size-4"} />
            ) : (
              <Moon className={"size-4"} />
            )}
          </span>
          <span>{isDarkMode ? "Dark" : "Dark"} Mode</span>
        </Button>
      </div>
    </div>
  );
  
};
