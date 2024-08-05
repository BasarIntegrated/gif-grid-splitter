"use client";

import React, { useEffect, useRef, useState } from "react";
import { GifSplit } from "@prisma/client";
import Image from "next/image";
import { toast } from "sonner";

interface GifConvertFormProps {
  data: GifSplit | null | undefined;
}

export default function GifGridSplitCompleted({ data }: GifConvertFormProps) {
  const { rows = 0, cols = 0, gifWidth = 100, gifHeight = 100 } = data || {};

  const baseUrl = `/output/final_frames/${data?.id}`;

  const containerRef = useRef<HTMLDivElement>(null);

  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [cnt, setCnt] = useState(0);
  const handleImageLoad = (key: string) => {
    console.log(`Image ${key} has loaded`);
    setLoadedImages((prev) => {
      const newLoadedImages = {
        ...prev,
        [`${key}`]: true,
      };
      // console.log("Updated loadedImages state:", newLoadedImages);
      return newLoadedImages;
    });
    console.log("CNT: ", cnt);
    setCnt(cnt + 1);
  };

  const areAllImagesLoaded = () => {
    const totalImages = rows * cols;
    const loadedCount = Object.keys(loadedImages).length;
    const allLoaded = Object.values(loadedImages).every(Boolean);

    console.log("areAllImagesLoaded: Checking image load status");
    console.log("Loaded images count:", loadedCount);
    console.log("Total images required:", totalImages);
    const percentage = (loadedCount / totalImages) * 100;
    console.log("All images loaded percentage status:", percentage);

    return percentage >= 90; // at least 90% are loaded? not getting 100
  };

  const renderGridTable = () => {
    console.log("renderGrid: Generating grid");
    const grid = [];
    const loadedImages: { [key: string]: boolean } = {};

    for (let row = 0; row < rows; row++) {
      const rowCells = [];
      for (let col = 0; col < cols; col++) {
        const src = `${baseUrl}/cell_r${row}_c${col}.gif`;
        const cellWidth = Math.floor(gifWidth / cols);
        const cellHeight = Math.floor(gifHeight / rows);
        const key = `${row}-${col}`;

        rowCells.push(
          <td key={key} className="p-0.5">
            <Image
              src={src}
              alt={`Gif part ${row}-${col}`}
              id={`gif-${key}`}
              width={cellWidth}
              height={cellHeight}
              onLoad={() => handleImageLoad(key)}
              onError={() => console.log("Error: ", src)}
              unoptimized
            />
          </td>
        );

        loadedImages[`${key}`] = false;
      }

      grid.push(<tr key={`row-${row}`}>{rowCells}</tr>);
    }

    return (
      <table className="border-collapse">
        <tbody>{grid}</tbody>
      </table>
    );
  };

  const [isPlayed, setPlayed] = useState(false);
  const playAnimation = () => {
    if (isPlayed) return;
    console.log("playAnimation: Triggering animation for all images");
    const images = document.querySelectorAll<HTMLImageElement>(
      ".split-gif-cell img"
    );
    for (let index = 0; index < images.length; index++) {
      const img = images[index];
      const src = img.src;
      img.src = ""; // Reset the src
      setTimeout(() => {
        img.src = src; // Restore the src to reset the animation
        console.log("Restore the src to reset the animation");
      }, 0);
    }
    setPlayed(true);
  };

  useEffect(() => {
    console.log("useEffect: Checking if all images are loaded");
    if (areAllImagesLoaded()) {
      console.log("All images loaded. Playing animation.");
      playAnimation();
      toast("GIF Split process is completed.");
    } else {
      console.log("Not all images are loaded yet.");
    }
  }, [loadedImages]);

  return (
    <div>
      <div
        ref={containerRef}
        style={{ maxWidth: gifWidth + cols, maxHeight: gifHeight + rows }}
      >
        {renderGridTable()}
      </div>
    </div>
  );
}
