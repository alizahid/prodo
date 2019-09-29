import { Action, Thunk, action, thunk } from 'easy-peasy'
import { firestore } from 'firebase/app'

import { StoreModel } from '.'

export interface Snippet {
  id: string
  content: string
  tags: string[]
  title: string
  createdAt: Date
  updatedAt: Date
}

export interface SnippetsModel {
  loading: boolean

  removing: boolean
  saving: boolean

  snippets: Snippet[]

  unsubscribe?: any
  setUnsubscribe: Action<SnippetsModel, () => void>

  setLoading: Action<SnippetsModel, boolean>

  setRemoving: Action<SnippetsModel, boolean>
  setSaving: Action<SnippetsModel, boolean>

  fetch: Thunk<SnippetsModel, any, any, StoreModel>
  create: Thunk<
    SnippetsModel,
    {
      content: string
      tags: string[]
      title: string
    },
    any,
    StoreModel
  >
  remove: Thunk<SnippetsModel, string, any, StoreModel>
  update: Thunk<
    SnippetsModel,
    {
      id: string
      data: {
        content: string
        tags: string[]
        title: string
      }
    },
    any,
    StoreModel
  >

  setData: Action<SnippetsModel, Snippet[]>
}

export const snippets: SnippetsModel = {
  loading: true,

  removing: false,
  saving: false,

  snippets: [],

  setUnsubscribe: action((state, unsubscribe) => {
    state.unsubscribe = unsubscribe
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),

  setRemoving: action((state, removing) => {
    state.removing = removing
  }),
  setSaving: action((state, saving) => {
    state.saving = saving
  }),

  fetch: thunk(async (actions, payload, { getStoreState }) => {
    const {
      state: { user }
    } = getStoreState()

    if (user) {
      actions.setLoading(true)

      const unsubscribe = firestore()
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

      actions.setUnsubscribe(unsubscribe)
    }
  }),
  create: thunk(async (actions, payload, { getStoreState }) => {
    const {
      state: { user }
    } = getStoreState()

    if (user) {
      actions.setSaving(true)

      try {
        const snippet = await firestore()
          .collection('snippets')
          .add({
            ...payload,
            createdAt: new Date(),
            updatedAt: new Date(),
            uid: user.uid
          })

        return snippet.id
      } catch (error) {
      } finally {
        actions.setSaving(false)
      }
    }
  }),
  remove: thunk(async (actions, id, { getStoreState }) => {
    const {
      state: { user }
    } = getStoreState()

    if (user) {
      actions.setRemoving(true)

      try {
        await firestore()
          .collection('snippets')
          .doc(id)
          .delete()
      } catch (error) {
      } finally {
        actions.setRemoving(false)
      }
    }
  }),
  update: thunk(async (actions, { id, data }, { getStoreState }) => {
    const {
      state: { user }
    } = getStoreState()

    if (user) {
      actions.setSaving(true)

      try {
        await firestore()
          .collection('snippets')
          .doc(id)
          .update({
            ...data,
            updatedAt: new Date()
          })
      } catch (error) {
      } finally {
        actions.setSaving(false)
      }
    }
  }),

  setData: action((state, snippets) => {
    state.loading = false
    state.snippets = snippets
  })
}
