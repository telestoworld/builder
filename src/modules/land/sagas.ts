import { Eth } from 'web3x-es/eth'
import { Address } from 'web3x-es/address'
import {
  CONNECT_WALLET_SUCCESS,
  CHANGE_ACCOUNT,
  ConnectWalletSuccessAction,
  ChangeAccountAction
} from 'telestoworld-dapps/dist/modules/wallet/actions'
import { Wallet } from 'telestoworld-dapps/dist/modules/wallet/types'
import { takeLatest, call, put, takeEvery, all } from 'redux-saga/effects'
import {
  FETCH_SPACES_REQUEST,
  FetchLandsRequestAction,
  fetchLandsFailure,
  fetchLandsSuccess,
  fetchLandsRequest,
  TRANSFER_SPACE_REQUEST,
  TransferLandRequestAction,
  transferLandSuccess,
  transferLandFailure,
  EDIT_SPACE_REQUEST,
  EditLandRequestAction,
  editLandSuccess,
  editLandFailure,
  SET_OPERATOR_REQUEST,
  SetOperatorRequestAction,
  setOperatorSuccess,
  setOperatorFailure,
  CREATE_ESTATE_REQUEST,
  CreateSectorRequestAction,
  createSectorSuccess,
  createSectorFailure,
  EditSectorRequestAction,
  editSectorSuccess,
  editSectorFailure,
  EDIT_ESTATE_REQUEST,
  DISSOLVE_ESTATE_REQUEST,
  DissolveSectorRequestAction,
  dissolveSectorSuccess,
  dissolveSectorFailure,
  SET_UPDATE_MANAGER_REQUEST,
  SetUpdateManagerRequestAction,
  setUpdateManagerSuccess,
  setUpdateManagerFailure
} from './actions'
import { manager } from 'lib/api/manager'
import { SPACERegistry } from 'contracts/SPACERegistry'
import { SPACE_REGISTRY_ADDRESS, ESTATE_REGISTRY_ADDRESS } from 'modules/common/contracts'
import { SectorRegistry } from 'contracts/SectorRegistry'
import { push } from 'connected-react-router'
import { locations } from 'routing/locations'
import { closeModal } from 'modules/modal/actions'
import { getWallet } from 'modules/wallet/utils'
import { splitCoords, buildMetadata } from './utils'
import { Land, LandType, Authorization } from './types'

export function* landSaga() {
  yield takeEvery(SET_UPDATE_MANAGER_REQUEST, handleSetUpdateManagerRequest)
  yield takeEvery(DISSOLVE_ESTATE_REQUEST, handleDissolveSectorRequest)
  yield takeEvery(EDIT_ESTATE_REQUEST, handleEditSectorRequest)
  yield takeEvery(CREATE_ESTATE_REQUEST, handleCreateSectorRequest)
  yield takeEvery(SET_OPERATOR_REQUEST, handleSetOperatorRequest)
  yield takeEvery(EDIT_SPACE_REQUEST, handleEditLandRequest)
  yield takeEvery(TRANSFER_SPACE_REQUEST, handleTransferLandRequest)
  yield takeEvery(FETCH_SPACES_REQUEST, handleFetchLandRequest)
  yield takeLatest(CONNECT_WALLET_SUCCESS, handleWallet)
  yield takeLatest(CHANGE_ACCOUNT, handleWallet)
}

function* handleSetUpdateManagerRequest(action: SetUpdateManagerRequestAction) {
  const { address, isApproved, type } = action.payload
  try {
    const [wallet, eth]: [Wallet, Eth] = yield getWallet()
    const from = Address.fromString(wallet.address)
    const manager = Address.fromString(address)
    switch (type) {
      case LandType.PARCEL: {
        const landRegistry = new SPACERegistry(eth, Address.fromString(SPACE_REGISTRY_ADDRESS))
        const txHash = yield call(() =>
          landRegistry.methods
            .setUpdateManager(from, manager, isApproved)
            .send({ from })
            .getTxHash()
        )
        yield put(setUpdateManagerSuccess(address, type, isApproved, wallet.chainId, txHash))
        break
      }
      case LandType.ESTATE: {
        const estateRegistry = new SectorRegistry(eth, Address.fromString(ESTATE_REGISTRY_ADDRESS))
        const txHash = yield call(() =>
          estateRegistry.methods
            .setUpdateManager(from, manager, isApproved)
            .send({ from })
            .getTxHash()
        )
        yield put(setUpdateManagerSuccess(address, type, isApproved, wallet.chainId, txHash))
        break
      }
    }
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(setUpdateManagerFailure(address, type, isApproved, error.message))
  }
}

