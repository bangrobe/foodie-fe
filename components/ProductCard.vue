<template>
  <div class="card bg-base-100 shadow-md">
    <figure class="px-4 pt-4">
      <img
        :src="`${getStrapiMedia(dish.attributes.image)}`"
        alt="Shoes"
        class="rounded-xl h-48 w-full"
      />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ dish.attributes.name }}</h2>
      <p class="text-red text-2xl font-bold">${{ dish.attributes.price }}</p>
      <div class="card-actions">
        <button
          @click="
            addToCart({
              name: dish.attributes.name,
              price: dish.attributes.price,
              id: dish.id,
            })
          "
          class="btn btn-primary"
        >
          Order Now
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import getStrapiMedia from "../helpers/getMedia";
const props = defineProps({
  dish: {
    type: Object,
    required: true
  },
});

const { addToCart } = useCart();
</script>
