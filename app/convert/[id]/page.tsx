import React from "react";

import { redirect } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import GifSplitContainer from "./components/GifSplitContainer";
import { fetchGifSplitById } from "@/app/models/gifSplit.model";

export default async function GifConvertPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) return redirect("/");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["gif-split", params.id],
    queryFn: () => fetchGifSplitById(params.id),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GifSplitContainer gifSplitId={params.id}></GifSplitContainer>
      </HydrationBoundary>
    </div>
  );
}
