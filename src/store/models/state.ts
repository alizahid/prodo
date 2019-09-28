import { Action, Thunk, action, thunk } from 'easy-peasy'
import { auth } from 'firebase/app'

export interface StateModel {
  snippet?: string
  user: firebase.User | null

  init: Thunk<StateModel>

  setSnippet: Action<StateModel, string | undefined>
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
  user: null,

  init: thunk(async actions => {
    auth().onAuthStateChanged(user => {
      actions.setUser(user)
    })
  }),

  setSnippet: action((state, snippet) => {
    state.snippet = snippet
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