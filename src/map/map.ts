import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { daily } from '../datafetch';
import { today } from '../datafetch';
import XYZ from 'ol/source/XYZ';
import { displayHeader } from '../display';
import { displayMap } from '../display';
import { useGeographic } from 'ol/proj';

const body = document.querySelector('body')!;
displayHeader('place', body);
const main = document.createElement('main');
body.appendChild(main);
displayMap(main);
const placeform = document.querySelector<HTMLFormElement>('form[name=place]')!;
const layerbuttons = document.querySelectorAll<HTMLButtonElement>(
  '.container--maplayers button'
)!;
const place = document.querySelector<HTMLInputElement>('input[name=place]')!;
const errorfield =
  document.querySelector<HTMLParagraphElement>('form[name=place] p')!;

let error: string;

let map: Map;
let view: View;
const key = '8d2bab8cb2b63fc5642c1d9d2f3c2f4d';
let layerurl: string;

navigator.geolocation.getCurrentPosition(async position => {
  useGeographic();
  view = new View({
    center: [position.coords.longitude, position.coords.latitude],
    zoom: 5,
  });
  map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: view,
    controls: [],
  });
  map.updateSize();
});

async function displayInfo(coords?: { lat: number; long: number }) {
  await today(main, coords);
  await daily(main, coords);
}
displayInfo();

place.addEventListener('input', () => {
  error = '';
  place.value ? '' : (error = 'No place given. Please enter a place ...');

  place.value.match(/^[A-Za-z]+$/)
    ? ''
    : (error = 'A city can only contain letters. Please check your input ...');
  errorfield.innerText = error;
  errorfield.style.display = 'block';
});

placeform.addEventListener('submit', event => {
  event.preventDefault();
  formChecking();
});

layerbuttons.forEach(button => {
  button.addEventListener('click', () => {
    view.animate({ zoom: 5 }, { duration: 2000 });
    map.removeLayer(map.getLayers().getArray()[1]);
    layerurl = `https://maps.openweathermap.org/maps/2.0/weather/${button.name}/{z}/{x}/{y}?appid=${key}`;
    const layer = new TileLayer({
      source: new XYZ({
        url: layerurl,
      }),
    });
    map.addLayer(layer);
    map.updateSize();
  });
});

async function formChecking() {
  error = '';
  errorfield.style.display = 'none';
  let allOk = true;

  if (!place.value) {
    error = 'No place given. Please enter a place ...';
    allOk = false;
  }

  if (allOk) {
    errorfield.innerText = '';
    errorfield.style.display = 'none';
    const data = await (
      await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${place.value}&limit=1&appid=${key}`
      )
    ).json();
    if (data.length === 0) {
      error = `No city found called ${place.value}, please check your spelling ...`;
      errorfield.innerText = error;
      errorfield.style.display = 'block';
    } else {
      const containers = main.querySelectorAll('.container')!;
      for (let i = 2; i < containers.length; i++) {
        main.removeChild(containers[i]);
      }
      const coords = { lat: data[0].lat, long: data[0].lon };
      displayInfo(coords);
      view.animate(
        { zoom: 7 },
        { center: [coords.long, coords.lat] },
        { zoom: 13 },
        { duration: 9000 }
      );
      map.updateSize();
    }
  } else {
    errorfield.innerText = error;
    errorfield.style.display = 'block';
  }
}
