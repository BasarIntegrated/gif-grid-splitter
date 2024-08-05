"use server";

import { redirect, RedirectType } from "next/navigation";
import { createGifSplit } from "../models/gifSplit.model";
import { GifSplitOptions } from "@/types";

export async function addSplitGifGridJob(data: GifSplitOptions) {
  const gifSplit = await createGifSplit(data);
  redirect(`/convert/${gifSplit.id}`, RedirectType.replace);
}
