export const useApi = () => {
    const config = useRuntimeConfig();
    return config.public.BASE_API_URL;
}
