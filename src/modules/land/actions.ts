import { action } from 'typesafe-actions'
import { ChainId } from 'tw-schemas'
import { buildTransactionPayload } from 'telestoworld-dapps/dist/modules/transaction/utils'
import { Coord } from 'telestoworld-ui'
import { Land, LandType, Authorization } from './types'
import { getSelection } from './utils'

export const FETCH_SPACES_REQUEST = '[Request] Fetch Lands'
export const FETCH_SPACES_SUCCESS = '[Success] Fetch Lands'
export const FETCH_SPACES_FAILURE = '[Failure] Fetch Lands'

export const fetchLandsRequest = (address: string) => action(FETCH_SPACES_REQUEST, { address })
export const fetchLandsSuccess = (address: string, lands: Land[], authorizations: Authorization[]) =>
  action(FETCH_SPACES_SUCCESS, { address, lands, authorizations })
export const fetchLandsFailure = (address: string, error: string) => action(FETCH_SPACES_FAILURE, { address, error })

export type FetchLandsRequestAction = ReturnType<typeof fetchLandsRequest>
export type FetchLandsSuccessAction = ReturnType<typeof fetchLandsSuccess>
export type FetchLandsFailureAction = ReturnType<typeof fetchLandsFailure>

export const TRANSFER_SPACE_REQUEST = '[Request] Transfer Land'
export const TRANSFER_SPACE_SUCCESS = '[Success] Transfer Land'
export const TRANSFER_SPACE_FAILURE = '[Failure] Transfer Land'

export const transferLandRequest = (land: Land, address: string) => action(TRANSFER_SPACE_REQUEST, { land, address })
export const transferLandSuccess = (land: Land, address: string, chainId: ChainId, txHash: string) =>
  action(TRANSFER_SPACE_SUCCESS, {
    land,
    address,
    ...buildTransactionPayload(chainId, txHash, {
      id: land.id,
      name: land.name,
      address,
      selection: getSelection(land)
    })
  })
export const transferLandFailure = (land: Land, address: string, error: string) => action(TRANSFER_SPACE_FAILURE, { land, address, error })

export type TransferLandRequestAction = ReturnType<typeof transferLandRequest>
export type TransferLandSuccessAction = ReturnType<typeof transferLandSuccess>
export type TransferLandFailureAction = ReturnType<typeof transferLandFailure>

export const EDIT_SPACE_REQUEST = '[Request] Edit Land'
export const EDIT_SPACE_SUCCESS = '[Success] Edit Land'
export const EDIT_SPACE_FAILURE = '[Failure] Edit Land'

export const editLandRequest = (land: Land, name: string, description: string) => action(EDIT_SPACE_REQUEST, { land, name, description })
export const editLandSuccess = (land: Land, name: string, description: string, chainId: ChainId, txHash: string) =>
  action(EDIT_SPACE_SUCCESS, {
    land,
    name,
    description,
    ...buildTransactionPayload(chainId, txHash, {
      id: land.id,
      name,
      description,
      selection: getSelection(land)
    })
  })
export const editLandFailure = (land: Land, name: string, description: string, error: string) =>
  action(EDIT_SPACE_FAILURE, { land, name, description, error })

export type EditLandRequestAction = ReturnType<typeof editLandRequest>
export type EditLandSuccessAction = ReturnType<typeof editLandSuccess>
export type EditLandFailureAction = ReturnType<typeof editLandFailure>

export const SET_OPERATOR_REQUEST = '[Request] Set Operator'
export const SET_OPERATOR_SUCCESS = '[Success] Set Operator'
export const SET_OPERATOR_FAILURE = '[Failure] Set Operator'

export const setOperatorRequest = (land: Land, address: string | null) => action(SET_OPERATOR_REQUEST, { land, address })
export const setOperatorSuccess = (land: Land, address: string | null, chainId: ChainId, txHash: string) =>
  action(SET_OPERATOR_SUCCESS, {
    land,
    address,
    ...buildTransactionPayload(chainId, txHash, {
      id: land.id,
      name: land.name,
      address,
      selection: getSelection(land)
    })
  })
export const setOperatorFailure = (land: Land, address: string | null, error: string) =>
  action(SET_OPERATOR_FAILURE, { land, address, error })

export type SetOperatorRequestAction = ReturnType<typeof setOperatorRequest>
export type SetOperatorSuccessAction = ReturnType<typeof setOperatorSuccess>
export type SetOperatorFailureAction = ReturnType<typeof setOperatorFailure>

export const CREATE_ESTATE_REQUEST = '[Request] Create Sector'
export const CREATE_ESTATE_SUCCESS = '[Success] Create Sector'
export const CREATE_ESTATE_FAILURE = '[Failure] Create Sector'

