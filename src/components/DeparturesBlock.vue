<script setup>
import Stop from "./Stop.vue";
</script>

<template>
  <div class="departures-block">
    <Stop stopId="33000742" arrowLeftPlatforms="1" arrowRightPlaftforms="2" />
    <Stop stopId="33000134" arrowLeftPlatforms="1" arrowRightPlaftforms="2" />
    <Stop stopId="33000727" arrowLeftPlatforms="2" arrowRightPlaftforms="1" />
  </div>
</template>

<style scoped>
.departures-block {
  display: flex;
  justify-content: space-between;
  background-color: #2e2e2e;
  border-radius: 60px 60px 0px 0px;
  padding: 40px;
}
</style>
