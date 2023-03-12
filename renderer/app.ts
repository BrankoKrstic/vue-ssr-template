import { createSSRApp, defineComponent, h, markRaw, reactive } from 'vue'
import PageShell from './PageShell.vue'
import { setPageContext } from './usePageContext'
import type { PageContext } from './types'
import { VueQueryPlugin } from '@tanstack/vue-query'

export { createApp }

function createApp(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  let rootComponent: any
  const PageWithLayout = defineComponent({
    data: () => ({
      Page: markRaw(Page),
      pageProps: markRaw(pageProps || {})
    }),
    created () {
      rootComponent = this
    },
    render () {
      return h(
        PageShell,
        {},
        {
          default:() => {
            return h(this.Page, this.pageProps)
          }
        }
      )
    }
  })

  const app = createSSRApp(PageWithLayout)

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(pageContextReactive, pageContext)
      rootComponent.Page = markRaw(pageContext.Page)
      rootComponent.pageProps = markRaw(pageContext.pageProps || {})
    }
  })

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext)

  // Make `pageContext` accessible from any Vue component
  setPageContext(app, pageContextReactive as PageContext)

  app.use(VueQueryPlugin)

  return app
}

function objectAssign<Obj, ObjAddendum>(obj: Obj, objAddendum: ObjAddendum): asserts obj is Obj & ObjAddendum {
  // @ts-ignore
  Object.assign(obj, objAddendum)
}