import {TypeStoragePosts} from '@/typings/types/TypeStoragePosts'
import { IPost } from './IPost'

export interface IPostsState {
  posts: IPost[],
  postsJSON: TypeStoragePosts,
  counter: number
}
