<template>
  <h1>Welcome</h1>
  This page is:
  <ul>
    <li @click="toAbout">Rendered to HTML.</li>
    <li>Interactive. <Counter /></li>
  </ul>
</template>

<script lang="ts" setup>
import { navigate } from 'vite-plugin-ssr/client/router'
import Counter from './Counter.vue'

const toAbout = () => {
  navigate('/about')
}
</script>
