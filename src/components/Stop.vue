<script setup>
import Departure from "./Departure.vue";

import { onMounted, ref } from "vue";

const props = defineProps([
  "stopId",
  "arrowLeftPlatforms",
  "arrowRightPlaftforms",
]);

const departures = ref([]);
const stopName = ref("");

function fetchStops() {
  fetch("https://webapi.vvo-online.de/dm", {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      stopid: props.stopId,
      isarrival: false,
      mot: [
        "Tram",
        "CityBus",
        "IntercityBus",
        "SuburbanRailway",
        "Train",
        "Cableway",
        "Ferry",
        "HailedSharedTaxi",
      ],
      limit: 30,
      shorttermchanges: true,
      mentzonly: false,
      format: "json",
    }),
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      departures.value = data.Departures;
      stopName.value = data.Name.split("(")[0]; // remove the (Fr.-Foerster-Platz) part
    })
    .catch((error) => {
      console.error(error);
    });
}

onMounted(() => {
  fetchStops();

  setInterval(() => {
    fetchStops();
  }, 1000 * 60);
});

function getArrow(line) {
  let arrowLeftPlatformsList = props.arrowLeftPlatforms.split(",");
  let arrowRightPlaftformsList = props.arrowRightPlaftforms.split(",");

  if (arrowLeftPlatformsList.includes(line.Platform.Name)) {
    return "<";
  } else if (arrowRightPlaftformsList.includes(line.Platform.Name)) {
    return ">";
  } else {
    return "";
  }
}
</script>

<template>
  <div class="stop">
    <div class="stop-name">{{ stopName }}</div>
    <div v-for="myline in departures.slice(0, 4)">
      {{ myline.message }}
      <Departure :line="myline" :arrow="getArrow(myline)" />
    </div>
  </div>
</template>

<style scoped>
.stop {
  padding: 0 20px;
  flex: 1;
}

.stop-name {
  font-weight: 200;
  font-size: 2em;
}
</style>
