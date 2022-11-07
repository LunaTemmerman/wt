import { createHeader } from 'styleguide-wt/src/organisms/Header';
import { createMap } from 'styleguide-wt/src/organisms/Map';
import { createContainer } from 'styleguide-wt/src/organisms/Container';
import { createChart } from './chart';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export async function displayHeader(type: string, body: HTMLBodyElement) {
  body.appendChild(
    type === 'Home'
      ? createHeader({
          type: type,
          home: './',
          map: './src/map/',
        })
      : createHeader({
          type: type,
          home: '../../',
        })
  );
  const logo = body.querySelector('header>nav>a>img.icon')!;
  addLogoAnimation(logo);
}

export function displayMap(main: HTMLElement) {
  main.appendChild(createMap({}));
  const mapcontainer = main.querySelector('.container--map')!;
  addCardsAnimations(mapcontainer);
}

export async function displayCurrent(
  main: HTMLElement,
  city: string,
  args: {
    weekday: string;
    time: string;
    temp: string;
    src: string;
    alt: string;
    currentdata: {
      label: string;
      color: string;
      weight: number;
    }[][];
  },
  hourlabels: string[],
  hourdata: {
    temp: number;
    humidity: number;
  }[]
) {
  main.appendChild(
    createContainer({
      type: 'currentheader',
      city: city,
    })
  );
  main.appendChild(
    createContainer({
      type: 'currentcards',
      weekday: args.weekday,
      time: args.time,
      temp: args.temp,
      src: args.src,
      alt: args.alt,
      currentdata: args.currentdata,
    })
  );
  createChart(hourlabels, hourdata, main);
  main.querySelector('.container--graph')?.setAttribute('tabindex', '0');
  const currentheader = main.querySelector('.container--currentheader')!;
  const currentcards = main.querySelector('.container--currentcards')!;
  addHeaderAnimations(currentheader);
  addCardsAnimations(currentcards);
}

export function displayForecast(
  args: {
    forecastdata: {
      weekday: string;
      date: string;
      src: string;
      alt: string;
      rain: string;
      temp: string;
    }[];
  },
  main: HTMLElement
): void {
  main.appendChild(
    createContainer({
      type: 'forecastheader',
    })
  );
  main.appendChild(
    createContainer({
      type: 'forecastcards',
      forecastdata: args.forecastdata,
    })
  );
  const forecastheader = main.querySelector('.container--forecastheader')!;
  const forecastcards = main.querySelector('.container--forecastcards')!;
  addHeaderAnimations(forecastheader);
  addCardsAnimations(forecastcards);
}

export function addHeaderAnimations(headers: Element) {
  gsap.fromTo(
    headers,
    0.8,
    {
      immediateRender: true,
      opacity: 0,
      x: -20,
    },
    {
      opacity: 1,
      x: 0,
      immediateRender: true,
      scrollTrigger: {
        trigger: headers,
        toggleActions: 'restart none restart pause',
      },
    }
  );
}
function addLogoAnimation(logo: Element) {
  const tl = gsap.timeline({
    immediateRender: true,
    scrollTrigger: {
      trigger: logo,
      toggleActions: 'restart none restart pause',
    },
  });
  tl.set(logo, {
    immediateRender: true,
    rotate: -120,
    x: -80,
    y: 20,
  });
  tl.to(logo, { x: 20, duration: 0.4, y: -5, height: '3rem', width: '3rem' });
  tl.to(logo, { duration: 0.1, rotate: -140 });
  tl.to(logo, { duration: 0.1, rotate: -120 });
  tl.to(logo, { duration: 0.1, rotate: -140 });
  tl.to(logo, { duration: 0.1, rotate: -120 });
  tl.to(logo, { duration: 0.1, rotate: -140 });
  tl.to(logo, { duration: 0.1, rotate: -120 });
  tl.to(logo, {
    x: 0,
    y: 0,
    width: '2.5rem',
    height: '2.5rem',
    rotate: 0,
    duration: 0.8,
  });
}
function addCardsAnimations(cards: Element) {
  gsap.fromTo(
    cards,
    0.8,
    {
      immediateRender: true,
      opacity: 0,
      y: 20,
    },
    {
      immediateRender: true,
      scrollTrigger: {
        trigger: cards,
        toggleActions: 'restart none restart pause',
      },
      opacity: 1,
      y: 0,
    }
  );
}
