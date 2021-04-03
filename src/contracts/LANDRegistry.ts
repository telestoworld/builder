import BN from 'bn.js'
import { Address } from 'web3x-es/address'
import { EventLog, TransactionReceipt } from 'web3x-es/formatters'
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from 'web3x-es/contract'
import { Eth } from 'web3x-es/eth'
import abi from './SPACERegistryAbi'
export type SectorRegistrySetEvent = {
  registry: Address
}
export type UpdateEvent = {
  assetId: string
  holder: Address
  operator: Address
  data: string
}
export type UpdateOperatorEvent = {
  assetId: string
  operator: Address
}
export type UpdateManagerEvent = {
  _owner: Address
  _operator: Address
  _caller: Address
  _approved: boolean
}
export type DeployAuthorizedEvent = {
  _caller: Address
  _deployer: Address
}
export type DeployForbiddenEvent = {
  _caller: Address
  _deployer: Address
}
export type TransferEvent = {
  from: Address
  to: Address
  assetId: string
  operator: Address
  userData: string
  operatorData: string
}
export type ApprovalForAllEvent = {
  holder: Address
  operator: Address
  authorized: boolean
}
export type ApprovalEvent = {
  owner: Address
  operator: Address
  assetId: string
}
export type OwnerUpdateEvent = {
  _prevOwner: Address
  _newOwner: Address
}
export interface SectorRegistrySetEventLog extends EventLog<SectorRegistrySetEvent, 'SectorRegistrySet'> {}
export interface UpdateEventLog extends EventLog<UpdateEvent, 'Update'> {}
export interface UpdateOperatorEventLog extends EventLog<UpdateOperatorEvent, 'UpdateOperator'> {}
export interface UpdateManagerEventLog extends EventLog<UpdateManagerEvent, 'UpdateManager'> {}
export interface DeployAuthorizedEventLog extends EventLog<DeployAuthorizedEvent, 'DeployAuthorized'> {}
export interface DeployForbiddenEventLog extends EventLog<DeployForbiddenEvent, 'DeployForbidden'> {}
export interface TransferEventLog extends EventLog<TransferEvent, 'Transfer'> {}
export interface ApprovalForAllEventLog extends EventLog<ApprovalForAllEvent, 'ApprovalForAll'> {}
export interface ApprovalEventLog extends EventLog<ApprovalEvent, 'Approval'> {}
export interface OwnerUpdateEventLog extends EventLog<OwnerUpdateEvent, 'OwnerUpdate'> {}
interface SPACERegistryEvents {
  SectorRegistrySet: EventSubscriptionFactory<SectorRegistrySetEventLog>
  Update: EventSubscriptionFactory<UpdateEventLog>
  UpdateOperator: EventSubscriptionFactory<UpdateOperatorEventLog>
  UpdateManager: EventSubscriptionFactory<UpdateManagerEventLog>
  DeployAuthorized: EventSubscriptionFactory<DeployAuthorizedEventLog>
  DeployForbidden: EventSubscriptionFactory<DeployForbiddenEventLog>
  Transfer: EventSubscriptionFactory<TransferEventLog>
  ApprovalForAll: EventSubscriptionFactory<ApprovalForAllEventLog>
  Approval: EventSubscriptionFactory<ApprovalEventLog>
  OwnerUpdate: EventSubscriptionFactory<OwnerUpdateEventLog>
}
interface SPACERegistryEventLogs {
  SectorRegistrySet: SectorRegistrySetEventLog
  Update: UpdateEventLog
  UpdateOperator: UpdateOperatorEventLog
  UpdateManager: UpdateManagerEventLog
  DeployAuthorized: DeployAuthorizedEventLog
  DeployForbidden: DeployForbiddenEventLog
  Transfer: TransferEventLog
  ApprovalForAll: ApprovalForAllEventLog
  Approval: ApprovalEventLog
  OwnerUpdate: OwnerUpdateEventLog
}
interface SPACERegistryTxEventLogs {
  SectorRegistrySet: SectorRegistrySetEventLog[]
  Update: UpdateEventLog[]
  UpdateOperator: UpdateOperatorEventLog[]
  UpdateManager: UpdateManagerEventLog[]
  DeployAuthorized: DeployAuthorizedEventLog[]
  DeployForbidden: DeployForbiddenEventLog[]
  Transfer: TransferEventLog[]
  ApprovalForAll: ApprovalForAllEventLog[]
  Approval: ApprovalEventLog[]
  OwnerUpdate: OwnerUpdateEventLog[]
}
export interface SPACERegistryTransactionReceipt extends TransactionReceipt<SPACERegistryTxEventLogs> {}
interface SPACERegistryMethods {
  supportsInterface(_interfaceID: string): TxCall<boolean>
  proxyOwner(): TxCall<Address>
  name(): TxCall<string>
  updateManager(a0: Address, a1: Address): TxCall<boolean>
  getApproved(assetId: number | string | BN): TxCall<Address>
  approve(operator: Address, assetId: number | string | BN): TxSend<SPACERegistryTransactionReceipt>
  ownerOfLand(x: number | string | BN, y: number | string | BN): TxCall<Address>
  setLatestToNow(user: Address): TxSend<SPACERegistryTransactionReceipt>
  totalSupply(): TxCall<string>
  assignNewParcel(x: number | string | BN, y: number | string | BN, beneficiary: Address): TxSend<SPACERegistryTransactionReceipt>
  ownerOfLandMany(x: (number | string | BN)[], y: (number | string | BN)[]): TxCall<Address[]>
  latestPing(a0: Address): TxCall<string>
  updateManyLandData(x: (number | string | BN)[], y: (number | string | BN)[], data: string): TxSend<SPACERegistryTransactionReceipt>
  transferFrom(from: Address, to: Address, assetId: number | string | BN): TxSend<SPACERegistryTransactionReceipt>
  isAuthorized(operator: Address, assetId: number | string | BN): TxCall<boolean>
  authorizedDeploy(a0: Address): TxCall<boolean>
  tokenOfOwnerByIndex(owner: Address, index: number | string | BN): TxCall<string>
  decimals(): TxCall<string>
  authorizeDeploy(beneficiary: Address): TxSend<SPACERegistryTransactionReceipt>
  transferLand(x: number | string | BN, y: number | string | BN, to: Address): TxSend<SPACERegistryTransactionReceipt>
  safeTransferFrom(from: Address, to: Address, assetId: number | string | BN): TxSend<SPACERegistryTransactionReceipt>
  initialize(a0: string): TxSend<SPACERegistryTransactionReceipt>
  landData(x: number | string | BN, y: number | string | BN): TxCall<string>
  transferManyLand(x: (number | string | BN)[], y: (number | string | BN)[], to: Address): TxSend<SPACERegistryTransactionReceipt>
  exists(assetId: number | string | BN): TxCall<boolean>
  tokensOf(owner: Address): TxCall<string[]>
  ping(): TxSend<SPACERegistryTransactionReceipt>
  ownerOf(assetId: number | string | BN): TxCall<Address>
  GET_METADATA(): TxCall<string>
  isUpdateAuthorized(operator: Address, assetId: number | string | BN): TxCall<boolean>
  tokenMetadata(assetId: number | string | BN): TxCall<string>
  encodeTokenId(x: number | string | BN, y: number | string | BN): TxCall<string>
  balanceOf(owner: Address): TxCall<string>
  currentContract(): TxCall<Address>
  setManyUpdateOperator(_assetIds: (number | string | BN)[], _operator: Address): TxSend<SPACERegistryTransactionReceipt>
  description(): TxCall<string>
  decodeTokenId(
    value: number | string | BN
  ): TxCall<{
    0: string
    1: string
  }>
  assignMultipleParcels(
    x: (number | string | BN)[],
    y: (number | string | BN)[],
    beneficiary: Address
  ): TxSend<SPACERegistryTransactionReceipt>
  createSectorWithMetadata(
    x: (number | string | BN)[],
    y: (number | string | BN)[],
    beneficiary: Address,
    metadata: string
  ): TxSend<SPACERegistryTransactionReceipt>
  landOf(
    owner: Address
  ): TxCall<{
    0: string[]
    1: string[]
  }>
  owner(): TxCall<Address>
  setSectorRegistry(registry: Address): TxSend<SPACERegistryTransactionReceipt>
  symbol(): TxCall<string>
  updateOperator(a0: number | string | BN): TxCall<Address>
  setApprovalForAll(operator: Address, authorized: boolean): TxSend<SPACERegistryTransactionReceipt>
  exists(x: number | string | BN, y: number | string | BN): TxCall<boolean>
  setUpdateOperator(assetId: number | string | BN, operator: Address): TxSend<SPACERegistryTransactionReceipt>
  safeTransferFrom(from: Address, to: Address, assetId: number | string | BN, userData: string): TxSend<SPACERegistryTransactionReceipt>
  createSector(x: (number | string | BN)[], y: (number | string | BN)[], beneficiary: Address): TxSend<SPACERegistryTransactionReceipt>
  updateLandData(x: number | string | BN, y: number | string | BN, data: string): TxSend<SPACERegistryTransactionReceipt>
  estateRegistry(): TxCall<Address>
  isApprovedForAll(assetHolder: Address, operator: Address): TxCall<boolean>
  getApprovedAddress(assetId: number | string | BN): TxCall<Address>
  setUpdateManager(_owner: Address, _operator: Address, _approved: boolean): TxSend<SPACERegistryTransactionReceipt>
  transferOwnership(_newOwner: Address): TxSend<SPACERegistryTransactionReceipt>
  transferManyLandToSector(
    x: (number | string | BN)[],
    y: (number | string | BN)[],
    estateId: number | string | BN
  ): TxSend<SPACERegistryTransactionReceipt>
  transferLandToSector(
    x: number | string | BN,
    y: number | string | BN,
    estateId: number | string | BN
  ): TxSend<SPACERegistryTransactionReceipt>
  forbidDeploy(beneficiary: Address): TxSend<SPACERegistryTransactionReceipt>
}
export interface SPACERegistryDefinition {
  methods: SPACERegistryMethods
  events: SPACERegistryEvents
  eventLogs: SPACERegistryEventLogs
}
export class SPACERegistry extends Contract<SPACERegistryDefinition> {
  constructor(eth: Eth, address?: Address, options?: ContractOptions) {
    super(eth, abi, address, options)
  }
}
export const SPACERegistryAbi = abi
