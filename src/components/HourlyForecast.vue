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
      return {
        labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
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
              maxTicksLimit: 10, // Limita il numero di tick sull'asse x
            },
          },
          y: { title: { display: true, text: 'Temperature (°C)' } },
        },
        plugins: {
          legend: { display: false },
        },
        animation: {
          duration: 1000, // Durata dell'animazione in millisecondi
          easing: 'easeInOutCubic', // Tipo di easing (effetto di transizione)
        },
      };
    },
  },
};
</script>

<template>
  <div>
    <h3 class="text-m font-semibold mb-4">Hourly Forecast</h3>
    <p v-if="!hourlyWeather.length" class="text-red-500">Data not available. Please try again later.</p>
    <line-chart v-else :data="chartData" :options="chartOptions" style="height: 300px;"></line-chart>
  </div>
</template>
