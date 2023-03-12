// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562

import express from 'express'
import compression from 'compression'
import { renderPage } from 'vite-plugin-ssr'
import { root } from './root.js'
import { Country, CountryBasic } from '../types/country.js'
const isProduction = process.env.NODE_ENV === 'production'

startServer()



async function startServer() {
  const app = express()

  app.use(compression())
  
  app.get('/api/countries', async (req, res) => {

    const countries: Country[] = await fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
    const cSlice: CountryBasic[] = countries.slice(0, 10).map(({ name, ccn3, capital, region, subregion, languages }) => ({ name, ccn3, capital, region, subregion, languages })) 
    res.json(cSlice)
  })


  app.get('/api/countries/:id', async (req, res) => {
    const { id } = req.params

    const country:Country[] = await fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then(res => res.json())
    return res.json(country[0])
  })

  if (isProduction) {
    const sirv = (await import('sirv')).default
    app.use(sirv(`${root}/dist/client`))
  } else {
    const vite = await import('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    const { body, statusCode, contentType, earlyHints } = httpResponse
    if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) })
    res.status(statusCode).type(contentType).send(body)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
