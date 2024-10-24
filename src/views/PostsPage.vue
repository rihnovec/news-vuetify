<template>
  <v-app-bar title="Posts App">
    <v-text-field label="Найти пост"
      variant="outlined"
      v-model="searchQuery"
      class="mr-6"
      clearable
      hide-details
      @click:clear="resetQuery"></v-text-field>
  </v-app-bar>
  <v-list lines="two" selectable>
    <v-list-item v-for="post in postsList"
    :key="post.id"
    :title="post.title"
    :subtitle="post.subtitle">
      <template v-slot:append>
        <v-btn icon="mdi-delete" variant="text" @click="removeById(post.id)"></v-btn>
      </template>
    </v-list-item>
  </v-list>
  <v-sheet width="100%" class="pt-2 pb-2 d-flex justify-center">
    <v-btn>Добавить пост</v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import {onMounted, ref, computed} from 'vue'
import type {Ref} from 'vue'
import {storeToRefs} from 'pinia'
import {usePostsStore} from '@/stores/posts/posts'

import { TypeStoragePosts } from '@/typings/types/TypeStoragePosts'

const postsStore = usePostsStore()
const {posts} = storeToRefs(postsStore)
const {initPosts, removeById} = postsStore
const searchQuery: Ref<string> = ref('')

const postsList: TypeStoragePosts = computed(() => {
  return searchQuery.value.length > 0
    ? posts.value?.filter(post => post.title.includes(searchQuery.value))
    : posts.value
})

function resetQuery(): void {
  searchQuery.value = ''
}

onMounted(async () => {
  initPosts()
})
</script>

<style scoped>

</style>
