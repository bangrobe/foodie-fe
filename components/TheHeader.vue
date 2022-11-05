<template>
  <section class="header-banner h-96 w-full bg-yellow-500">
    <div class="flex flex-col items-center justify-center h-full">
      <h1
        class="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700"
      >
        {{ props.homepage.data.attributes.description }}
      </h1>
      <div
        class="rounded-full p-1 box-border mt-8 bg-white overflow-hidden ring-red-300 focus:ring-4 w-96 flex items-center"
      >
        <input
          type="text"
          class="rounded-full px-4 focus:outline-none w-full bg-transparent"
          placeholder="Search here (feature temporary disable)"

        />
        <button
          type="submit"
          disabled
          class="btn-disabled text-sm bg-orange-500 py-3 px-6 rounded-full text-white ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform"
        >
          Search
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import getStrapiMedia from "../helpers/getMedia";
const props = defineProps({
  homepage: {
    type: Object,
    default: {
      data: {
        attributes: {
          description: "Foodie Homepage",
          background: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg"
        }
      }
    }
  },
});

const backgroundUrl = computed(() => {
  const url = getStrapiMedia(props.homepage.data.attributes.background);
  return `url('${url}')`;
});
/*** Đưa vào sau của hướng dẫn */
// const search = ref("")


// const emit = defineEmits(['search'])
// const handleSearch = () => {
//  emit('search', search.value)
// }
 

</script>
<style scoped>
.header-banner {
  background: v-bind(backgroundUrl) no-repeat center center;
}
</style>
