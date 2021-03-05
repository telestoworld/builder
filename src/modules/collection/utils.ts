import { env, utils } from 'decentraland-commons'
import { Address } from 'web3x-es/address'
import { toBN } from 'web3x-es/utils'
import { Item } from 'modules/item/types'
import { COLLECTION_STORE_ADDRESS } from 'modules/common/contracts'
import { getMetadata } from 'modules/item/utils'
import { InitializeItem, Collection, Access } from './types'

export function setOnSale(collection: Collection, isOnSale: boolean): Access[] {
  return [{ address: COLLECTION_STORE_ADDRESS, hasAccess: isOnSale, collection }]
}

export function isOnSale(collection: Collection) {
  return collection.minters.includes(COLLECTION_STORE_ADDRESS)
}

export function getCollectionBaseURI() {
  return env.get('REACT_APP_ERC721_COLLECTION_BASE_URI', '')
}

export function getCollectionSymbol(collection: Collection) {
  const vowelLessName = collection.name.replace(/a|e|i|o|u|\s/g, '')
  return 'DCL-' + vowelLessName.toUpperCase()
}

// TODO: check getRarityIndex
export function toInitializeItem(item: Item): InitializeItem {
  return {
    rarity: item.rarity!.toLowerCase(),
    price: toBN(item.price!),
    beneficiary: Address.fromString(item.beneficiary!),
    metadata: getMetadata(item)
  }
}

export function toCollectionObject(collections: Collection[]) {
  return collections.reduce((obj, collection) => {
    obj[collection.id] = utils.omit<Collection>(collection, ['items'])
    return obj
  }, {} as Record<string, Collection>)
}
