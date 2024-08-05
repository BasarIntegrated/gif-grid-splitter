import config from "@/app/config";
import { HeartIcon } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="text-black text-center py-4 items-center" data-id="25">
      <p className="text-sm" data-id="26">
        © 2024 <span>{config.title}</span> created with{" "}
        <span>
          <HeartIcon className="text-red-800 inline" />
        </span>{" "}
        by <b>{config.author}</b>
      </p>
    </footer>
  );
}
