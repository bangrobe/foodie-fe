// const config = useRuntimeConfig();
export function getStrapiUrl(path = "") {
  return `https://foodieapi.bangdigital.xyz${path}`;
}

export default function getStrapiMedia(media) {
  const { url } = media.data.attributes;
  const image = url.startsWith("/") ? getStrapiUrl(url) : url;
  return image;
}
