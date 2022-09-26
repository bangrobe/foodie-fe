<template>
  <div>
    <div class="md:h-32 h-24"></div>

    <h1 class="text-4xl text-semibold">Checkout</h1>
    <div class="divider"></div>

    <div class="flex flex-col w-full px-0 mx-auto md:flex-row">
      <div class="flex flex-col md:w-full order-last lg:w-3/5 md:order-first">
        <h2 class="mb-4 font-bold md:text-xl text-heading">Shipping Address</h2>
        <form class="justify-center w-full mx-auto" method="post" action>
          <div class="">
            <div class="mt-4">
              <div class="w-full">
                <label
                  for="Phone"
                  class="block mb-3 text-sm font-semibold text-gray-500"
                  >Phone</label
                >
                <input
                  name="Phone"
                  type="text"
                  v-model="phone"
                  placeholder="Phone Number"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div class="mt-4">
              <div class="w-full">
                <label
                  for="Address"
                  class="block mb-3 text-sm font-semibold text-gray-500"
                  >Address</label
                >
                <textarea
                  class="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                  name="Address"
                  cols="20"
                  rows="4"
                  placeholder="Address"
                  v-model="address"
                ></textarea>
              </div>
            </div>

            <div class="relative pt-3 xl:pt-6">
              <ClientOnly>
                <StripeElements
                  v-if="stripeLoaded"
                  v-slot="{ elements, instance }"
                  ref="elms"
                  :stripe-key="stripeKey"
                  :instance-options="instanceOptions"
                  :elements-options="elementsOptions"
                >
                  <StripeElement
                    ref="card"
                    :elements="elements"
                    :options="cardOptions"
                  />
                </StripeElements>
              </ClientOnly>
            </div>
            <div class="mt-4">
              <button
                class="btn btn-block btn-primary hover:bg-blue-900"
                :class="isLoading ? 'loading' : ''"
                @click.prevent="payProcess"
              >
                Process
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5 order-first md:order-last">
        <CheckoutCart />
      </div>
      <div class="divider"></div>
    </div>
  </div>
</template>
<script setup>
import { notify } from "notiwind";
import { StripeElements, StripeElement } from "vue-stripe-js";
definePageMeta({
  middleware: ["auth"],
});

const { cart, priceTotal, clearCart } = useCart();
const { user } = useAuth();

const router = useRouter();
const API_URL = useApi();

const stripeKey = ref("pk_test_TYooMQauvdEDq54NiTphI7jx"); // test key
const instanceOptions = ref({
  // https://stripe.com/docs/js/initializing#init_stripe_js-options
});
const elementsOptions = ref({
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
});
const cardOptions = ref({
  // https://stripe.com/docs/stripe.js#element-options
  value: {
    postalCode: "12345",
  },
});
const stripeLoaded = ref(false);
const card = ref();
const elms = ref();

useHead({
   title: computed(()=> `Check Out`)
});
onBeforeMount(() => {
  let stripeScript = document.createElement("script");
  stripeScript.setAttribute("src", "https://js.stripe.com/v3/");
  document.head.appendChild(stripeScript);
  stripeScript.onload = () => {
    stripeLoaded.value = true;
  };
});

const phone = ref("");
const address = ref("");
const isLoading = ref(false)
const amount = computed(() => {
  return parseFloat(priceTotal());
});

const payProcess = async () => {
  isLoading.value = true;
  // Get stripe element
  // console.log(card.value)
  const cardElement = card.value.stripeElement;

  if(cart.value.length === 0) {
    notify(
      {
        group: "error",
        title: "Error",
        text: "Cart is empty. Please add products first.",
      },
      3000
    ); 
    isLoading.value = false;
    return;
  }

  //Check before process
  if(phone.value ==="" || address.value === "" || cardElement === "") {
    notify(
      {
        group: "error",
        title: "Error",
        text: "Please input information to checkout",
      },
      3000
    ); 
    isLoading.value = false;
    return;
  }
  // console.log(cardElement)
  // Access instance methods, e.g. createToken()
  try {
    let token = await elms.value.instance.createToken(cardElement);
    if(token.error) {
      notify(
      {
        group: "error",
        title: "Error",
        text: "Your card number is invalid",
      },
      3000
    ); 
    isLoading.value = false;
    return;
    }
    let data = {
      phone: phone.value,
      address: address.value,
      token,
      dishes: cart.value,
      user: user.value.username,
      amount: amount.value,
    };
    
    const response = await $fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.value.jwt}`,
      },
      body: data,
    });
    isLoading.value = false;
    router.push({
      name: "thankyou",
      params: {
        orderId: response.data.id,
      },
    });
    clearCart();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<script></script>
