/**
 * Run this as much as you want (fearlessly).
 * It works off the local HTML, downloaded from the server.
 */

import { Reducer } from '../lib/reducer';

const reduce = new Reducer({ inDir: '../scraped', outDir: '../reduced' });

reduce.forEach(async (htmlDoc) => {
  const allMessages = htmlDoc.querySelectorAll('.messageContent')
  const text = Array.from(allMessages).map((msg) => msg.textContent).join('\n\n');
  return text;
}, '.txt');

reduce.start();
