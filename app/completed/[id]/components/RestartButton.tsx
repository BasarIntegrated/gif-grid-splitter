"use client";

import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function RestartButton() {
  const router = useRouter();
  return (
    <Button className="w-full" onClick={() => router.push("/")}>
      <RefreshCwIcon className="mr-2 h-4 w-4" /> Restart
    </Button>
  );
}
