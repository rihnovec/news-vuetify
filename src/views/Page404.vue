<template>
  <v-sheet class="d-flex align-center justify-center flex-column" width="100vw" height="100vh">
    Страницы с таким адресом не существует
    <v-btn class="mt-4"
      @click="$router.push({name: AppRouteNames.HOME})">Вернуться на главную</v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import { AppRouteNames } from '@/typings/enums/AppRouteNames'
</script>
