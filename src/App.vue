<script setup>
import DeparturesBlock from "./components/DeparturesBlock.vue";
import Mensa from "./components/Mensa.vue";
import Meme from "./components/Meme.vue";

import Clock from "./components/Clock.vue";
import Weather from "./components/Weather.vue";
import Logo from "./components/Logo.vue";
</script>

<template>
  <div class="main">
    <div class="upper-block">
      <Mensa />
      <Meme />
      <div class="right-block" style="text-align: end">
        <div class="clock-weather">
          <Clock />
          <Weather />
        </div>
        <Logo />
      </div>
    </div>
    <DeparturesBlock />
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
  min-height: 100%;
  background-color: #7e71c1;
  border-radius: 60px 60px 0px 0px;
}
.upper-block {
  padding: 40px;
  display: flex;
  flex: 1;
  justify-content: space-between;
}

.right-block {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}
</style>
