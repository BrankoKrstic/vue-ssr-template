<template>
  <div>
    <h1>Countries</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error</div>
    <div v-else>
      <ul>
        <li v-for="country in countries">
          <a :href="`/countries/${country.ccn3}`">{{ country.name.common }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { CountryBasic } from '../../types/country';
import { getCountries } from './countryData';

const props = defineProps<{
  initialData: CountryBasic[]
}>()

const {
  data: countries,
  isLoading,
  error
} = useQuery(['countries'], () => getCountries(),{
  initialData: props.initialData
})

console.log(countries)
</script>