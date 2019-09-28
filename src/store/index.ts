import { createStore, createTypedHooks } from 'easy-peasy'

import model, { StoreModel } from './models'

const { useStoreActions, useStoreDispatch, useStoreState } = createTypedHooks<
  StoreModel
>()

export { useStoreActions, useStoreDispatch, useStoreState }

export default () => createStore(model)
