import { QueryClient, dehydrate } from "@tanstack/vue-query";
import { PageContext } from "../../renderer/types";
import { getCountry } from "./countryData";

export async function onBeforeRender(pageContext: PageContext) {
  const countryId = pageContext.routeParams?.countryId!
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['countries', countryId], () => getCountry(countryId))
  const vueQueryState = dehydrate(queryClient)

  return {
    pageContext: {
      pageProps: {
        vueQueryState,
        countryId
      }
    }
  }
}