<template>
  <v-list lines="two" selectable>
    <v-list-item v-for="post in posts"
    :key="post.id"
    :title="post.title"
    :subtitle="post.subtitle">
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import {usePostsStore} from '@/stores/posts/posts'

const postsStore = usePostsStore()
const {posts} = storeToRefs(postsStore)
const {initPosts} = postsStore

onMounted(async () => {
  initPosts()
})
</script>

<style scoped>

</style>
