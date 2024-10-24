<template>
  <v-app-bar title="Posts App">
    <v-btn prepend-icon="mdi-arrow-left"
    @click="$router.push({name: AppRouteNames.HOME})">Назад</v-btn>
  </v-app-bar>
  <v-form class="pa-10" v-model="valid">
    <v-text-field
      v-model="postTitle"
      label="Название поста"
      variant="outlined"
      :rules="postTitleRules"
      ></v-text-field>
    <v-textarea
      v-model="postSubtitle"
      label="Описание поста"
      variant="outlined"
      :rules="postSubtitleRules"
      ></v-textarea>
    <v-btn color="info" size="large" @click="addPost" :disabled="!valid">
      Добавить
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts/posts'
import {AppRouteNames} from '@/typings/enums/AppRouteNames'
import { useRouter } from 'vue-router'
import {useNewPostFields} from '@/composables/newPostFields'

import { ref } from 'vue'
import type { Ref } from 'vue'

const valid: Ref<boolean> = ref(false)
const {
  postTitle,
  postTitleRules,
  postSubtitle,
  postSubtitleRules
} = useNewPostFields()

const {add} = usePostsStore()
const router = useRouter()

function addPost() {
  add({
    title: postTitle.value,
    subtitle: postSubtitle.value
  })

  router.push({name: AppRouteNames.HOME})
}
</script>
