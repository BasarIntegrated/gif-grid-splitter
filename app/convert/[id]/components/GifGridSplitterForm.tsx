"use client";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GifSplit } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { processSplitGifGridJobQueue } from "../../actions";

const formSchema = z.object({
  gifUrl: z.string().nonempty("Please upload a GIF"),
  rows: z.coerce.number().max(10).min(1),
  cols: z.coerce.number().max(10).min(1),
});

interface GifConvertFormProps {
  data: GifSplit | null | undefined;
}
export default function GifGridSplitterForm({ data }: GifConvertFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...data,
    },
  });

  const [gifSplit, setGifSplit] = useState(data);
  useEffect(() => {
    if (data) {
      setGifSplit(data);
    }
  }, [data]);

  // 2. Define a submit handler.
  const [isProcessing, setProcessing] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // process GIF Split actions
    setProcessing(true);

    console.log("values:: ", values);
    const data = {
      ...gifSplit,
      ...values,
    };
    await processSplitGifGridJobQueue(data as GifSplit);
  }

  return (
    <>
      {isProcessing && <LoadingSpinner text="Converting.. please wait.." />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!isProcessing && (
            <Card>
              <CardContent className="grid gap-6 border-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="rows"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rows</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Rows"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="cols"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cols</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Cols"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between space-x-2">
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.push("/")}
                  >
                    Cancel
                  </Button>
                  <Button>Split Image</Button>
                </>
              </CardFooter>
            </Card>
          )}
        </form>
      </Form>
    </>
  );
}
