<template>
  <v-app>
    <v-main>

    </v-main>
  </v-app>
</template>

<script setup lang="ts">
async function getData() {
  const response: Response = await fetch('./src/db/posts.json')
  if (response.ok) {
    const posts = await response.json()
    debugger
  }
}

getData()
</script>
