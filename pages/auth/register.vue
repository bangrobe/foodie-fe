<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-3xl text-gray-900">Register Page</h1>
    <form class="bg-white w-96 mt-6 p-5 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Username"
        class="input input-bordered input-primary w-full mb-4"
        v-model="username"
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        class="input input-bordered input-primary w-full mb-4"
        v-model="passwordConfirm"
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
          Already have an account?
          <NuxtLink class="font-bold" to="/auth/login">Login now!</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>
<script setup>
import { notify } from "notiwind";
useHead({
  title: computed(() => `Register`),
});
const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const errorAuth = ref([]);

const isLoading = ref(false);
const router = useRouter();

const { signUp } = useAuth();
const submitForm = async () => {
  errorAuth.value = [];
  isLoading.value = true;
  if (!username.value) errorAuth.value.push("Username must be not empty!");
  if (!email.value) errorAuth.value.push("Email must be not empty!");

  if (!password.value || !passwordConfirm.value)
    errorAuth.value.push("Password must be not empty!");
  if (password.value !== passwordConfirm.value)
    errorAuth.value.push("Confirm password is not match!");

  if (errorAuth.value.length > 0) {
    errorAuth.value.forEach((error) => {
      notify(
        {
          group: "error",
          title: "Error",
          text: error,
        },
        3000
      ); //
    });
    isLoading.value = false;
    return;
  }
  try {
    await signUp({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    isLoading.value = false;
    router.push("/auth/login");
  } catch (error) {
    errorAuth.value.push(error.message);
    isLoading.value = false;
    notify(
      {
        group: "error",
        title: "Error",
        text: errorAuth.value,
      },
      4000
    );
  }
};
</script>
