<template>
  <div v-if="isLoading">Loading</div>
  <div v-else-if="country">
    <h1>{{ country.name.common }}</h1>
    <p>This data is preloaded from index: </p>
    <ul>
      <li>Capital: {{ country.capital[0] }}</li>
      <li>Region: {{ country.region }}</li>
    </ul>
    <p>This data must be fetched after page loads: </p>
    <p v-if="country.population">Population: {{ country.population }}</p>
    <p v-if="country.tld">TLD: {{ country.tld[0] }}</p>
  </div>
</template>

<script lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { getCountry } from './countryData';
import { CountryBasic, CountryOptional } from '../../types/country';
import { usePageContext } from '../../renderer/usePageContext';

export default {
  setup () {
    const queryClient = useQueryClient()
    const pageContext = usePageContext()

    const { countryId } = pageContext.routeParams!
    
    const { data: country, isLoading } = useQuery<CountryOptional>(['characters', countryId],
        () => getCountry(pageContext.routeParams!.countryId),
        {
          initialData: () => {
            return (queryClient.getQueryData(['countries']) as CountryBasic[])
              ?.find(c => c.ccn3 === countryId)
          }
        }
      )

    return {
      isLoading,
      country
    }
  }
}
</script>