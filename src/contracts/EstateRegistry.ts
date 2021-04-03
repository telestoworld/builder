import BN from "bn.js";
import { Address } from "web3x-es/address";
import { EventLog, TransactionReceipt } from "web3x-es/formatters";
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from "web3x-es/contract";
import { Eth } from "web3x-es/eth";
import abi from "./SectorRegistryAbi";
export type OwnershipTransferredEvent = {
    previousOwner: Address;
    newOwner: Address;
};
export type TransferEvent = {
    _from: Address;
    _to: Address;
    _tokenId: string;
};
export type ApprovalEvent = {
    _owner: Address;
    _approved: Address;
    _tokenId: string;
};
export type ApprovalForAllEvent = {
    _owner: Address;
    _operator: Address;
    _approved: boolean;
};
export type CreateSectorEvent = {
    _owner: Address;
    _estateId: string;
    _data: string;
};
export type AddLandEvent = {
    _estateId: string;
    _landId: string;
};
export type RemoveLandEvent = {
    _estateId: string;
    _landId: string;
    _destinatary: Address;
};
export type UpdateEvent = {
    _assetId: string;
    _holder: Address;
    _operator: Address;
    _data: string;
};
export type UpdateOperatorEvent = {
    _estateId: string;
    _operator: Address;
};
export type UpdateManagerEvent = {
    _owner: Address;
    _operator: Address;
    _caller: Address;
    _approved: boolean;
};
export type SetSPACERegistryEvent = {
    _registry: Address;
};
export type MigratedEvent = {
    contractName: string;
    migrationId: string;
};
export interface OwnershipTransferredEventLog extends EventLog<OwnershipTransferredEvent, "OwnershipTransferred"> {
}
export interface TransferEventLog extends EventLog<TransferEvent, "Transfer"> {
}
export interface ApprovalEventLog extends EventLog<ApprovalEvent, "Approval"> {
}
export interface ApprovalForAllEventLog extends EventLog<ApprovalForAllEvent, "ApprovalForAll"> {
}
export interface CreateSectorEventLog extends EventLog<CreateSectorEvent, "CreateSector"> {
}
export interface AddLandEventLog extends EventLog<AddLandEvent, "AddLand"> {
}
export interface RemoveLandEventLog extends EventLog<RemoveLandEvent, "RemoveLand"> {
}
export interface UpdateEventLog extends EventLog<UpdateEvent, "Update"> {
}
export interface UpdateOperatorEventLog extends EventLog<UpdateOperatorEvent, "UpdateOperator"> {
}
export interface UpdateManagerEventLog extends EventLog<UpdateManagerEvent, "UpdateManager"> {
}
export interface SetSPACERegistryEventLog extends EventLog<SetSPACERegistryEvent, "SetSPACERegistry"> {
}
export interface MigratedEventLog extends EventLog<MigratedEvent, "Migrated"> {
}
interface SectorRegistryEvents {
    OwnershipTransferred: EventSubscriptionFactory<OwnershipTransferredEventLog>;
    Transfer: EventSubscriptionFactory<TransferEventLog>;
    Approval: EventSubscriptionFactory<ApprovalEventLog>;
    ApprovalForAll: EventSubscriptionFactory<ApprovalForAllEventLog>;
    CreateSector: EventSubscriptionFactory<CreateSectorEventLog>;
    AddLand: EventSubscriptionFactory<AddLandEventLog>;
    RemoveLand: EventSubscriptionFactory<RemoveLandEventLog>;
    Update: EventSubscriptionFactory<UpdateEventLog>;
    UpdateOperator: EventSubscriptionFactory<UpdateOperatorEventLog>;
    UpdateManager: EventSubscriptionFactory<UpdateManagerEventLog>;
    SetSPACERegistry: EventSubscriptionFactory<SetSPACERegistryEventLog>;
    Migrated: EventSubscriptionFactory<MigratedEventLog>;
}
interface SectorRegistryEventLogs {
    OwnershipTransferred: OwnershipTransferredEventLog;
    Transfer: TransferEventLog;
    Approval: ApprovalEventLog;
    ApprovalForAll: ApprovalForAllEventLog;
    CreateSector: CreateSectorEventLog;
    AddLand: AddLandEventLog;
    RemoveLand: RemoveLandEventLog;
    Update: UpdateEventLog;
    UpdateOperator: UpdateOperatorEventLog;
    UpdateManager: UpdateManagerEventLog;
    SetSPACERegistry: SetSPACERegistryEventLog;
    Migrated: MigratedEventLog;
}
interface SectorRegistryTxEventLogs {
    OwnershipTransferred: OwnershipTransferredEventLog[];
    Transfer: TransferEventLog[];
    Approval: ApprovalEventLog[];
    ApprovalForAll: ApprovalForAllEventLog[];
    CreateSector: CreateSectorEventLog[];
    AddLand: AddLandEventLog[];
    RemoveLand: RemoveLandEventLog[];
    Update: UpdateEventLog[];
    UpdateOperator: UpdateOperatorEventLog[];
    UpdateManager: UpdateManagerEventLog[];
    SetSPACERegistry: SetSPACERegistryEventLog[];
    Migrated: MigratedEventLog[];
}
export interface SectorRegistryTransactionReceipt extends TransactionReceipt<SectorRegistryTxEventLogs> {
}
interface SectorRegistryMethods {
    supportsInterface(_interfaceId: string): TxCall<boolean>;
    name(): TxCall<string>;
    initialize(_name: string, _symbol: string, _registry: Address): TxSend<SectorRegistryTransactionReceipt>;
    updateManager(a0: Address, a1: Address): TxCall<boolean>;
    getApproved(_tokenId: number | string | BN): TxCall<Address>;
    approve(_to: Address, _tokenId: number | string | BN): TxSend<SectorRegistryTransactionReceipt>;
    landIdSector(a0: number | string | BN): TxCall<string>;
    onERC721Received(_operator: Address, _from: Address, _tokenId: number | string | BN, _data: string): TxSend<SectorRegistryTransactionReceipt>;
    getFingerprint(estateId: number | string | BN): TxCall<string>;
    totalSupply(): TxCall<string>;
    setLandUpdateOperator(estateId: number | string | BN, landId: number | string | BN, operator: Address): TxSend<SectorRegistryTransactionReceipt>;
    transferFrom(_from: Address, _to: Address, _tokenId: number | string | BN): TxSend<SectorRegistryTransactionReceipt>;
    updateLandData(estateId: number | string | BN, landId: number | string | BN, data: string): TxSend<SectorRegistryTransactionReceipt>;
    tokenOfOwnerByIndex(_owner: Address, _index: number | string | BN): TxCall<string>;
    estateLandIds(a0: number | string | BN, a1: number | string | BN): TxCall<string>;
    setManyLandUpdateOperator(_estateId: number | string | BN, _landIds: (number | string | BN)[], _operator: Address): TxSend<SectorRegistryTransactionReceipt>;
    transferManyLands(estateId: number | string | BN, landIds: (number | string | BN)[], destinatary: Address): TxSend<SectorRegistryTransactionReceipt>;
    updateManyLandData(estateId: number | string | BN, landIds: (number | string | BN)[], data: string): TxSend<SectorRegistryTransactionReceipt>;
    safeTransferFrom(_from: Address, _to: Address, _tokenId: number | string | BN): TxSend<SectorRegistryTransactionReceipt>;
    initialize(_name: string, _symbol: string): TxSend<SectorRegistryTransactionReceipt>;
    exists(_tokenId: number | string | BN): TxCall<boolean>;
    tokenByIndex(_index: number | string | BN): TxCall<string>;
    setSPACERegistry(_registry: Address): TxSend<SectorRegistryTransactionReceipt>;
    updateMetadata(estateId: number | string | BN, metadata: string): TxSend<SectorRegistryTransactionReceipt>;
    ping(): TxSend<SectorRegistryTransactionReceipt>;
    ownerOf(_tokenId: number | string | BN): TxCall<Address>;
    isUpdateAuthorized(operator: Address, estateId: number | string | BN): TxCall<boolean>;
    balanceOf(_owner: Address): TxCall<string>;
    setManyUpdateOperator(_estateIds: (number | string | BN)[], _operator: Address): TxSend<SectorRegistryTransactionReceipt>;
    safeTransferManyFrom(from: Address, to: Address, estateIds: (number | string | BN)[]): TxSend<SectorRegistryTransactionReceipt>;
    registry(): TxCall<Address>;
    initialize(): TxSend<SectorRegistryTransactionReceipt>;
    owner(): TxCall<Address>;
    verifyFingerprint(estateId: number | string | BN, fingerprint: string): TxCall<boolean>;
    symbol(): TxCall<string>;
    updateOperator(a0: number | string | BN): TxCall<Address>;
    estateLandIndex(a0: number | string | BN, a1: number | string | BN): TxCall<string>;
    setApprovalForAll(_to: Address, _approved: boolean): TxSend<SectorRegistryTransactionReceipt>;
    transferLand(estateId: number | string | BN, landId: number | string | BN, destinatary: Address): TxSend<SectorRegistryTransactionReceipt>;
    getMetadata(estateId: number | string | BN): TxCall<string>;
    setUpdateOperator(estateId: number | string | BN, operator: Address): TxSend<SectorRegistryTransactionReceipt>;
    safeTransferFrom(_from: Address, _to: Address, _tokenId: number | string | BN, _data: string): TxSend<SectorRegistryTransactionReceipt>;
    getLandSectorId(landId: number | string | BN): TxCall<string>;
    isMigrated(contractName: string, migrationId: string): TxCall<boolean>;
    initialize(_sender: Address): TxSend<SectorRegistryTransactionReceipt>;
    tokenURI(_tokenId: number | string | BN): TxCall<string>;
    mint(to: Address, metadata: string): TxSend<SectorRegistryTransactionReceipt>;
    safeTransferManyFrom(from: Address, to: Address, estateIds: (number | string | BN)[], data: string): TxSend<SectorRegistryTransactionReceipt>;
    isApprovedForAll(_owner: Address, _operator: Address): TxCall<boolean>;
    setUpdateManager(_owner: Address, _operator: Address, _approved: boolean): TxSend<SectorRegistryTransactionReceipt>;
    transferOwnership(newOwner: Address): TxSend<SectorRegistryTransactionReceipt>;
    getSectorSize(estateId: number | string | BN): TxCall<string>;
}
export interface SectorRegistryDefinition {
    methods: SectorRegistryMethods;
    events: SectorRegistryEvents;
    eventLogs: SectorRegistryEventLogs;
}
export class SectorRegistry extends Contract<SectorRegistryDefinition> {
    constructor(eth: Eth, address?: Address, options?: ContractOptions) {
        super(eth, abi, address, options);
    }
}
export var SectorRegistryAbi = abi;
