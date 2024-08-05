"use server";

import { GifSplit } from "@prisma/client";
import { splitGifGridQueue } from "@/workers/split-gif-grid.worker";
import { updateGifSplit } from "../models/gifSplit.model";

export async function processSplitGifGridJobQueue(gifSplit: GifSplit) {
  await updateGifSplit(gifSplit.id, gifSplit);
  await splitGifGridQueue.add("splitJob", gifSplit);
}
