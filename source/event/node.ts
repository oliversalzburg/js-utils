import { type Readable } from "node:stream";
import { EventIterator, EventIteratorOptions } from "./event-iterator.js";

export function stream(
  this: Readable,
  iteratorOptions?: EventIteratorOptions,
): EventIterator<Buffer> {
  return new EventIterator<Buffer>(queue => {
    this.addListener("data", queue.push);
    this.addListener("end", queue.stop);
    this.addListener("error", queue.fail);

    queue.on("highWater", () => this.pause());
    queue.on("lowWater", () => this.resume());

    return () => {
      this.removeListener("data", queue.push);
      this.removeListener("end", queue.stop);
      this.removeListener("error", queue.fail);

      // We are no longer interested in any data; attempt to close the stream.
      this.destroy();
    };
  }, iteratorOptions);
}
