"use server";

import { GifSplit } from "@prisma/client";
import { GifSplitOptions } from "@/types";
import db from "@/prisma/db";

/**
 * Creates a new GIF split record in the database.
 *
 * @param data - The data required to create a new GIF split.
 * @returns The newly created GIF split record.
 */
export async function createGifSplit(data: GifSplitOptions) {
  return db.gifSplit.create({
    data,
  });
}

/**
 * Updates an existing GIF split record in the database.
 *
 * @param id - The unique identifier of the GIF split to update.
 * @param data - The partial data to update the GIF split with.
 * @returns The updated GIF split record.
 */
export async function updateGifSplit(id: string, data: Partial<GifSplit>) {
  return db.gifSplit.update({
    where: { id },
    data,
  });
}

/**
 * Fetches a GIF split record from the database by its ID.
 *
 * @param id - The unique identifier of the GIF split to fetch.
 * @returns The GIF split record if found, or null if not found.
 */
export async function fetchGifSplitById(id: string): Promise<GifSplit | null> {
  const gifSplit = await db.gifSplit.findFirst({
    where: {
      id,
    },
  });

  return gifSplit;
}
