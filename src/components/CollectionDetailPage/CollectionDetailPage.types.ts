import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Authorization } from 'telestoworld-dapps/dist/modules/authorization/types'
import { Wallet } from 'telestoworld-dapps/dist/modules/wallet/types'
import { deleteCollectionRequest, DeleteCollectionRequestAction } from 'modules/collection/actions'
import { openModal, OpenModalAction } from 'modules/modal/actions'
import { Collection } from 'modules/collection/types'
import { Item } from 'modules/item/types'

export type Props = {
  wallet: Wallet
  collection: Collection | null
  items: Item[]
  authorizations: Authorization[]
  isOnSaleLoading: boolean
  isLoading: boolean
  onNavigate: (path: string) => void
  onOpenModal: typeof openModal
  onDelete: typeof deleteCollectionRequest
}

export type State = {
  isAuthorizationModalOpen: boolean
}

export type MapStateProps = Pick<Props, 'wallet' | 'collection' | 'items' | 'authorizations' | 'isOnSaleLoading' | 'isLoading'>
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onOpenModal' | 'onDelete'>
export type MapDispatch = Dispatch<CallHistoryMethodAction | OpenModalAction | DeleteCollectionRequestAction>
