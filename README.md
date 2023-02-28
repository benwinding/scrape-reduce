# scrape-reduce

A simple way to scape websites, just download the HTML once, and process it as many times as you want.

<img width="400" src="https://i.imgur.com/dCkZlaF.png"/>

## Usage

```
git clone git@github.com:benwinding/scrape-reduce.git
cd scrape-reduce
npm install
```

1. `npm run scrape` - Scrapes HTML from the target website
2. `npm run reduce` - Transforms the local HTML into what ever you need

## Features

- Avoids downloading too often, only scrape when you need to
- Caching means the scrape can be interrupted, and resumed
- You can iterate quickly with reduce, without network calls to the target site
