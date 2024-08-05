// app/api/gif-splits/[id]/route.ts
import { fetchGifSplitById } from "@/app/models/gifSplit.model";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const gifSplit = await fetchGifSplitById(id);

    if (gifSplit) {
      return NextResponse.json(gifSplit);
    } else {
      return NextResponse.json(
        { message: "GifSplit not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
