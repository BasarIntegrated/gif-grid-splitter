import { ImageIcon } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <header className="text-black py-4 items-center" data-id="4">
      <a data-id="5" href="/">
        <ImageIcon className="inline" />
        <span className="text-lg font-semibold pl-2 py-2" data-id="2">
          Animated GIF Grid Splitter
        </span>
      </a>
    </header>
  );
}
