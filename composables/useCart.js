import { notify } from "notiwind";
const useCart = () => {
  const cartCookie = useCookie("nuxt_cart");
  const { user } = useAuth();
  const router = useRouter();
  const cart = useState("cart", () => {
    if (cartCookie.value) {
      return cartCookie.value;
    } else {
      return [];
    }
  });
  const addToCart = (item) => {
    if (!user.value) {
      router.push("/auth/login");
    } else {
      const record = cart.value.find((i) => i.id === item.id);

      if (!record) {
        cart.value.push({
          quantity: 1,
          ...item,
        });
      } else {
        record.quantity++;
      }
      notify(
        {
          group: "generic",
          title: "Add to cart",
          text: `One ${item.name} added to cart`,
        },
        3000
      ); //
      cartCookie.value = cart.value;
    }
  };

  const removeFromCart = (item) => {
    const record = cart.value.find((i) => i.id === item.id);
    if (record.quantity > 1) {
      record.quantity--;
    } else {
      let index = cart.value.findIndex((i) => i.id === item.id);
      cart.value.splice(index, 1);
    }
    cartCookie.value = cart.value;
  };

  const clearCart = () => {
    cart.value = [];
    cartCookie.value = null;
  };

  const numberOfItems = () => {
    if (cart.value) {
      return cart.value.reduce((acc, item) => acc + item.quantity, 0);
    } else {
      return 0;
    }
  };

  const priceTotal = () => {
    let rawPrice =  cart.value.reduce((acc, item)=> acc + item.price * item.quantity, 0)
    return (Math.round(rawPrice * 100) / 100).toFixed(2);
  }
  return {
    cart,
    addToCart,
    numberOfItems,
    clearCart,
    removeFromCart,
    priceTotal
  };
};

export default useCart;
