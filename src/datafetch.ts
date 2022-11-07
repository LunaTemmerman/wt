import { dayOfWeek } from './current';
import { displayCurrent, displayForecast } from './display';
import { currentTime } from './current';

const key = '8d2bab8cb2b63fc5642c1d9d2f3c2f4d';

export async function today(
  main: HTMLElement,
  location?: { lat: number; long: number }
) {
  if (location) {
    const carddata = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=${key}&units=metric`
      )
    ).json();
    const graphdata = await (
      await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${location.lat}&lon=${location.long}&appid=${key}&units=metric`
      )
    ).json();
    await filterCurrent(main, carddata.name, carddata, graphdata.list);
  } else {
    navigator.geolocation.getCurrentPosition(async position => {
      const carddata = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`
        )
      ).json();
      const graphdata = await (
        await fetch(
          `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`
        )
      ).json();
      await filterCurrent(main, carddata.name, carddata, graphdata.list);
    });
  }
}

async function filterCurrent(
  main: HTMLElement,
  city: string,
  carddata: {
    main: {
      temp_max: number;
      temp_min: number;
      feels_like: number;
      humidity: number;
    };
    weather: {
      icon: string;
      main: string;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
  },
  graphdata: {
    dt_txt: string;
    main: {
      humidity: number;
      temp: number;
    };
  }[]
) {
  const weekday = currentTime().day;
  const time = currentTime().time;
  const temp = `${Math.round(carddata.main.temp_max)}°/${Math.round(
    carddata.main.temp_min
  )}°`;
  const src = `${carddata.weather[0].icon}.svg`;
  const alt = carddata.weather[0].main;

  const currentlabels = [
    ['feels like', `${carddata.main.feels_like}°`],
    ['wind', `${carddata.wind.speed}m/s ${carddata.wind.deg}°`],
    ['weather', `${carddata.weather[0].main}`],
    ['humidity', `${carddata.main.humidity}%`],
  ];

  let currentdata: {
    label: string;
    color: string;
    weight: number;
  }[][] = [];

  currentlabels.forEach(label => {
    currentdata.push([
      { label: label[0], color: 'white', weight: 500 },
      { label: label[1], color: 'white', weight: 700 },
    ]);
  });

  let hourlabels: string[] = [];
  let hourdata: { humidity: number; temp: number }[] = [];
  graphdata.forEach(hour => {
    hourdata.push({
      humidity: hour.main.humidity,
      temp: hour.main.temp,
    });
    hourlabels.push(`${hour.dt_txt.substring(11, 16)}`);
  });
  const args = {
    weekday: weekday,
    time: time,
    temp: temp,
    src: src,
    alt: alt,
    currentdata: currentdata,
  };
  displayCurrent(main, city, args, hourlabels, hourdata);
}

export async function daily(
  main: HTMLElement,
  location?: { lat: number; long: number }
) {
  if (location) {
    const data = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${location.lat}&lon=${location.long}&cnt=16&appid=${key}&units=metric`
      )
    ).json();
    filterForecast(main, data.list);
  } else {
    navigator.geolocation.getCurrentPosition(async position => {
      const data = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=16&appid=${key}&units=metric`
        )
      ).json();
      filterForecast(main, data.list);
    });
  }
}

function filterForecast(
  main: HTMLElement,
  days: {
    dt: number;
    weather: {
      icon: string;
      main: string;
    }[];
    temp: {
      max: number;
      min: number;
    };
    pop: number;
  }[]
) {
  let forecastdata: {
    weekday: string;
    date: string;
    src: string;
    alt: string;
    rain: string;
    temp: string;
  }[] = [];
  days.forEach(day => {
    const dow = new Date(day.dt * 1000);
    forecastdata.push({
      weekday: dayOfWeek(dow),
      date: `${dow.getDate()} - ${dow.getMonth() + 1}`,
      src: `${day.weather[0].icon}.svg`,
      alt: day.weather[0].main,
      rain: `${Math.round(day.pop * 100)}%`,
      temp: `${Math.round(day.temp.max)}°|${Math.round(day.temp.min)}°`,
    });
  });
  displayForecast({ forecastdata }, main);
}
