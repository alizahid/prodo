import { SnippetsModel, snippets } from './snippets'
import { StateModel, state } from './state'

export interface StoreModel {
  snippets: SnippetsModel
  state: StateModel
}

const storeModel: StoreModel = {
  snippets,
  state
}

export default storeModel
