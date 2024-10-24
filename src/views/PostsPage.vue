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
  <v-list lines="two" selectable v-if="posts.length > 0">
    <v-list-item v-for="post in postsList"
    :key="post.id"
    :title="post.title"
    :subtitle="post.subtitle">
      <template v-slot:append>
        <v-btn icon="mdi-pencil" variant="text" @click="editById(post.id)"></v-btn>
        <v-btn icon="mdi-delete" variant="text" @click="removeById(post.id)"></v-btn>
      </template>
    </v-list-item>
  </v-list>
  <v-alert type="info" variant="tonal" title="Постов пока нет" v-else></v-alert>
  <v-alert type="warning" variant="outlined" title="По вашему запросу постов нет"
    v-if="posts.length > 0 && postsList.length === 0"></v-alert>
  <v-sheet width="100%" class="py-2 d-flex justify-center">
    <v-btn append-icon="mdi-plus" color="info" size="large"
    @click="$router.push({name: AppRouteNames.CREATE_POST})">Добавить пост</v-btn>
  </v-sheet>
  <v-dialog v-model="isEditMode" max-width="600px">
    <v-confirm-edit @save="isEditMode = false" @cancel="isEditMode = false">
      <template v-slot:default>
        <v-card title="Редактирование поста" class="pa-2">
          <template v-slot:text>
            <v-text-field
              v-model="posts[0].title"
            ></v-text-field>
            <v-textarea
              v-model="posts[0].subtitle"
            ></v-textarea>
          </template>
        </v-card>
      </template>
    </v-confirm-edit>
  </v-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, computed} from 'vue'
import type {Ref} from 'vue'
import {storeToRefs} from 'pinia'
import {usePostsStore} from '@/stores/posts/posts'

import {AppRouteNames} from '@/typings/enums/AppRouteNames'
import { IPost } from '@/typings/interfaces/IPost'

const postsStore = usePostsStore()
const {posts, isEditMode} = storeToRefs(postsStore)
const {initPosts, removeById, editById} = postsStore
const searchQuery: Ref<string> = ref('')

const postsList: Ref<IPost[]> = computed(() => {
  return searchQuery.value.length > 0
    ? posts.value?.filter(post => {
      const titleToSearch = post.title.toLowerCase()
      const subtitleToSearch = post.subtitle.toLowerCase()
      const query = searchQuery.value.toLowerCase()

      return titleToSearch.includes(query) || subtitleToSearch.includes(query)
    })
    : posts.value
})

function resetQuery(): void {
  searchQuery.value = ''
}

onMounted(async () => {
  initPosts()
})
</script>
