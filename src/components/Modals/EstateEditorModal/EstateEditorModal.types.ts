import { Dispatch } from 'redux'
import { Coord } from 'telestoworld-ui'
import { ModalProps } from 'telestoworld-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Land, LandTile } from 'modules/land/types'
import { createSectorRequest, editSectorRequest, CreateSectorRequestAction, EditSectorRequestAction } from 'modules/land/actions'

export type Props = ModalProps & {
  landTiles: Record<string, LandTile>
  metadata: SectorEditorModalMetadata
  onCreateSector: typeof createSectorRequest
  onEditSector: typeof editSectorRequest
}

export type State = {
  selection: Coord[]
  name: string
  description: string
  showCreationForm: boolean
}

export type SectorEditorModalMetadata = {
  land: Land
}

export type MapStateProps = Pick<Props, 'landTiles'>
export type MapDispatchProps = Pick<Props, 'onCreateSector' | 'onEditSector'>
export type MapDispatch = Dispatch<CreateSectorRequestAction | EditSectorRequestAction>
export type OwnProps = {}
