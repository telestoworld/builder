import { createSelector } from 'reselect'
import { getData } from 'telestoworld-dapps/dist/modules/transaction/selectors'
import { isPending } from 'telestoworld-dapps/dist/modules/transaction/utils'
import { Transaction } from 'telestoworld-dapps/dist/modules/transaction/types'
import { getAddress } from 'telestoworld-dapps/dist/modules/wallet/selectors'
import { RootState } from 'modules/common/types'
import { isEqual } from 'lib/address'

export * from 'telestoworld-dapps/dist/modules/transaction/selectors'

export const getTransactionsByType = (state: RootState, address: string, type: string): Transaction[] =>
  getData(state).filter(tx => isEqual(tx.from, address) && tx.actionType === type)

export const getTransactions = createSelector<RootState, Transaction[], string | undefined, Transaction[]>(
  getData,
  getAddress,
  (transactions, address) => transactions.filter(transaction => !!address && isEqual(transaction.from, address))
)

export const getPendingTransactions = createSelector<RootState, Transaction[], Transaction[]>(getTransactions, transactions =>
  transactions.filter(transaction => isPending(transaction.status))
)
