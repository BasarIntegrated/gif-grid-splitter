"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addSplitGifGridJob } from "../actions";

import UploadGif from "./UploadGif";
import { toast } from "sonner";

export const gifSplitDefaults = {
  rows: 5,
  cols: 5,
};

const formSchema = z.object({
  gifUrl: z.string().nonempty("Please upload a GIF"),
  rows: z.coerce.number().min(1),
  cols: z.coerce.number().min(1),
});

export default function UploadGifForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gifUrl: "",
      ...gifSplitDefaults,
    },
  });

  // 2. Define a submit handler.
  async function onUploadSuccess(data: Record<string, any>) {
    toast("GIF file has been uploaded successfully");

    console.log("onUploadSuccess:: ", {
      ...form.getValues(),
      gifUrl: `${data?.url}`,
      gifHeight: data.height,
      gifWidth: data.width,
    });
    // process GIF Split actions
    await addSplitGifGridJob({
      ...form.getValues(),
      gifUrl: `${data?.url}`,
      gifHeight: Number(data.height),
      gifWidth: Number(data.width),
    });
  }

  return (
    <Form {...form}>
      <form>
        <Card>
          <CardHeader>
            <CardTitle>GIF Grid Splitter</CardTitle>
            <CardDescription>Choose GIF</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <UploadGif onSuccess={onUploadSuccess} />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
