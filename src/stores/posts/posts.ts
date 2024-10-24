import {defineStore} from 'pinia'
import {useLocalStorage} from '@vueuse/core'

import {IPostsState} from '@/typings/interfaces/IPostsState'
import { IPost } from '@/typings/interfaces/IPost'

export const usePostsStore = defineStore('postsStore', {
  state: (): IPostsState => {
    return {
      posts: [] as IPost[],
      postsJSON: useLocalStorage<string | undefined>('posts', undefined),
      counter: 0,
      isEditMode: false,
      editingPost: undefined
    }
  },
  actions: {
    async initPosts(): Promise<void> {
      if (this.postsJSON === undefined) {
        await this.fetchPosts()
      } else {
        this.getPostsByLocalStorage()
      }

      this.counter = Math.max(...this.posts?.map(post => post.id)) + 1
    },

    initCounterValue() {
      if (this.posts.length > 0) {
        this.counter = Math.max(...this.posts?.map(post => post.id)) + 1
      } else {
        this.counter = 1
      }
    },

    getPostsByLocalStorage(): void {
      this.posts = JSON.parse(this.postsJSON as string)
    },

    async fetchPosts(): Promise<void> {
      const response: Response = await fetch('./src/db/posts.json')

      if (response.ok) {
        this.posts = await response.json()
        this.updateJSONPosts()
      }
    },

    removeById(postId: number): boolean {
      if (this.posts?.find(post => post.id === postId)) {
        this.posts = this.posts.filter(post => post.id !== postId)

        this.updateJSONPosts()
        return true
      } else {
        return false
      }
    },

    editById(postId: number): boolean {
      const targetPost = this.posts?.find(post => post.id === postId)

      if (targetPost) {
        this.editingPost = targetPost
        this.isEditMode = true
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

      this.updateJSONPosts()
    },

    updateJSONPosts(): void {
      this.postsJSON = JSON.stringify(this.posts)
    }
  }
})
