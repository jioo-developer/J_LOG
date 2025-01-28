"use client";

import { useState, ReactNode } from "react";

function CommonCheckbox({ childrens }: { childrens: ReactNode[] }) {
  const [toggle, setToggle] = useState(false);
  return (
    <button
      type="button"
      className="check__toggle"
      onClick={() => setToggle(!toggle)}
    >
      {toggle ? childrens[0] : childrens[1]}
    </button>
  );
}

export default CommonCheckbox;
