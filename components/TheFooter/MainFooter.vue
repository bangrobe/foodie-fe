<template>
  <div class="flex pb-8">
    <div class="flex flex-grow">
      <h1 class="text-h1 text-white">Bangdigi</h1>
    </div>

    <div class="flex space-x-12">
      <div class="flex flex-col space-y-2">
        <span
          v-for="link in FooterLinks.slice(0, 4)"
          :key="link.id"
          class="text-white poppins"
        >
          {{ link.text }}
        </span>
      </div>
      <div class="flex flex-col space-y-2">
        <span
          v-for="link in FooterLinks.slice(4, 8)"
          :key="link.id"
          class="text-white poppins"
        >
          {{ link.text }}
        </span>
      </div>
      <div class="flex flex-col space-y-2">
        <span
          v-for="link in FooterLinks.slice(8, 12)"
          :key="link.id"
          class="text-white poppins"
        >
          {{ link.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const FooterLinks = [
  { id: 1, text: "About Online Food" },
  { id: 2, text: "Read our blog" },
  { id: 3, text: "Sign up to deliver" },
  { id: 4, text: "Add your restaurant" },
  { id: 5, text: "Get Help" },
  { id: 6, text: "Ask any question" },
  { id: 7, text: "Order Now" },
  { id: 8, text: "Contact" },
  { id: 9, text: "Facebook" },
  { id: 10, text: "Instagram" },
  { id: 11, text: "Twitter" },
  { id: 12, text: "Youtube" },
];
</script>

<style lang="scss" scoped></style>
