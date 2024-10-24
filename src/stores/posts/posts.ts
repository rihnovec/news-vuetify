import {defineStore} from 'pinia'
import {useLocalStorage} from '@vueuse/core'

import {IPostsState} from '@/typings/interfaces/IPostsState'
import { IPost } from '@/typings/interfaces/IPost'

export const usePostsStore = defineStore('postsStore', {
  state: (): IPostsState => {
    return {
      posts: useLocalStorage('posts', undefined),
      counter: 0
    }
  },
  actions: {
    async initPosts(): Promise<void> {
      await this.fetchPosts()

      this.counter = Math.max(...this.posts?.map(post => post.id)) + 1
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
    },

    add(post: Omit<IPost, 'id'>): void {
      this.posts?.push({
        id: this.counter++,
        ...post
      })
    }
  }
})
