import React from "react";
import { Button } from "@/components/ui/button";

const Welcome = ({ setShowForm, setShowWelcome }) => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center px-4 md:px-0">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl uppercase">
        AI POWERED FINANCE
      </h1>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl uppercase">
        Companion
      </h1>
      <Button
        onClick={() => {
          setShowForm(true);
          setShowWelcome(false);
        }}
        className="mt-6 px-12"
      >
        Start
      </Button>
    </div>
  );
};

export default Welcome;
