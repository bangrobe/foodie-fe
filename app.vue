<template>
  <NuxtLayout>
    <Transition name="page" mode="out-in">
      <div :key="$route.fullPath">
        <NuxtPage />
      </div>
    </Transition>
    <Notification />
  </NuxtLayout>
</template>
<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - DigiFoodie` : "DigiFoodie";
  },
});

const { authenticated, user, setAuthenticated } = useAuth();
// onBeforeMount( ()=>{
//   if(user) setAuthenticated();
//   // if(user) setAuthenticated();
// })
</script>
<style>
.page-enter-active {
  transition: all 0.1s ease-out;
}
.page-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.page-enter-from,
.page-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.layout-enter-active {
  transition: all 0.1s ease-out;
}
.layout-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.layout-enter-from,
.layout-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
