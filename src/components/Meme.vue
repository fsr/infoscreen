<script setup>
import { onMounted, ref } from "vue";

const imageUrl = ref("https://users.ifsr.de/~marco.lehner/memes/today.png");

function updateImage() {
  const random = new Date().getTime();
  imageUrl.value = `https://users.ifsr.de/~marco.lehner/memes/today.png?rnd=${random}`;
}

onMounted(() => {
  // every 5 minutes
  setInterval(updateImage, 5 * 60 * 1000);
});
</script>

<template>
  <div class="meme">
    <img class="img" :src="imageUrl" alt="Meme" />
  </div>
</template>

<style scoped>
.meme {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img {
  max-height: 600px;
  border-radius: 60px;
  display: block;
  margin: 0 auto;
  height: 100%;
}
</style>
