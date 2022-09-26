<template>
  <section
    class="h-96 w-full bg-yellow-500 flex items-center justify-center"
  >
    <div class="bg-opacity-60"></div>
    <div class="text-center">
      <div class="max-w-md">
        <h2 class="text-h2 text-4xl font-semibold text-white">
          {{ info.name }}
        </h2>
      </div>
    </div>
  </section>
</template>
<script setup>
import getStrapiMedia from "../helpers/getMedia";
const props = defineProps({
  info: {
    type: Object,
  },
});
const backgroundUrl = computed(() => {
  if (props.info.image) {
    const url = getStrapiMedia(props.info.image);
    return `url('${url}')`;
  }
  return;
});
</script>
<style scoped>
.page-header {
  background: v-bind(backgroundUrl) no-repeat center center;
  background-size: cover;
}
</style>
