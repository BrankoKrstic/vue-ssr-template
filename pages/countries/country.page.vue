<template>
  <div v-if="isLoading">Loading</div>
  <div v-else-if="country">
    <h1>{{ country.name.common }}</h1>
  </div>
</template>

<script lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { getCountry } from './countryData';
import { CountryBasic, CountryOptional } from '../../types/country';

export default {
  props: {
    countryId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const queryClient = useQueryClient()
    const { data: country, isLoading } = useQuery<CountryOptional>(['characters', props.countryId], () => getCountry(props.countryId), {
      initialData: () => {
        const data = (queryClient.getQueryData(['countries']) as CountryBasic[])?.find(c => c.ccn3 === props.countryId)
        console.log(data)
        return data
      }
    })
    console.log(country)
    return {
      isLoading,
      country
    }
  }
}
</script>