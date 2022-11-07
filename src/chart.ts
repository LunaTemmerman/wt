import Chart from 'chart.js/auto';

export function createChart(
  hourlabels: string[],
  hourdata: { humidity: number; temp: number }[],
  main: HTMLElement
): void {
  const temps: number[] = [];
  const hums: number[] = [];
  const ctx: HTMLCanvasElement = main.querySelector('#myChart')!;
  hourdata.forEach(hour => {
    temps.push(hour.temp);
    hums.push(hour.humidity);
  });
  const data = {
    labels: hourlabels,
    datasets: [
      {
        label: 'Temperature',
        data: temps,
        backgroundColor: '#b6651083',
        borderColor: '#b66510',
      },
      {
        label: 'Humidity',
        data: hums,
        backgroundColor: '#30667283',
        borderColor: '#306672',
      },
    ],
  };
  const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
    },
  });
  console.log(myChart);
}
