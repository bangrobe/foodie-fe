<template>
    <NotFoundError v-if="error.statusCode === '404'">
      <template #errorCode>404</template>
      <template #errorContent>Page Not Found</template>
      <template #errorDescription>We can't find the page you're looking for!</template>
    </NotFoundError>
    <NotFoundError v-else>
      <template #errorContent>There is something wrong, please try again.</template>
    </NotFoundError>
    
  </template>
  
  <script setup>
  const props = defineProps({
    error: Object
  })
  console.log(props.error)
  // const handleError = () => clearError({ redirect: '/auth/login' })
  </script>