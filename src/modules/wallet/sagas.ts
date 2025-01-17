import { all, takeEvery, put } from 'redux-saga/effects'
import { ChainId } from 'tw-schemas'
import { ContractName, getContract } from 'telestoworld-transactions'
import { env } from 'telestoworld-commons'
import { createWalletSaga } from 'telestoworld-dapps/dist/modules/wallet/sagas'
import {
  CHANGE_ACCOUNT,
  CHANGE_NETWORK,
  CONNECT_WALLET_SUCCESS,
  ChangeAccountAction,
  ChangeNetworkAction,
  ConnectWalletSuccessAction
} from 'telestoworld-dapps/dist/modules/wallet/actions'
import { fetchAuthorizationsRequest } from 'telestoworld-dapps/dist/modules/authorization/actions'
import { Authorization, AuthorizationType } from 'telestoworld-dapps/dist/modules/authorization/types'
import { TELO_ADDRESS } from 'modules/common/contracts'

const baseWalletSaga = createWalletSaga({
  TELO_ADDRESS,
  CHAIN_ID: env.get('REACT_APP_CHAIN_ID') || ChainId.ETHEREUM_MAINNET
})

export function* walletSaga() {
  yield all([baseWalletSaga(), customWalletSaga()])
}

function* customWalletSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleWalletChange)
  yield takeEvery(CHANGE_ACCOUNT, handleWalletChange)
  yield takeEvery(CHANGE_NETWORK, handleWalletChange)
}

function* handleWalletChange(action: ConnectWalletSuccessAction | ChangeAccountAction | ChangeNetworkAction) {
  const { wallet } = action.payload
  const chainId = wallet.networks.MATIC.chainId

  let authorizations: Authorization[] = []

  if (env.get('REACT_APP_FF_WEARABLES')) {
    authorizations.push({
      type: AuthorizationType.ALLOWANCE,
      address: wallet.address,
      tokenAddress: getContract(ContractName.MANAToken, chainId).address,
      authorizedAddress: getContract(ContractName.CollectionManager, chainId).address,
      chainId: ChainId.MATIC_MUMBAI
    })
  }

  yield put(fetchAuthorizationsRequest(authorizations))
}
