"use client";

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import GifGridSplitterForm from "./GifGridSplitterForm";
import Image from "next/image";
import { useGetGifSplit } from "@/app/hooks/useGifSplitQuery";
import GifGridSplitCompleted from "./GifGridSplitCompleted";

interface GifSplitContainerProps {
  gifSplitId: string;
}

export default function GifSplitContainer({
  gifSplitId,
}: GifSplitContainerProps) {
  const { data, isLoading } = useGetGifSplit(gifSplitId, {
    refetchInterval: 1000,
  });
  const isCompleted = data?.completedAt != null ? true : false;

  if (isCompleted) {
    window.location.href = `/completed/${data.id}`;
    return null;
  }

  // useEffect(() => {
  //   if (isCompleted) {
  //     toast("GIF Split process is completed.");
  //     const timeoutRef = setTimeout(
  //       () => (window.location.href = `/completed/${data.id}`),
  //       3000
  //     );

  //     return () => {
  //       clearTimeout(timeoutRef);
  //     };
  //   }
  // }, [isCompleted]);

  return (
    <>
      {!isLoading && (
        <>
          <Card>
            <CardContent className="grid gap-6 m-2">
              <Image
                src={`${data?.gifUrl}`}
                width={Number(data?.gifWidth)}
                height={Number(data?.gifHeight)}
                alt=""
                unoptimized
              />
              {!isCompleted && <GifGridSplitterForm data={data} />}
            </CardContent>
          </Card>
          {isCompleted && <GifGridSplitCompleted data={data} />}
        </>
      )}
    </>
  );
}
