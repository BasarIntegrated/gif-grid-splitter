"use client";

import React, { useEffect, useRef, useState } from "react";
import { GifSplit } from "@prisma/client";

interface GifConvertFormProps {
  data: GifSplit | null | undefined;
}
export default function GifGridSplitCompleted({ data }: GifConvertFormProps) {
  const { rows = 0, cols = 0, gifWidth = 100, gifHeight = 100 } = data || {};

  const baseUrl = `/output/final_frames/${data?.id}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const [cellWidth, setCellWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newCellWidth = containerWidth / cols;
        setCellWidth(newCellWidth);
      }
    };

    // Initial calculation
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cols]);

  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleImageLoad = (key: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const areAllImagesLoaded = () => {
    return (
      Object.keys(loadedImages).length === rows * cols &&
      Object.values(loadedImages).every(Boolean)
    );
  };

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const src = `${baseUrl}/cell_r${row}_c${col}.gif`;
        const cellWidth = Math.floor(gifWidth / cols);
        const cellHeight = Math.floor(gifHeight / rows);
        const key = `${row}-${col}`;

        grid.push(
          <div
            key={key}
            className="split-gif-cell"
            style={{ width: cellWidth }}
          >
            <img
              src={src}
              alt={`Gif part ${row}-${col}`}
              className="w-full h-full object-contain"
              onLoad={() => handleImageLoad(key)}
            />
          </div>
        );
      }
    }
    return grid;
  };

  const playAnimation = () => {
    const images = document.querySelectorAll<HTMLImageElement>(
      ".split-gif-cell img"
    );
    images.forEach((img) => {
      const src = img.src;
      img.src = ""; // Reset the src
      setTimeout(() => {
        img.src = src; // Restore the src to reset the animation
      }, 0);
    });
  };

  useEffect(() => {
    if (areAllImagesLoaded()) {
      playAnimation();
    }
  }, [loadedImages]);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-${cols} grid-rows-${rows} gap-1`}
      style={{ maxWidth: gifWidth + cols, maxHeight: gifHeight + rows }}
    >
      {renderGrid()}
    </div>
  );
}
