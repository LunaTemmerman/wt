# Weather Today ![Weather Today Logo](./public/logo.svg)
Weather Today is a free and open-source weather website. Here you can find all basic information that one may need. This includes the current temperature, weathertype, humidity and wind specifications, a hourly fourcast with the temperature and humidity, and a 14 day forecast with basic information. ☁🌧❄🌙🌞🌝 

This whole project was made with TypeScript. For Front-End Components, Storybook was used. 📖
## Features
### Real-time weather data
This project gets its weatherdata from openweathermaps. [(learn more)](https://openweathermap.org/api) This data is realtime and the api is really easy to work with. All the apis used are: 
1. [the current weather api](https://openweathermap.org/current)
2. [the hourly forecast api (4 days)](https://openweathermap.org/api/hourly-forecast)
3. [the daily forecast api (16 days)](https://openweathermap.org/forecast16).
4. [the weathermaps 2.0 api (latest version)](https://openweathermap.org/api/weather-map-1h)
### OpenLayers maps
As u may have noticed, I fetched weathermaps from openweathermaps. I displayed them with OL. [(learn more](https://openlayers.org/) There is only one map visible on the whole website under the map-tab. Here you can choose which layer you would like to add. 
1. Temperature
2. Wind
3. Humidity
4. Rain
There are also some cool animations implemented on these maps (zoom & move to). 
### Stoybook
The front-end was made in Storybook (for HTML). [(learn more)](https://storybook.js.org/) I made my own component library for this, you can find it [here](https://styleguide-wt.lunatemmerman.ikdoeict.be). You can use these components in projects of your own aswell!
### GSAP
The npm package gsap was used for the amazing animations and scrolltriggers in the website. I really recommend using gsap because it lifts web projects to a new level! The documentation is available [here](https://greensock.com/gsap/).
### Web Application
The site is fully downloadable using WPA. [(learn more)](https://web.dev/learn/pwa/) 
## Deployment
### Dev Dependencies:
- Node.js
- Vite 3.2.0 +
- TypeScript 4.6.4 +

### Other dependencies:
- chart.js
- gsap
- ol
- styleguide-wt

To deploy the project simply run 
- **npm i**
- **npm run build** : To build the project (vite)
- **npm run dev** : To go in development mode (vite). This also runs the project on your localhost. 
