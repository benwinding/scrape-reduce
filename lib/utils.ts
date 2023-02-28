import fs from "fs";

export async function isCached(filePath: string) {
  const exists = await new Promise((res) => fs.exists(filePath, res));
  return exists;
}

export async function readFileString(filePath: string) {
  const scrapedFile = await new Promise<Buffer>(res => fs.readFile(filePath, (_, d) => res(d)));
  const scrapedHtml = scrapedFile.toString();
  return scrapedHtml;
}

export async function saveFileString(filePath: string, str: string) {
  return new Promise((res) => fs.writeFile(filePath, str, res));
}
