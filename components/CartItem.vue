<template>
  <div
    class="p-2 flex bg-white hover:bg-gray-100 border-b border-gray-100 w-64"
    style=""
  >
    <div class="flex-auto text-sm w-32">
      <div class="font-bold">{{ item.name }}</div>
      <div class="text-gray-400">Qt: {{ item.quantity }}</div>
    </div>
    <div class="flex flex-col w-18 font-medium items-end">
      <div class="w-4 h-4 cursor-pointer mb-6">
        <TrashIcon class="text-red-500 text-sm w-[24px]" @click="removeFromCart(item)" />
      </div>
      ${{ item.price }}
    </div>
  </div>
</template>

<script setup>
import TrashIcon from "./icons/TrashIcon.vue";
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const { removeFromCart } = useCart();
</script>
