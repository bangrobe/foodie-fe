const useAuth = () => {
  const userCookie = useCookie("nuxt_user");
  const API_URL = useApi();
  // const { clearCart } = useCart();
  const user = useState("user", () => {
    return userCookie.value ? userCookie.value : null;
  });
  const authenticated = useState("authenticated", () => false)
  const router = useRouter();
  /*** Không sử dụng trong tutorial này */
  /** 
  const getUser = async() => {
    const response = await $fetch("http://localhost:1337/api/users/me")
    if(response.data) {
      const { email, username } = response.user;
      userCookie = { email, username}
    } else {
      return 0;
    }
  }
  */
  
  const setAuthenticated = () => {
    // console.log("User in set authenticated", user)
    if(user.value) {
      authenticated.value = true;
    }
    return;
  }
  setAuthenticated();
  const signUp = async (data) => {
    const { username, email, password} = data;
    try {
      await $fetch(
        `${API_URL}/auth/local/register`,
        {
          method: "POST",
          body: {
            username,
            email,
            password,
          },
        }
      );
    } catch (error) {
      throw new Error(error.data.error.message);
    }
  };

  const signIn = async ( data ) => {
    //Sign in logic with strapi

    try {
      const { email: identifier, password } = data;
      const response = await $fetch(`${API_URL}/auth/local`, {
        method: "POST",
        body: {
          identifier,
          password,
        },
      });
      const { jwt } = response;
      const { email, username } = response.user;
      user.value = { email, username, jwt };
      userCookie.value = user.value;
      setAuthenticated();
    } catch (error) {
      //ohmyfetch quăng error ra cho vào error.data
      // console.log(error.data.error.message)
      throw new Error(error.data.error.message);
    }
  };

  const signOut = () => {
    userCookie.value = null;
    user.value = null;
    authenticated.value = false;
    // clearCart;
    router.push("/auth/login");
  };
  return {
    user,
    signUp,
    signIn,
    signOut,
    authenticated
  };
};

export default useAuth;
