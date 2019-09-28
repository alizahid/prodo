import { Action, Thunk, action, thunk } from 'easy-peasy'
import { firestore } from 'firebase/app'

import { StoreModel } from '.'

export interface Snippet {
  id: string
  content: string
  title: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface SnippetsModel {
  loading: boolean

  snippets: Snippet[]

  setLoading: Action<SnippetsModel, boolean>

  fetch: Thunk<SnippetsModel, any, any, StoreModel>
  setData: Action<SnippetsModel, Snippet[]>
}

export const snippets: SnippetsModel = {
  loading: true,

  snippets: [],

  setLoading: action((state, loading) => {
    state.loading = loading
  }),

  fetch: thunk(async (actions, payload, { getStoreState }) => {
    actions.setLoading(true)

    const {
      state: { user }
    } = getStoreState()

    if (user) {
      firestore()
        .collection('snippets')
        .where('uid', '==', user.uid)
        .orderBy('updatedAt', 'desc')
        .onSnapshot(({ docs }) => {
          const data: Snippet[] = docs.map(doc => {
            const { id } = doc

            const { content, createdAt, tags, title, updatedAt } = doc.data()

            return {
              id,
              content,
              tags,
              title,
              createdAt: createdAt.toDate(),
              updatedAt: updatedAt.toDate()
            }
          })

          actions.setData(data)
        })
    }
  }),
  setData: action((state, snippets) => {
    state.loading = false
    state.snippets = snippets
  })
}
