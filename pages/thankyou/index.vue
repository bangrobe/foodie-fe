<template>
  <div>
    <div class="md:h-32 h-24"></div>
    <div class="flex max-w-5xl items-center justify-center">
      <div class="card shadow-sm p-8 text-center">
        <h1 class="text-3xl">Thank you for your ordering!</h1>
        <p class="font-semibold text-xl my-4">
          Order details has been sent your email.
        </p>
        <div class="w-full">
          <nuxt-link to="/" class="btn btn-primary text-white w-48 text-center">
            Return to homepage
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
useHead({
  title: computed(() => `Thank you`),
});
definePageMeta({
  middleware: ["auth"],
});
</script>
