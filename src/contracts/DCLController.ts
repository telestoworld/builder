import BN from 'bn.js'
import { Address } from 'web3x-es/address'
import { EventLog, TransactionReceipt } from 'web3x-es/formatters'
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from 'web3x-es/contract'
import { Eth } from 'web3x-es/eth'
import abi from './TWControllerAbi'
export type MaxGasPriceChangedEvent = {
  _oldMaxGasPrice: string
  _newMaxGasPrice: string
}
export type NameBoughtEvent = {
  _caller: Address
  _beneficiary: Address
  _price: string
  _name: string
}
export type OwnershipTransferredEvent = {
  previousOwner: Address
  newOwner: Address
}
export interface MaxGasPriceChangedEventLog extends EventLog<MaxGasPriceChangedEvent, 'MaxGasPriceChanged'> {}
export interface NameBoughtEventLog extends EventLog<NameBoughtEvent, 'NameBought'> {}
export interface OwnershipTransferredEventLog extends EventLog<OwnershipTransferredEvent, 'OwnershipTransferred'> {}
interface TWControllerEvents {
  MaxGasPriceChanged: EventSubscriptionFactory<MaxGasPriceChangedEventLog>
  NameBought: EventSubscriptionFactory<NameBoughtEventLog>
  OwnershipTransferred: EventSubscriptionFactory<OwnershipTransferredEventLog>
}
interface TWControllerEventLogs {
  MaxGasPriceChanged: MaxGasPriceChangedEventLog
  NameBought: NameBoughtEventLog
  OwnershipTransferred: OwnershipTransferredEventLog
}
interface TWControllerTxEventLogs {
  MaxGasPriceChanged: MaxGasPriceChangedEventLog[]
  NameBought: NameBoughtEventLog[]
  OwnershipTransferred: OwnershipTransferredEventLog[]
}
export interface TWControllerTransactionReceipt extends TransactionReceipt<TWControllerTxEventLogs> {}
interface TWControllerMethods {
  PRICE(): TxCall<string>
  acceptedToken(): TxCall<Address>
  isOwner(): TxCall<boolean>
  maxGasPrice(): TxCall<string>
  owner(): TxCall<Address>
  register(_name: string, _beneficiary: Address): TxSend<TWControllerTransactionReceipt>
  registrar(): TxCall<Address>
  renounceOwnership(): TxSend<TWControllerTransactionReceipt>
  transferOwnership(newOwner: Address): TxSend<TWControllerTransactionReceipt>
  updateMaxGasPrice(_maxGasPrice: number | string | BN): TxSend<TWControllerTransactionReceipt>
}
export interface TWControllerDefinition {
  methods: TWControllerMethods
  events: TWControllerEvents
  eventLogs: TWControllerEventLogs
}
export class TWController extends Contract<TWControllerDefinition> {
  constructor(eth: Eth, address?: Address, options?: ContractOptions) {
    super(eth, abi, address, options)
  }
}
export const TWControllerAbi = abi