function* handleDissolveSectorRequest(action: DissolveSectorRequestAction) {
  const { land } = action.payload

  try {
    if (land.type !== LandType.ESTATE) {
      throw new Error(`Invalid LandType: "${land.type}"`)
    }
    const [wallet, eth]: [Wallet, Eth] = yield getWallet()
    const from = Address.fromString(wallet.address)
    const landRegistry = new SPACERegistry(eth, Address.fromString(SPACE_REGISTRY_ADDRESS))
    const estateRegistry = new SectorRegistry(eth, Address.fromString(ESTATE_REGISTRY_ADDRESS))
    const tokenIds = yield all(land.parcels!.map(parcel => landRegistry.methods.encodeTokenId(parcel.x, parcel.y).call()))
    const txHash = yield call(() =>
      estateRegistry.methods
        .transferManyLands(land.id, tokenIds, from)
        .send({ from })
        .getTxHash()
    )
    yield put(dissolveSectorSuccess(land, wallet.chainId, txHash))
    yield put(closeModal('DissolveModal'))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(dissolveSectorFailure(land, error.message))
  }
}

function* handleCreateSectorRequest(action: CreateSectorRequestAction) {
  const { name, description, coords } = action.payload
  try {
    const [wallet, eth]: [Wallet, Eth] = yield getWallet()
    const from = Address.fromString(wallet.address)
    const [xs, ys] = splitCoords(coords)
    const landRegistry = new SPACERegistry(eth, Address.fromString(SPACE_REGISTRY_ADDRESS))
    const metadata = buildMetadata(name, description)
    const txHash = yield call(() =>
      landRegistry.methods
        .createSectorWithMetadata(xs, ys, from, metadata)
        .send({ from })
        .getTxHash()
    )

    yield put(createSectorSuccess(name, description, coords, wallet.chainId, txHash))
    yield put(closeModal('SectorEditorModal'))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(createSectorFailure(name, description, coords, error.message))
  }
}

function* handleEditSectorRequest(action: EditSectorRequestAction) {
  const { land, toAdd, toRemove } = action.payload
  try {
    const [wallet, eth]: [Wallet, Eth] = yield getWallet()
    const from = Address.fromString(wallet.address)
    const landRegistry = new SPACERegistry(eth, Address.fromString(SPACE_REGISTRY_ADDRESS))

    if (toAdd.length > 0) {
      const [xsToAdd, ysToAdd] = splitCoords(toAdd)
      const txHash = yield call(() =>
        landRegistry.methods
          .transferManyLandToSector(xsToAdd, ysToAdd, land.id)
          .send({ from })
          .getTxHash()
      )
      yield put(editSectorSuccess(land, toAdd, 'add', wallet.chainId, txHash))
    }

    if (toRemove.length > 0) {
      const estateRegistry = new SectorRegistry(eth, Address.fromString(ESTATE_REGISTRY_ADDRESS))
      const tokenIds = yield all(toRemove.map(({ x, y }) => landRegistry.methods.encodeTokenId(x, y).call()))
      const txHash = yield call(() =>
        estateRegistry.methods
          .transferManyLands(land.id, tokenIds, from)
          .send({ from })
          .getTxHash()
      )
      yield put(editSectorSuccess(land, toRemove, 'remove', wallet.chainId, txHash))
    }
    yield put(closeModal('SectorEditorModal'))
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(editSectorFailure(land, toAdd, toRemove, error.message))
  }
}

