<script setup>
import { onMounted, ref } from "vue";

const meals = ref([]);

onMounted(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  fetch(`https://openmensa.org/api/v2/canteens/79/days/${formattedDate}/meals`)
    .then((response) => response.json())
    .then((data) => {
      meals.value = data;
    });
});

function mealIcons(meal) {
  let icons = "";
  if (meal.notes.includes("Menü ist vegetarisch")) {
    icons += "🍃";
  } else if (meal.notes.includes("Menü ist vegan")) {
    icons += "🍃🍃";
  } else if (meal.notes.includes("enthält Alkohol")) {
    icons += "🍷";
  } else if (
    meal.notes.includes("enthält Schweinefleisch") ||
    meal.notes.includes("mit tierischem Lab")
  ) {
    icons += "🐷";
  } else if (meal.notes.includes("enthält Rindfleisch")) {
    icons += "🐮";
  }
  return icons;
}

function removeBrackets(name) {
  return name.replace(/\(.*?\)/g, "");
}
</script>

<template>
  <div class="mensa">
    <div class="text-mensa">Alte Mensa</div>
    <div class="meal" v-for="meal in meals.splice(0, 4)">
      <div class="category">
        {{ meal.category.toUpperCase() }} {{ mealIcons(meal) }}
      </div>
      <div>{{ removeBrackets(meal.name) }}</div>
    </div>
  </div>
</template>

<style scoped>
.mensa {
  display: block;
  flex: 1;
  font-size: 1.4em;
}
.text-mensa {
  font-weight: 100;
  font-size: 80px;
}
.category {
  font-weight: 200;
  font-size: 20px;
}
.meal {
  padding-bottom: 20px;
}
</style>
