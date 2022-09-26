<template>
  <div>
    <div class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-3xl text-gray-900 my-4">Login Page</h1>
      <AuthenticatedNotice v-if="authenticated">
        <p>
          You already logged in, please logout first if you want to switch
          account
        </p>
      </AuthenticatedNotice>
      <form class="bg-white w-96 mt-6 p-5 rounded-lg shadow-lg" v-else>
        <input
          type="email"
          placeholder="Email"
          class="input input-bordered input-primary w-full mb-4"
          v-model="email"
        />
        <input
          type="password"
          placeholder="Password"
          class="input input-bordered input-primary w-full mb-4"
          v-model="password"
        />

        <div class="text-center">
          <button
            class="btn btn-primary w-full"
            type="submit"
            @click.prevent="submitForm"
            :class="isLoading ? 'loading' : ''"
          >
            Submit
          </button>

          <p class="text-red-500 mt-2">
            Not have an account yet?
            <NuxtLink class="font-bold" to="/auth/register"
              >Register now!</NuxtLink
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { notify } from "notiwind";
useHead({
  title: computed(() => `Login`),
});
const email = ref("");
const password = ref("");
const errorAuth = ref([]);
const { signIn, user, authenticated } = useAuth();
const isLoading = ref(false);
const router = useRouter();
const submitForm = async () => {
  errorAuth.value = [];
  isLoading.value = true;

  if (!email.value) errorAuth.value.push("Email must be not empty!");
  if (!password.value) errorAuth.value.push("Password must be not empty!");
  if (errorAuth.value.length > 0) {
    errorAuth.value.forEach((error) => {
      notify(
        {
          group: "error",
          title: "Error",
          text: error,
        },
        4000
      ); // 4s
    });
    isLoading.value = false;
    return;
  }
  try {
    await signIn({ email: email.value, password: password.value });
    isLoading.value = false;
    router.push("/");
  } catch (error) {
    errorAuth.value = error.message;
    isLoading.value = false;
    notify(
      {
        group: "error",
        title: "Error",
        text: errorAuth.value,
      },
      4000
    ); // 4s
  }
};
</script>
