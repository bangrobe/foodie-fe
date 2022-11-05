<template>
  <header
    class="fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
    :class="changeHeader ? 'bg-white' : 'bg-transparent'"
  >
    <nav class="flex items-center max-w-screen-xl mx-auto px-4 py-4">
      <div class="flex flex-grow">
        <nuxt-link to="/">
          <h1 class="flex items-center btn text-white btn-primary">
            <FireIcon class="text-white mr-1 w-[24px]" />
            DigiFoodie
          </h1>
        </nuxt-link>
      </div>
      <!-- Hướng dẫn sau -->
      <div
        v-if="user?.email"
        class="flex items-center justify-end space-x-4 mr-2"
      >
        <button @click="handleSignout" class="bg-orange-600 btn">
          Sign Out
        </button>
        <div class="dropdown dropdown-end">
          <div class="indicator">
            <span class="indicator-item badge badge-secondary">{{
              numberOfItems()
            }}</span>
            <button
              tabindex="0"
              class="btn gap-2 btn-outline text-white bg-orange-500"
            >
              Cart
              <CartIcon class="text-white w-[24px]" />
            </button>
            <div
              v-if="cart.length > 0"
              tabindex="0"
              class="menu dropdown-content p-2 shadow bg-base-100 rounded-box mt-14"
            >
              <CartItem
                v-for="item in cart"
                :key="item.id"
                :item="item"
                class="flex items-center"
              />
              <NuxtLink
                to="/checkout"
                class="btn btn-primary text-white w-full text-center"
                >Check out
                <span class="font-bold ml-2">
                  ${{ cartTotalPrice }}</span
                ></NuxtLink
              >
            </div>
            <div
              v-else
              class="menu dropdown-content p-2 shadow bg-base-100 rounded-box mt-14 w-64"
            >
              <p class="text-center">Your cart is empty!</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Hướng dẫn trước -->
      <div v-else class="flex items-center justify-end">
        <nuxt-link
          to="/auth/login"
          class="border-orange-600 px-6 py-2 btn mr-1"
        >
          Sign In
        </nuxt-link>
        <nuxt-link
          to="/auth/register"
          class="bg-orange-600 border-white px-6 text-white py-2 btn mr-1"
        >
          Sign Up
        </nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import CartIcon from './icons/CartIcon.vue';
import FireIcon from './icons/FireIcon.vue';
const user = useCookie("nuxt_user");
const { signOut } = useAuth();
const { numberOfItems, clearCart, cart, priceTotal } = useCart();

const changeHeader = ref(false);

//Nuxt way, neu khong them process.client sẽ có lỗi
if (process.client) {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      changeHeader.value = true;
    } else {
      changeHeader.value = false;
    }
  });
}

const cartTotalPrice = computed(() => {
  return priceTotal();
});
const handleSignout = () => {
  signOut();
  clearCart();
};
</script>
