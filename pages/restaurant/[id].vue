<template>
    <NuxtLayout name="custom">
      <template #header>
        <TheNavbar />
        <PageHeader :info="restaurantInfo" v-if="restaurant && !error"/>
      </template>
      <div class="py-4">
        <div
          v-if="dishes.length > 0 && !error"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6"
        >
          <div v-for="dish in dishes" :key="dish.id">
            <ProductCard :dish="dish" />
          </div>
        </div>
        <div v-else-if="error">
          <h2 class="text-center text-2">
            Failed fetching data. Please try again.
          </h2>
        </div>
        <div v-else>
          <h2 class="text-center text-2">This restaurant has no dish</h2>
        </div>
      </div>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false,
});
//Su dung useState la bien phap tam thoi, chua co trong document, su dung khi layout:false
// const pageTitle = useState("pageTitle");
const route = useRoute();
const API_URL = useApi();
const {
  data: restaurant,
  pending,
  error,
} = await useAsyncData(
  `restaurant-${route.params.id}`,
  () =>
    $fetch(
      `${API_URL}/restaurants/${route.params.id}?populate[image][fields][0]=url&populate[dishes][populate][image][fields][0]=*`
    ),
);

if(!restaurant.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
// console.log(restaurant)

const restaurantInfo = computed(() => {
  if(restaurant.value.data) {
     const { name, image } = restaurant.value.data.attributes;
    return { name, image };
  } else {
    return {}
  }
   
});


//Phai dat duoi cac function khac
// pageTitle.value = restaurantInfo.value.name;

useHead({
  title: restaurant.value ? restaurant.value.data.attributes.name : "Error ",
  meta: [
    {
      name: "description",
      content: restaurant.value ? `Dishes from ${restaurant.value.data.attributes.name}` : '',
    },
  ],
});

const dishes = computed(() => {
  if (!restaurant.value) return [];
  return restaurant.value.data.attributes.dishes.data;
});
</script>

<style lang="scss" scoped></style>
