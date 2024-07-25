import React from "react";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <>
      <div className="fixed md:right-10 right-2 top-2">
        <ModeToggle />
      </div>
    </>
  );
};

export default Header;
