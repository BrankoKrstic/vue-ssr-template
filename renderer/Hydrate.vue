<template>
  <slot />
</template>

<script setup lang="ts">
import { hydrate } from '@tanstack/query-core';
import { useQueryClient } from '@tanstack/vue-query';
import { inject } from 'vue';
import { VUE_QUERY_STATE } from "../pages/countries/countryData"


  const vueQueryState = inject(VUE_QUERY_STATE)
  if (vueQueryState) {
    const queryClient = useQueryClient()
    hydrate(queryClient, vueQueryState)
  }
</script>