import { Action, Thunk, action, thunk } from 'easy-peasy'
import { auth } from 'firebase/app'

export interface StateModel {
  snippetId?: string
  sideBarOpen: boolean

  user: firebase.User | null

  init: Thunk<StateModel>

  setSnippetId: Action<StateModel, string | undefined>
  toggleSideBar: Action<StateModel, boolean>

  setUser: Action<StateModel, firebase.User | null>

  login: Thunk<
    StateModel,
    {
      email: string
      password: string
    }
  >
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
  sideBarOpen: !!localStorage.getItem('sideBarOpen'),

  user: null,

  init: thunk(async actions => {
    auth().onAuthStateChanged(user => {
      actions.setUser(user)
    })
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

  login: thunk(async (actions, { email, password }) => {}),
  register: thunk(async (actions, { email, password }) => {}),
  loginAnonymously: thunk(async actions => {
    await auth().signInAnonymously()
  })
}
