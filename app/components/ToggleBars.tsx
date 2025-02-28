import { useState } from "react";
import Dropdown from "./Dropdown";
import { Navigation } from "./Header";

export default function ToggleBars() {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className="sm:hidden block relative"
      onClick={() => setToggle(!toggle)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`transition-all ease-in-out duration-200 ${
          toggle && "rotate-90"
        } cursor-pointer size-6 sm:hidden inline`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <Dropdown toggle={toggle}>
        <Navigation noDropdown={true} />
      </Dropdown>
    </div>
  );
}
