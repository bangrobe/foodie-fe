export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useCookie('nuxt_user');
    if (!user.value) {
      // useCookie("redirect", { path: "/" }).value = to.fullPath;
      return navigateTo("/auth/login");
    }
  });
  