function* handleSetOperatorRequest(action: SetOperatorRequestAction) {
  const { land, address } = action.payload

  try {
    const [wallet, eth]: [Wallet, Eth] = yield getWallet()
    const from = Address.fromString(wallet.address)
    const operator = address ? Address.fromString(address) : Address.ZERO

    switch (land.type) {
      case LandType.PARCEL: {
        const landRegistry = new SPACERegistry(eth, Address.fromString(SPACE_REGISTRY_ADDRESS))
        const tokenId = yield call(() => landRegistry.methods.encodeTokenId(land.x!, land.y!).call())
        const txHash = yield call(() =>
          landRegistry.methods
            .setUpdateOperator(tokenId, operator)
            .send({ from })
            .getTxHash()
        )
        yield put(setOperatorSuccess(land, address, wallet.chainId, txHash))
        break
      }
      case LandType.ESTATE: {
        const estateRegistry = new SectorRegistry(eth, Address.fromString(ESTATE_REGISTRY_ADDRESS))
        const txHash = yield call(() =>
          estateRegistry.methods
            .setUpdateOperator(land.id, operator)
            .send({ from })
            .getTxHash()
        )
        yield put(setOperatorSuccess(land, address, wallet.chainId, txHash))
        break
      }
      default:
        throw new Error(`Unknown Land Type: ${land.type}`)
    }
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(setOperatorFailure(land, address, error.message))
  }
}

function* handleEditLandRequest(action: EditLandRequestAction) {
  const { land, name, description } = action.payload

  const metadata = buildMetadata(name, description)

  try {
    const [wallet, eth]: [Wallet, Eth] = yield getWallet()
    const from = Address.fromString(wallet.address)

    switch (land.type) {
      case LandType.PARCEL: {
        const landRegistry = new SPACERegistry(eth, Address.fromString(SPACE_REGISTRY_ADDRESS))
        const txHash = yield call(() =>
          landRegistry.methods
            .updateLandData(land.x!, land.y!, metadata)
            .send({ from })
            .getTxHash()
        )
        yield put(editLandSuccess(land, name, description, wallet.chainId, txHash))
        break
      }
      case LandType.ESTATE: {
        const estateRegistry = new SectorRegistry(eth, Address.fromString(ESTATE_REGISTRY_ADDRESS))
        const txHash = yield call(() =>
          estateRegistry.methods
            .updateMetadata(land.id, metadata)
            .send({ from })
            .getTxHash()
        )
        yield put(editLandSuccess(land, name, description, wallet.chainId, txHash))
        break
      }
      default:
        throw new Error(`Unknown Land Type: ${land.type}`)
    }
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(editLandFailure(land, name, description, error.message))
  }
}

function* handleTransferLandRequest(action: TransferLandRequestAction) {
  const { land, address } = action.payload

  try {
    const [wallet, eth]: [Wallet, Eth] = yield getWallet()
    const from = Address.fromString(wallet.address)
    const to = Address.fromString(address)

    switch (land.type) {
      case LandType.PARCEL: {
        const landRegistry = new SPACERegistry(eth, Address.fromString(SPACE_REGISTRY_ADDRESS))
        const id = yield call(() => landRegistry.methods.encodeTokenId(land.x!, land.y!).call())
        const txHash = yield call(() =>
          landRegistry.methods
            .transferFrom(from, to, id)
            .send({ from })
            .getTxHash()
        )
        yield put(transferLandSuccess(land, address, wallet.chainId, txHash))
        break
      }
      case LandType.ESTATE: {
        const estateRegistry = new SectorRegistry(eth, Address.fromString(ESTATE_REGISTRY_ADDRESS))
        const txHash = yield call(() =>
          estateRegistry.methods
            .transferFrom(from, to, land.id)
            .send({ from })
            .getTxHash()
        )
        yield put(transferLandSuccess(land, address, wallet.chainId, txHash))
        break
      }
      default:
        throw new Error(`Unknown Land Type: ${land.type}`)
    }
    yield put(push(locations.activity()))
  } catch (error) {
    yield put(transferLandFailure(land, address, error.message))
  }
}

function* handleFetchLandRequest(action: FetchLandsRequestAction) {
  const { address } = action.payload
  try {
    const [land, authorizations]: [Land[], Authorization[]] = yield call(() => manager.fetchLand(address))
    yield put(fetchLandsSuccess(address, land, authorizations))
  } catch (error) {
    yield put(fetchLandsFailure(address, error.message))
  }
}

function* handleWallet(action: ConnectWalletSuccessAction | ChangeAccountAction) {
  const { address } = action.payload.wallet
  yield put(fetchLandsRequest(address))
}
