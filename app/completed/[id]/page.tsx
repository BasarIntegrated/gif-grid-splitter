import React from "react";

import { redirect } from "next/navigation";
import { fetchGifSplitById } from "@/app/models/gifSplit.model";
import GifGridSplitCompleted from "./components/GifGridSplitCompleted";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import RestartButton from "./components/RestartButton";

export default async function GifConvertPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) return redirect("/");

  const data = await fetchGifSplitById(params.id);

  return (
    <div>
      <div>
        <b className="py-5">Original</b>
        <Card className="mt-2 table">
          <CardContent className="p-5 block align-center">
            <Image
              src={`${data?.gifUrl}`}
              width={Number(data?.gifWidth)}
              height={Number(data?.gifHeight)}
              alt=""
              unoptimized
            />
          </CardContent>
        </Card>
      </div>
      <div className="my-5">
        <b className="pb-2 mb-2">Splitted Images</b>

        <Card className="mt-2 table">
          <CardContent className="p-5 block align-center">
            <GifGridSplitCompleted data={data} />
          </CardContent>
        </Card>
        <div className="flex justify-center items-center">
          <div className="flex items-center p-2 space-x-2">
            <Switch id="animation-mode" />
            <Label htmlFor="animation-mode" className="">
              the Image On
            </Label>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="p-5">
        <RestartButton />
      </div>
    </div>
  );
}
