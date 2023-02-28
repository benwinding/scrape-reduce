import fs from "fs";
import path from "path";
import Bottleneck from "bottleneck";
import jsdom from "jsdom";
import { readFileString, saveFileString } from "./utils";

function getId(filePath: string) {
  return filePath.split('_').pop()?.split('.').shift() || "";
}

const limiter = new Bottleneck({
  maxConcurrent: 3,
});

export class Reducer {
  private inDir: string;
  private outDir: string;
  constructor(opts: {inDir: string, outDir: string}) {
    this.inDir = path.join(__dirname, opts.inDir);
    this.outDir = path.join(__dirname, opts.outDir);
    this.checkDirs();
  };
  private checkDirs() {
    if (!fs.existsSync(this.inDir)) {
      throw "scraped folder does not exist, run the scraper.js first";
    }
    if (!fs.existsSync(this.outDir)) {
      fs.mkdirSync(this.outDir);
    }
  }
  private makeOutPath(id: string, suffix: string): string {
    return path.join(this.outDir, `out_${id}${suffix}`);
  }  
  forEach(processId: (document: Document, html: string, id: string) => Promise<string>, fileExt: '.json' | '.txt') {
    const fileNames = fs.readdirSync(this.inDir);
    const fullFileNames = fileNames.map(fileName => path.join(this.inDir, fileName));
    fullFileNames.map(fileName => {
      const id = getId(fileName);
      const outFilePath = this.makeOutPath(id, fileExt);
      limiter.schedule(async () => {
        const htmlString = await readFileString(fileName);
        const dom = new jsdom.JSDOM(htmlString);
        const document = dom.window.document;
        const json = await processId(document, htmlString, id);
        saveFileString(outFilePath, json);
      });
    })
  }
  start() {
    limiter.done();
  }
}
