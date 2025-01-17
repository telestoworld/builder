import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { translationReducer as translation } from 'telestoworld-dapps/dist/modules/translation/reducer'
import { storageReducer as storage, storageReducerWrapper } from 'telestoworld-dapps/dist/modules/storage/reducer'
import { transactionReducer as transaction } from 'telestoworld-dapps/dist/modules/transaction/reducer'
import { walletReducer as wallet } from 'telestoworld-dapps/dist/modules/wallet/reducer'
import { modalReducer as modal } from 'telestoworld-dapps/dist/modules/modal/reducer'
import { profileReducer as profile } from 'telestoworld-dapps/dist/modules/profile/reducer'
import { authorizationReducer as authorization } from 'telestoworld-dapps/dist/modules/authorization/reducer'

import { RootState } from 'modules/common/types'
import { assetPackReducer as assetPack } from 'modules/assetPack/reducer'
import { editorReducer as editor } from 'modules/editor/reducer'
import { assetReducer as asset } from 'modules/asset/reducer'
import { uiReducer as ui } from 'modules/ui/reducer'
import { projectReducer as project } from 'modules/project/reducer'
import { poolGroupReducer as poolGroup } from 'modules/poolGroup/reducer'
import { poolReducer as pool } from 'modules/pool/reducer'
import { sceneReducer as scene } from 'modules/scene/reducer'
import { deploymentReducer as deployment } from 'modules/deployment/reducer'
import { mediaReducer as media } from 'modules/media/reducer'
import { syncReducer as sync } from 'modules/sync/reducer'
import { identityReducer as identity } from 'modules/identity/reducer'
import { landReducer as land } from 'modules/land/reducer'
import { ensReducer as ens } from 'modules/ens/reducer'
import { tileReducer as tile } from 'modules/tile/reducer'
import { committeeReducer as committee } from 'modules/committee/reducer'
import { collectionReducer as collection } from 'modules/collection/reducer'
import { itemReducer as item } from 'modules/item/reducer'
import { locationReducer as location } from 'modules/location/reducer'
import { statsReducer as stats } from 'modules/stats/reducer'

export function createRootReducer(history: History) {
  return storageReducerWrapper(
    combineReducers<RootState>({
      storage,
      editor,
      translation,
      transaction,
      wallet,
      authorization,
      modal,
      assetPack,
      asset,
      ui,
      project,
      poolGroup,
      pool,
      profile,
      scene,
      deployment,
      media,
      sync,
      identity,
      land,
      ens,
      tile,
      committee,
      collection,
      item,
      location,
      stats,
      router: connectRouter(history)
    })
  )
}
