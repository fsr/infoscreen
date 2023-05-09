<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { weekNumber } from "weeknumber";

const time = ref("");
const mydate = ref("");
const calendarWeek = weekNumber(new Date());

const updateTime = () => {
  const date = new Date();
  const options = { hour: "2-digit", minute: "2-digit" };
  const formatter = new Intl.DateTimeFormat("de", options);
  time.value = formatter.format(date);
};

onMounted(() => {
  updateTime();

  const date = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formatter = new Intl.DateTimeFormat("de", options);
  mydate.value = formatter.format(date);

  setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(updateTime);
});
</script>

<template>
  <div class="time">{{ time }}</div>
  <div class="date">{{ mydate }}, KW {{ calendarWeek }}</div>
</template>

<style scoped>
.time {
  font-size: 150px;
}
.date {
  font-size: 45px;
}
</style>