export const createSectorRequest = (name: string, description: string, coords: Coord[]) =>
  action(CREATE_ESTATE_REQUEST, { name, description, coords })
export const createSectorSuccess = (name: string, description: string, coords: Coord[], chainId: ChainId, txHash: string) =>
  action(CREATE_ESTATE_SUCCESS, {
    name,
    description,
    coords,
    ...buildTransactionPayload(chainId, txHash, {
      name,
      description,
      size: coords.length,
      selection: coords
    })
  })
export const createSectorFailure = (name: string, description: string, coords: Coord[], error: string) =>
  action(CREATE_ESTATE_FAILURE, { name, description, coords, error })

export type CreateSectorRequestAction = ReturnType<typeof createSectorRequest>
export type CreateSectorSuccessAction = ReturnType<typeof createSectorSuccess>
export type CreateSectorFailureAction = ReturnType<typeof createSectorFailure>

export const EDIT_ESTATE_REQUEST = '[Request] Edit Sector'
export const EDIT_ESTATE_SUCCESS = '[Success] Edit Sector'
export const EDIT_ESTATE_FAILURE = '[Failure] Edit Sector'

export const editSectorRequest = (land: Land, toAdd: Coord[], toRemove: Coord[]) => action(EDIT_ESTATE_REQUEST, { land, toAdd, toRemove })
export const editSectorSuccess = (land: Land, coords: Coord[], type: 'add' | 'remove', chainId: ChainId, txHash: string) =>
  action(EDIT_ESTATE_SUCCESS, {
    land,
    coords,
    type,
    ...buildTransactionPayload(chainId, txHash, {
      id: land.id,
      name: land.name,
      count: coords.length,
      type,
      selection: getSelection(land)
    })
  })
export const editSectorFailure = (land: Land, toAdd: Coord[], toRemove: Coord[], error: string) =>
  action(EDIT_ESTATE_FAILURE, { land, toAdd, toRemove, error })

export type EditSectorRequestAction = ReturnType<typeof editSectorRequest>
export type EditSectorSuccessAction = ReturnType<typeof editSectorSuccess>
export type EditSectorFailureAction = ReturnType<typeof editSectorFailure>

export const DISSOLVE_ESTATE_REQUEST = '[Request] Dissolve Sector'
export const DISSOLVE_ESTATE_SUCCESS = '[Success] Dissolve Sector'
export const DISSOLVE_ESTATE_FAILURE = '[Failure] Dissolve Sector'

export const dissolveSectorRequest = (land: Land) => action(DISSOLVE_ESTATE_REQUEST, { land })
export const dissolveSectorSuccess = (land: Land, chainId: ChainId, txHash: string) =>
  action(DISSOLVE_ESTATE_SUCCESS, {
    land,
    ...buildTransactionPayload(chainId, txHash, {
      id: land.id,
      name: land.name,
      selection: getSelection(land)
    })
  })
export const dissolveSectorFailure = (land: Land, error: string) => action(DISSOLVE_ESTATE_FAILURE, { land, error })

export type DissolveSectorRequestAction = ReturnType<typeof dissolveSectorRequest>
export type DissolveSectorSuccessAction = ReturnType<typeof dissolveSectorSuccess>
export type DissolveSectorFailureAction = ReturnType<typeof dissolveSectorFailure>

export const SET_UPDATE_MANAGER_REQUEST = '[Request] Set Update Manager'
export const SET_UPDATE_MANAGER_SUCCESS = '[Success] Set Update Manager'
export const SET_UPDATE_MANAGER_FAILURE = '[Failure] Set Update Manager'

export const setUpdateManagerRequest = (address: string, type: LandType, isApproved: boolean) =>
  action(SET_UPDATE_MANAGER_REQUEST, { address, isApproved, type })
export const setUpdateManagerSuccess = (address: string, type: LandType, isApproved: boolean, chainId: ChainId, txHash: string) =>
  action(SET_UPDATE_MANAGER_SUCCESS, {
    address,
    type,
    isApproved,
    ...buildTransactionPayload(chainId, txHash, {
      address,
      type,
      isApproved
    })
  })
export const setUpdateManagerFailure = (address: string, type: LandType, isApproved: boolean, error: string) =>
  action(SET_UPDATE_MANAGER_FAILURE, { address, type, isApproved, error })

export type SetUpdateManagerRequestAction = ReturnType<typeof setUpdateManagerRequest>
export type SetUpdateManagerSuccessAction = ReturnType<typeof setUpdateManagerSuccess>
export type SetUpdateManagerFailureAction = ReturnType<typeof setUpdateManagerFailure>
