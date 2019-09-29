import { Action, Thunk, action, thunk } from 'easy-peasy'
import { auth } from 'firebase/app'

export interface StateModel {
  loading: boolean
  snippetId?: string
  sideBarOpen: boolean

  user: firebase.User | null

  init: Thunk<StateModel>

  setLoading: Action<StateModel, boolean>
  setSnippetId: Action<StateModel, string | undefined>
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
  logout: Thunk<StateModel>
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
  setSnippetId: action((state, id) => {
    state.snippetId = id
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

        window.alert(message)
      } finally {
        actions.setLoading(false)
      }
    }
  }),
  logout: thunk(async actions => {
    await auth().signOut()
  }),
  login: thunk(async (actions, { email, password }) => {
    actions.setLoading(true)

    try {
      await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      const { message } = error

      window.alert(message)
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

      window.alert(message)
    } finally {
      actions.setLoading(false)
    }
  }),
  loginAnonymously: thunk(async actions => {
    await auth().signInAnonymously()
  })
}
