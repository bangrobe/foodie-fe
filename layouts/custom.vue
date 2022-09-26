<template>
  <div class="flex flex-col h-screen">
    <header>
      <slot name="header"></slot>
    </header>

    <div
      class="max-w-3xl md:max-w-4xl mx-auto mt-4 md:px-0 px-2 flex-grow w-full"
    >
      <main>
        <slot />
      </main>
    </div>
    <TheFooter />
  </div>
</template>
<script setup>
//Another way to set Head
// const pageTitle = useState("pageTitle");

// useHead({
//   titleTemplate: (title) => {
//     return title ? `${title} - DigiFoodie` : "DigiFoodie";
//   },
//   title: computed(() => `${pageTitle.value}`),
// });
</script>
