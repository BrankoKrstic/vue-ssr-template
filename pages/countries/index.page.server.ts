import { getCountries } from "./countryData";

export async function onBeforeRender () {
  const initialData = await getCountries()

  return {
    pageContext: {
      pageProps: {
        initialData
      }
    }
  }
}