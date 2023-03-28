import fs from "fs";
import { Readable } from "stream";

const readableStream = fs.createReadStream("./data.txt", { highWaterMark: 100 });

readableStream.on("data", (chunk) => {
  console.log(`Received ${chunk.length} byte of data -> ${chunk}`);
});

readableStream.on("end", () => {
  console.log("Stream Ended");
});

// Custom Readable Stream
const data = "lorem ipsDo laboris ea labore aute nulla do occaecat veniam sit aliquip exercitation qui ex amet. Sit duis eiusmod";

const customReadableStream = new Readable({
  read() {
    if (!this.x) this.x = 0;

    if (this.x === data.length) {
      this.push(null);
    } else {
      const chunk = data.substring(this.x, this.x + 50);
      this.push(chunk);
    }
    this.x += 50;
  },
});

customReadableStream.on("data", (chunk) => {
  console.log(`Received ${chunk.length} byte of data -> ${chunk}`);
});

customReadableStream.on("end", () => {
  console.log("Custom readable stream ended");
});
