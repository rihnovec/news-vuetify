import { TypeInputRule } from '@/typings/types/TypeInputRule'
import { ref } from 'vue'
import type { Ref } from 'vue'

export const useNewPostFields = () => {
  const postTitle: Ref<string> = ref('')
  const postSubtitle: Ref<string> = ref('')

  const postTitleRules: TypeInputRule[] = [
    value => value.length > 0
  ]

  const postSubtitleRules: TypeInputRule[] = [
    value => value.length > 0
  ]

  return {
    postTitle,
    postTitleRules,
    postSubtitle,
    postSubtitleRules
  }
}
