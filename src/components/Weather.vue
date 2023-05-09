<script setup>
import { ref, onMounted } from "vue";
import apiKey from "../apiKey";

const weather = ref("");
const weatherIcon = ref("");

function fetchWeather() {
  const city = "Dresden";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // round to 0 decimals
      weather.value = Math.round(data.main.temp) + " °C";
      // eg https://openweathermap.org/img/wn/10d@4x.png
      weatherIcon.value =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png";
    })
    .catch((error) => console.error(error));
}

onMounted(() => {
  fetchWeather();

  // refresh every 5 minutes
  setInterval(fetchWeather, 5 * 60 * 1000);
});
</script>

<template>
  <div class="weather">
    <img :src="weatherIcon" alt="Weather Icon" />
    <div class="temp">{{ weather }}</div>
  </div>
</template>

<style scoped>
.weather {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.temp {
  font-size: 110px;
}
</style>
