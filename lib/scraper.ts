import fs from "fs";
import path from "path";
import Bottleneck from "bottleneck";
import { isCached } from "./utils";

export type CacheId = number | string;

function getFilePathFromId(outDir: string, id: CacheId): string {
  return path.join(outDir, `scraped_${id}.html`);
}

const limiter = new Bottleneck({
  maxConcurrent: 3,
});

export class Scraper {
  private outDir: string;
  constructor(opts: {outDir: string}) {
    this.outDir = path.join(__dirname, opts.outDir);
    this.checkDir();
  }
  private checkDir() {
    if (!fs.existsSync(this.outDir)) {
      fs.mkdirSync(this.outDir);
    }
  }
  queueFetch<T extends CacheId>(id: T, fetchHtmlString: (item: T) => Promise<string>) {
    limiter.schedule(async () => {
      const filePath = getFilePathFromId(this.outDir, id);
      const idCached = await isCached(filePath);
      if (idCached) {
        return;
      }
      const htmlString = await fetchHtmlString(id);
      fs.writeFileSync(filePath, htmlString)
    });
  }
  start() {
    limiter.done();
  }
}
