/**
 * Run this once (cautiously) it will scrape the website
 * and download the HTML locally to be reduced
 */

import { Scraper } from '../lib/scraper';
import fetch from 'node-fetch';

async function fetchPage(id: number) {
  return fetch(`https://somewebsite.com/page-${id}`, {
    "headers": {
      "accept": "text/html",
    },
    "method": "GET"
  }).then(res => res.text());
}

const pages = Array(20).fill(0).map((_, i) => i + 1);

const scrape = new Scraper({outDir: '../scraped'});

for(const page of pages) {
  scrape.queueFetch(page, fetchPage);
}

scrape.start();
