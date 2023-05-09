<script setup>
const props = defineProps(["line", "arrow"]);

function getMinutes(line) {
  let dateString = "";
  if (line.RealTime == null) {
    dateString = line.ScheduledTime;
  } else {
    dateString = line.RealTime;
  }

  const timestamp = parseInt(dateString.substring(6, 19));
  const date = new Date(timestamp);

  const diff = Math.floor((date - Date.now()) / 1000 / 60);
  if (diff <= 0) {
    return 0;
  }
  return diff;
}
</script>

<template>
  <div class="departure blink">
    <div class="line-name">{{ props.line.LineName }}</div>
    <div class="direction">{{ props.line.Direction.replace("DD ", "") }}</div>
    <div class="arrow">{{ props.arrow }}</div>
    <div class="minutes">
      {{ getMinutes(props.line) }}
    </div>
  </div>
</template>

<style scoped>
.departure {
  display: grid;
  grid-template-columns: min-content 3fr min-content 0.5fr;
  font-weight: 500;
  font-size: 2em;
}
.minutes {
  text-align: right;
}
.direction {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.line-name {
  padding-right: 10px;
}
.arrow {
  padding-right: 10px;
  padding-left: 10px;
}
</style>
