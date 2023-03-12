import { VUE_QUERY_STATE } from './../pages/countries/countryData';
import { createApp } from './app'
import type { PageContextClient } from './types'

export { render }

export const clientRouting = true


export const prefetchStaticAssets = { when: 'VIEWPORT' }

let app: ReturnType<typeof createApp>

async function render(pageContext: PageContextClient) {
  if (!app) {
    app = createApp(pageContext)
    app.provide(VUE_QUERY_STATE, pageContext.pageProps?.vueQueryState)

    app.mount('#app')
  } else {
    app.changePage(pageContext)
  }

}



