import {IPostsState} from '@/typings/interfaces/IPostsState'
import {IPost} from '@/typings/interfaces/IPost'

import {defineStore} from 'pinia'

export const usePostsStore = defineStore('postsStore', {
  state: (): IPostsState => {
    return {
      posts: [] as IPost[]
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
    }
  }
})
