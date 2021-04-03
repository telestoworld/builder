import { Coord } from 'telestoworld-ui'
import { Transaction } from 'telestoworld-dapps/dist/modules/transaction/types'
import { Collection } from 'modules/collection/types'
import { Item } from 'modules/item/types'

export type Props = {
  selection?: Coord[]
  address?: string
  collection?: Collection
  item?: Item
  text: React.ReactNode
  tx: Transaction
}

export type MapStateProps = {}
export type MapDispatchProps = {}
