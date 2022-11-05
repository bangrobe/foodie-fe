<template>
  <div>
    <NuxtLayout name="custom">
      <template #header>
        <TheNavbar />
        <TheHeader :homepage="homepage" v-if="!error2"/>
      </template>
      <div v-if="restaurants && !error">
        <RestauntCard
          v-for="restaurant in restaurants.data"
          :key="restaurant.id"
          :restaurant="restaurant"
        />
      </div>

      <RenderError v-else />
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});

useHead({
  title: "Homepage",
  meta: [
    {name: "description", content: "Best restaurants you can find on DigiFoodie"}
  ]
})
const API_URL = useApi();
//Đoạn này dùng lúc đầu, sau đó thay thế ở khúc trên
const { data: restaurants, error } = await useFetch(
  `${API_URL}/restaurants?populate=*`
);
const { data: homepage, error2} = await useFetch(
  `${API_URL}/homepage?populate=*`
);


</script>
