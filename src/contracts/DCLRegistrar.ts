import BN from 'bn.js'
import { Address } from 'web3x-es/address'
import { EventLog, TransactionReceipt } from 'web3x-es/formatters'
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from 'web3x-es/contract'
import { Eth } from 'web3x-es/eth'
import abi from './TWRegistrarAbi'
export type ApprovalEvent = {
  owner: Address
  approved: Address
  tokenId: string
}
export type ApprovalForAllEvent = {
  owner: Address
  operator: Address
  approved: boolean
}
export type BaseURIEvent = {
  _oldBaseURI: string
  _newBaseURI: string
}
export type BaseUpdatedEvent = {
  _previousBase: Address
  _newBase: Address
}
export type ControllerAddedEvent = {
  _controller: Address
}
export type ControllerRemovedEvent = {
  _controller: Address
}
export type DomainReclaimedEvent = {
  _tokenId: string
}
export type DomainTransferredEvent = {
  _newOwner: Address
  _tokenId: string
}
export type MigrationFinishedEvent = {}
export type NameRegisteredEvent = {
  _caller: Address
  _beneficiary: Address
  _labelHash: string
  _subdomain: string
  _createdDate: string
}
export type OwnershipTransferredEvent = {
  previousOwner: Address
  newOwner: Address
}
export type ReclaimedEvent = {
  _caller: Address
  _owner: Address
  _tokenId: string
}
export type RegistryUpdatedEvent = {
  _previousRegistry: Address
  _newRegistry: Address
}
export type TransferEvent = {
  from: Address
  to: Address
  tokenId: string
}
export interface ApprovalEventLog extends EventLog<ApprovalEvent, 'Approval'> {}
export interface ApprovalForAllEventLog extends EventLog<ApprovalForAllEvent, 'ApprovalForAll'> {}
export interface BaseURIEventLog extends EventLog<BaseURIEvent, 'BaseURI'> {}
export interface BaseUpdatedEventLog extends EventLog<BaseUpdatedEvent, 'BaseUpdated'> {}
export interface ControllerAddedEventLog extends EventLog<ControllerAddedEvent, 'ControllerAdded'> {}
export interface ControllerRemovedEventLog extends EventLog<ControllerRemovedEvent, 'ControllerRemoved'> {}
export interface DomainReclaimedEventLog extends EventLog<DomainReclaimedEvent, 'DomainReclaimed'> {}
export interface DomainTransferredEventLog extends EventLog<DomainTransferredEvent, 'DomainTransferred'> {}
export interface MigrationFinishedEventLog extends EventLog<MigrationFinishedEvent, 'MigrationFinished'> {}
export interface NameRegisteredEventLog extends EventLog<NameRegisteredEvent, 'NameRegistered'> {}
export interface OwnershipTransferredEventLog extends EventLog<OwnershipTransferredEvent, 'OwnershipTransferred'> {}
export interface ReclaimedEventLog extends EventLog<ReclaimedEvent, 'Reclaimed'> {}
export interface RegistryUpdatedEventLog extends EventLog<RegistryUpdatedEvent, 'RegistryUpdated'> {}
export interface TransferEventLog extends EventLog<TransferEvent, 'Transfer'> {}
interface TWRegistrarEvents {
  Approval: EventSubscriptionFactory<ApprovalEventLog>
  ApprovalForAll: EventSubscriptionFactory<ApprovalForAllEventLog>
  BaseURI: EventSubscriptionFactory<BaseURIEventLog>
  BaseUpdated: EventSubscriptionFactory<BaseUpdatedEventLog>
  ControllerAdded: EventSubscriptionFactory<ControllerAddedEventLog>
  ControllerRemoved: EventSubscriptionFactory<ControllerRemovedEventLog>
  DomainReclaimed: EventSubscriptionFactory<DomainReclaimedEventLog>
  DomainTransferred: EventSubscriptionFactory<DomainTransferredEventLog>
  MigrationFinished: EventSubscriptionFactory<MigrationFinishedEventLog>
  NameRegistered: EventSubscriptionFactory<NameRegisteredEventLog>
  OwnershipTransferred: EventSubscriptionFactory<OwnershipTransferredEventLog>
  Reclaimed: EventSubscriptionFactory<ReclaimedEventLog>
  RegistryUpdated: EventSubscriptionFactory<RegistryUpdatedEventLog>
  Transfer: EventSubscriptionFactory<TransferEventLog>
}
interface TWRegistrarEventLogs {
  Approval: ApprovalEventLog
  ApprovalForAll: ApprovalForAllEventLog
  BaseURI: BaseURIEventLog
  BaseUpdated: BaseUpdatedEventLog
  ControllerAdded: ControllerAddedEventLog
  ControllerRemoved: ControllerRemovedEventLog
  DomainReclaimed: DomainReclaimedEventLog
  DomainTransferred: DomainTransferredEventLog
  MigrationFinished: MigrationFinishedEventLog
  NameRegistered: NameRegisteredEventLog
  OwnershipTransferred: OwnershipTransferredEventLog
  Reclaimed: ReclaimedEventLog
  RegistryUpdated: RegistryUpdatedEventLog
  Transfer: TransferEventLog
}
interface TWRegistrarTxEventLogs {
  Approval: ApprovalEventLog[]
  ApprovalForAll: ApprovalForAllEventLog[]
  BaseURI: BaseURIEventLog[]
  BaseUpdated: BaseUpdatedEventLog[]
  ControllerAdded: ControllerAddedEventLog[]
  ControllerRemoved: ControllerRemovedEventLog[]
  DomainReclaimed: DomainReclaimedEventLog[]
  DomainTransferred: DomainTransferredEventLog[]
  MigrationFinished: MigrationFinishedEventLog[]
  NameRegistered: NameRegisteredEventLog[]
  OwnershipTransferred: OwnershipTransferredEventLog[]
  Reclaimed: ReclaimedEventLog[]
  RegistryUpdated: RegistryUpdatedEventLog[]
  Transfer: TransferEventLog[]
}
export interface TWRegistrarTransactionReceipt extends TransactionReceipt<TWRegistrarTxEventLogs> {}
interface TWRegistrarMethods {
  ERC721_RECEIVED(): TxCall<string>
  addController(controller: Address): TxSend<TWRegistrarTransactionReceipt>
  approve(to: Address, tokenId: number | string | BN): TxSend<TWRegistrarTransactionReceipt>
  available(_subdomain: string): TxCall<boolean>
  balanceOf(owner: Address): TxCall<string>
  base(): TxCall<Address>
  baseURI(): TxCall<string>
  controllers(a0: Address): TxCall<boolean>
  domain(): TxCall<string>
  domainNameHash(): TxCall<string>
  getApproved(tokenId: number | string | BN): TxCall<Address>
  getOwnerOf(_subdomain: string): TxCall<Address>
  getTokenId(_subdomain: string): TxCall<string>
  isApprovedForAll(owner: Address, operator: Address): TxCall<boolean>
  isOwner(): TxCall<boolean>
  migrateNames(_names: string[], _beneficiaries: Address[], _createdDates: (number | string | BN)[]): TxSend<TWRegistrarTransactionReceipt>
  migrated(): TxCall<boolean>
  migrationFinished(): TxSend<TWRegistrarTransactionReceipt>
  name(): TxCall<string>
  onERC721Received(a0: Address, a1: Address, _tokenId: number | string | BN, a3: string): TxSend<TWRegistrarTransactionReceipt>
  owner(): TxCall<Address>
  ownerOf(tokenId: number | string | BN): TxCall<Address>
  reclaim(_tokenId: number | string | BN, _owner: Address): TxSend<TWRegistrarTransactionReceipt>
  reclaimDomain(_tokenId: number | string | BN): TxSend<TWRegistrarTransactionReceipt>
  register(_subdomain: string, _beneficiary: Address): TxSend<TWRegistrarTransactionReceipt>
  registry(): TxCall<Address>
  removeController(controller: Address): TxSend<TWRegistrarTransactionReceipt>
  renounceOwnership(): TxSend<TWRegistrarTransactionReceipt>
  safeTransferFrom(from: Address, to: Address, tokenId: number | string | BN): TxSend<TWRegistrarTransactionReceipt>
  safeTransferFrom(from: Address, to: Address, tokenId: number | string | BN, _data: string): TxSend<TWRegistrarTransactionReceipt>
  setApprovalForAll(to: Address, approved: boolean): TxSend<TWRegistrarTransactionReceipt>
  subdomains(a0: string): TxCall<string>
  supportsInterface(interfaceId: string): TxCall<boolean>
  symbol(): TxCall<string>
  tokenByIndex(index: number | string | BN): TxCall<string>
  tokenOfOwnerByIndex(owner: Address, index: number | string | BN): TxCall<string>
  tokenURI(_tokenId: number | string | BN): TxCall<string>
  topdomain(): TxCall<string>
  topdomainNameHash(): TxCall<string>
  totalSupply(): TxCall<string>
  transferDomainOwnership(_owner: Address, _tokenId: number | string | BN): TxSend<TWRegistrarTransactionReceipt>
  transferFrom(from: Address, to: Address, tokenId: number | string | BN): TxSend<TWRegistrarTransactionReceipt>
  transferOwnership(newOwner: Address): TxSend<TWRegistrarTransactionReceipt>
  updateBase(_base: Address): TxSend<TWRegistrarTransactionReceipt>
  updateBaseURI(_baseURI: string): TxSend<TWRegistrarTransactionReceipt>
  updateRegistry(_registry: Address): TxSend<TWRegistrarTransactionReceipt>
}
export interface TWRegistrarDefinition {
  methods: TWRegistrarMethods
  events: TWRegistrarEvents
  eventLogs: TWRegistrarEventLogs
}
export class TWRegistrar extends Contract<TWRegistrarDefinition> {
  constructor(eth: Eth, address?: Address, options?: ContractOptions) {
    super(eth, abi, address, options)
  }
}
export var TWRegistrarAbi = abi
