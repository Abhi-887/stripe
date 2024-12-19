<!-- WineCard.vue -->
<template>
  <div class="wine-card bg-black flex flex-col text-center">
    <img :src="cardData.image" alt="Wine Guide" class="object-cover" />
    <h3 class="text-lg text-white p-5">{{ cardData.title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.wine-card {
}
</style>
