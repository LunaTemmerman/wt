import { today } from './datafetch';
import { daily } from './datafetch';
import { displayHeader } from './display';

const body = document.querySelector('body')!;
const main = document.createElement('main');

(async () => {
  await displayHeader('home', body);
  body.appendChild(main);
  await today(main);
  await daily(main);
})();
