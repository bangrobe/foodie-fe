<template>
  <div class="card md:card-side bg-base-100 shadow-sm mb-4">
    <figure>
      <img
        class="md:w-64 w-full p-4 rounded-lg"
        :src="`${getStrapiMedia(restaurant.attributes.image)}`"
      />
    </figure>
    <div class="card-body items-center md:items-start">
      <h2 class="card-title">{{ restaurant.attributes.name }}</h2>
      <div class="card-actions justify-start">
        <NuxtLink
          :to="`/restaurant/${restaurant.id}`"
          class="btn btn-primary btn-sm"
          >View Menu</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import getStrapiMedia from "~~/helpers/getMedia";
const props = defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});
</script>
