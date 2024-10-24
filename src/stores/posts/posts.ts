import {defineStore} from 'pinia'
import {useLocalStorage} from '@vueuse/core'

import {IPostsState} from '@/typings/interfaces/IPostsState'

export const usePostsStore = defineStore('postsStore', {
  state: (): IPostsState => {
    return {
      posts: useLocalStorage('posts', undefined)
    }
  },
  actions: {
    async initPosts(): Promise<void> {
      this.fetchPosts()
    },

    async fetchPosts(): Promise<void> {
      const response: Response = await fetch('./src/db/posts.json')

      if (response.ok) {
        this.posts = await response.json()
      }
    },

    removeById(postId: number): boolean {
      if (this.posts?.find(post => post.id === postId)) {
        this.posts = this.posts.filter(post => post.id !== postId)
        return true
      } else {
        return false
      }
    }
  }
})
