import { Action, Thunk, action, thunk } from 'easy-peasy'
import { auth } from 'firebase/app'
import nanoid from 'nanoid'

import { alertDialog, errorDialog } from '../../lib/electron'
import storage from '../../lib/storage'
import { StoreModel } from '.'

export interface StateModel {
  key: string

  loading: boolean
  loggingOut: boolean
  updatingPassword: boolean

  sideBarOpen: boolean
  snippetId: string | null

  user: firebase.User | null

  init: Thunk<StateModel, any, any, StoreModel>

  setKey: Action<StateModel, string>
  setLoading: Action<StateModel, boolean>
  setLoggingOut: Action<StateModel, boolean>
  setSnippetId: Action<StateModel, string | null>
  setUpdatingPassword: Action<StateModel, boolean>
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
      key: string
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
  updatePassword: Thunk<
    StateModel,
    {
      currentPassword: string
      newPassword: string
    },
    any,
    StoreModel
  >
  resetPassword: Thunk<StateModel, string>
}

export const state: StateModel = {
  key: storage.get('key', ''),

  loading: false,
  loggingOut: false,
  updatingPassword: false,

  snippetId: storage.get('snippetId', null),
  sideBarOpen: storage.get('sideBarOpen', false),

  user: null,

  init: thunk(async (actions, params, { getState }) => {
    const { key } = getState()

    if (key) {
      storage.set('key', key)
    }

    auth().onAuthStateChanged(user => {
      actions.setUser(user)
    })
  }),

  setKey: action((state, key) => {
    storage.set('key', key)

    state.key = key
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),
  setLoggingOut: action((state, loggingOut) => {
    state.loggingOut = loggingOut
  }),
  setUpdatingPassword: action((state, updatingPassword) => {
    state.updatingPassword = updatingPassword
  }),

  setSnippetId: action((state, id) => {
    state.snippetId = id

    if (id) {
      storage.set('snippetId', id)
    } else {
      storage.remove('snippetId')
    }
  }),
  toggleSideBar: action((state, toggle) => {
    state.sideBarOpen = toggle

    storage.set('sideBarOpen', toggle)
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

      storage.clear()

      actions.setLoggingOut(false)
    }
  ),
  login: thunk(async (actions, { email, password, key }) => {
    actions.setLoading(true)

    try {
      await auth().signInWithEmailAndPassword(email, password)

      actions.setKey(key)
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

      actions.setKey(nanoid())
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

    actions.setKey(nanoid())

    actions.setLoading(false)
  }),
  updatePassword: thunk(
    async (actions, { currentPassword, newPassword }, { getState }) => {
      const { user } = getState()

      if (user && user.email) {
        actions.setUpdatingPassword(true)

        try {
          const credential = auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
          )

          await user.reauthenticateWithCredential(credential)
          await user.updatePassword(newPassword)

          alertDialog('Password updated.')
        } catch (error) {
          const { message } = error

          errorDialog(message)
        } finally {
          actions.setUpdatingPassword(false)
        }
      }
    }
  ),
  resetPassword: thunk(async (actions, email) => {
    actions.setLoading(true)

    try {
      await auth().sendPasswordResetEmail(email)

      alertDialog('Email sent.')
    } catch (error) {
      const { message } = error

      errorDialog(message)
    } finally {
      actions.setLoading(false)
    }
  })
}
