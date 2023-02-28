# scrape-reduce

A simple way to scape websites, just download the HTML once, and process it as many times as you want.

<img width="400" src="https://i.imgur.com/6z19dNK.png"/>

## Get Started

To get going, just clone/fork this repo (or use it as a [github template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template))

```
git clone git@github.com:benwinding/scrape-reduce.git
cd scrape-reduce
npm install
```

1. `npm run scrape` 
  - Scrapes HTML from the target website
  - The HTML returned is saved to the `scraped` directory
  - Runs the `scrape.ts` in the `src` directory
    - Provide your own fetch method etc...
    - This caches based on the ID provided for each page
2. `npm run reduce`
  - Transforms the local HTML into what ever you need
  - The text returned is saved to `reduced`
  - Runs the `reduce.ts` in the `src` directory
    - You can read the DOM here and find elements etc...

## Features

- Avoids downloading too often, only scrape when you need to
- Caching means the scrape can be interrupted, and resumed
- You can iterate quickly with reduce, without network calls to the target site
