<template>
  <div class="pt-12 md:pt-0 2xl:ps-4">
    <h2 class="text-xl font-bold">Order Summary</h2>
    <div class="mt-8">
      <div class="flex flex-col space-y-4">
        <div class="flex space-x-4" v-for="item in cart" :key="item.id">
          <div>
            <h2 class="text-xl font-bold"></h2>
            <p class="text-sm">{{ item.name }}</p>
            <span class="text-red-600">Price</span> ${{ item.price }}
            <span class="text-gray-500 ml-2 text-sm">
              x {{ item.quantity }}</span
            >
          </div>
          <div class="items-end">
            <div class="w-4 h-4 cursor-pointer mb-6">
              <TrashIcon
                class="text-red-500 text-sm w-[24px]"
                @click="removeFromCart(item)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-4">
      <h2 class="text-xl font-bold">Total Quantity: {{ numberOfItems() }}</h2>
    </div>
    <div
      class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 text-heading last:border-b-0 last:text-base last:pb-0"
    >
      Subtotal<span class="ml-2">${{ priceTotal() }}</span>
    </div>
    <div
      class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 text-heading last:border-b-0 last:text-base last:pb-0"
    >
      Shipping Tax<span class="ml-2">$5</span>
    </div>
    <div
      class="flex items-center w-full py-4 text-2xl text-red-500 font-semibold border-b border-gray-300 lg:py-4 text-heading last:border-b-0 last:text-base last:pb-0"
    >
      Total<span class="ml-2"> ${{ totalToPay }}</span>
    </div>
  </div>
</template>
<script setup>
import TrashIcon from "./icons/TrashIcon.vue";
const { numberOfItems, clearCart, cart, removeFromCart, priceTotal } =
  useCart();

const totalToPay = computed(() => {
  return parseFloat(priceTotal()) + 5;
});
</script>
