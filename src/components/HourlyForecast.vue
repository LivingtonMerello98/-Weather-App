<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { store } from '../store';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  name: 'HourlyForecast',
  components: {
    LineChart: Line
  },
  computed: {
    hourlyWeather() {
      return store.getters.hourlyWeather();
    },
    chartData() {
      const labels = this.hourlyWeather.map(hour => new Date(hour.dt * 1000).getHours() + ':00');
      const temperatures = this.hourlyWeather.map(hour => (hour.temp - 273.15).toFixed(1));
      const minTemp = Math.min(...temperatures);
      const maxTemp = Math.max(...temperatures);
      
      return {
        labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            borderColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return;

              const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);

              gradient.addColorStop(0, '#3b82f6'); // Colore blu per temperatura minima
              gradient.addColorStop(0.5, '#38bdf8'); // Colore intermedio (blu chiaro)
              gradient.addColorStop(1, '#fbbf24'); // Colore giallo per temperatura massima

              return gradient;
            },
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: 'Time' },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
          y: { title: { display: true, text: 'Temperature (°C)' } },
        },
        plugins: {
          legend: { display: false },
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutCubic',
        },
      };
    },
  },
};
</script>

<template>
  <div>
    <h3 class="text-m font-semibold mb-4">Hourly Forecast</h3>
    <div v-if="!hourlyWeather.length" class="text-red-500">Data not available. Please try again later.</div>
    <line-chart v-else :data="chartData" :options="chartOptions" style="height: 300px;"></line-chart>
  </div>
</template>
