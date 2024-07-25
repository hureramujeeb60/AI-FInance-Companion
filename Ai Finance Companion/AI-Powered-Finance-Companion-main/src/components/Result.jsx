import React, { useEffect, useRef } from "react";
import { useTypewriter } from "react-simple-typewriter";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Result = ({ ans, setShowWelcome, setShowResult }) => {
  const [res] = useTypewriter({
    words: [ans],
    loop: 1,
    typeSpeed: 10,
  });

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [res]);
  return (
    <>
      <div className="border border-gray-900 md:mx-24 mx-4">
        <p className="p-6">{res}</p>
      </div>
      <div className="flex justify-center items-center w-screen">
        <Button
          className="mt-5"
          ref={scrollRef}
          onClick={() => window.location.reload()}
        >
          Reset
        </Button>
      </div>
    </>
  );
};

export default Result;
