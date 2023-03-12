import { Country } from './../../types/country';
import type { InjectionKey } from 'vue'

import type { QueryClient } from '@tanstack/vue-query'

import type { CountryBasic } from '../../types/country'

export const VUE_QUERY_STATE: InjectionKey<QueryClient | undefined> = Symbol('VUE_QUERY_STATE')


export async function getCountry(id: string) {
  const country: Country = await fetch(`http://localhost:3000/api/countries/${id}`)
    .then(res => res.json())

  return country
}

export async function getCountries() {
  const countries: CountryBasic[] = await fetch(`http://localhost:3000/api/countries/`)
    .then(res => res.json())

  return countries
}