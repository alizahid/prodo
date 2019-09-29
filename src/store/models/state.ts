import { Action, Thunk, action, thunk } from 'easy-peasy'
import { auth } from 'firebase/app'

import { errorDialog } from '../../lib/electron'
import { StoreModel } from '.'

export interface StateModel {
  loading: boolean
  loggingOut: boolean
  snippetId: string | null
  sideBarOpen: boolean

  user: firebase.User | null

  init: Thunk<StateModel>

  setLoading: Action<StateModel, boolean>
  setLoggingOut: Action<StateModel, boolean>
  setSnippetId: Action<StateModel, string | null>
  toggleSideBar: Action<StateModel, boolean>

  setUser: Action<StateModel, firebase.User | null>

  link: Thunk<
    StateModel,
    {
      email: string
      password: string
    }
  >
  login: Thunk<
    StateModel,
    {
      email: string
      password: string
    }
  >
  logout: Thunk<StateModel, boolean, any, StoreModel>
  register: Thunk<
    StateModel,
    {
      email: string
      password: string
    }
  >
  loginAnonymously: Thunk<StateModel>
}

export const state: StateModel = {
  loading: false,
  loggingOut: false,
  snippetId: localStorage.getItem('snippetId'),
  sideBarOpen:
    localStorage.getItem('sideBarOpen') === null
      ? false
      : !!localStorage.getItem('sideBarOpen'),

  user: null,

  init: thunk(async actions => {
    auth().onAuthStateChanged(user => {
      actions.setUser(user)
    })
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),
  setLoggingOut: action((state, loggingOut) => {
    state.loggingOut = loggingOut
  }),
  setSnippetId: action((state, id) => {
    state.snippetId = id

    if (id) {
      localStorage.setItem('snippetId', id)
    } else {
      localStorage.removeItem('snippetId')
    }
  }),
  toggleSideBar: action((state, toggle) => {
    state.sideBarOpen = toggle

    localStorage.setItem('sideBarOpen', toggle ? 'yes' : '')
  }),

  setUser: action((state, user) => {
    state.user = user
  }),

  link: thunk(async (actions, { email, password }) => {
    const user = auth().currentUser

    if (user) {
      actions.setLoading(true)

      try {
        const credential = auth.EmailAuthProvider.credential(email, password)

        await user.linkWithCredential(credential)
      } catch (error) {
        const { message } = error

        errorDialog(message)
      } finally {
        actions.setLoading(false)
      }
    }
  }),
  logout: thunk(
    async (actions, deleteAccount, { getStoreActions, getStoreState }) => {
      actions.setLoggingOut(true)

      const {
        snippets: { unsubscribe },
        state: { user }
      } = getStoreState()

      const {
        snippets: { setData, setUnsubscribe },
        state: { setSnippetId }
      } = getStoreActions()

      if (unsubscribe) {
        unsubscribe()

        setUnsubscribe(undefined)
      }

      setData([])
      setSnippetId(null)

      if (deleteAccount && user) {
        await user.delete()
      } else {
        await auth().signOut()
      }

      actions.setLoggingOut(false)
    }
  ),
  login: thunk(async (actions, { email, password }) => {
    actions.setLoading(true)

    try {
      await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      const { message } = error

      errorDialog(message)
    } finally {
      actions.setLoading(false)
    }
  }),
  register: thunk(async (actions, { email, password }) => {
    actions.setLoading(true)

    try {
      await auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
      const { message } = error

      errorDialog(message)
    } finally {
      actions.setLoading(false)
    }
  }),
  loginAnonymously: thunk(async actions => {
    actions.setLoading(true)

    await auth().signInAnonymously()

    actions.setLoading(false)
  })
}
