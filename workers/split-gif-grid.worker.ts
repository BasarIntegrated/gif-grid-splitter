import { Worker, Queue } from "bullmq";
import Redis from "ioredis";

import imagemagickCli from "imagemagick-cli";
import runScript from "@/lib/runScript";
import fs from "fs";
import { updateGifSplit } from "@/app/models/gifSplit.model";

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

export const SPLIT_GIF_GRID_QNAME = "splitGifGridQueue";

export const splitGifGridQueue = new Queue(SPLIT_GIF_GRID_QNAME, {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

const worker = new Worker(
  SPLIT_GIF_GRID_QNAME, // this is the queue name, the first string parameter we provided for Queue()
  async (job) => {
    const { id, gifUrl, rows, cols } = job?.data;

    try {
      const framesDir = `${process.env.SPLIT_OUTPUT_DIR}/frames/${id}`;
      console.log("framesDir: ", framesDir);
      await fs.mkdirSync(framesDir, { recursive: true });
      imagemagickCli
        .exec(`convert ${gifUrl} ${framesDir}/frame_%d.png`)
        .then(async () => {
          const croppedFramesDir = `${process.env.SPLIT_OUTPUT_DIR}/cropped_frames/${id}`;
          console.log("croppedFramesDir: ", croppedFramesDir);

          //   await fs.mkdirSync(croppedFramesDir, { recursive: true });
          await runScript(
            `./scripts/cropFrames.sh ${framesDir} ${croppedFramesDir} ${rows} ${cols}`
          );

          const finalOutputDir = `${process.env.SPLIT_OUTPUT_DIR}/final_frames/${id}`;
          console.log("finalOutputDir: ", finalOutputDir);

          //   await fs.mkdirSync(finalOutputDir, { recursive: true });

          await runScript(
            `./scripts/stitchFrames.sh ${croppedFramesDir} ${finalOutputDir} ${rows} ${cols}`
          );

          const gifSplit = await updateGifSplit(id, {
            completedAt: new Date(),
          });
          console.log("GIF Split Grid Task executed successfully", gifSplit);
        });
    } catch (error) {
      console.log("GIF Split Grid Task has failed", error, job?.data);
    }
  },
  {
    connection,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  }
);

export default worker;
