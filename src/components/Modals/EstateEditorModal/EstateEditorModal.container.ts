import { connect } from 'react-redux'
import { RootState } from 'modules/common/types'
import { MapStateProps, MapDispatchProps, OwnProps, MapDispatch } from './SectorEditorModal.types'
import SectorEditorModal from './SectorEditorModal'
import { getLandTiles } from 'modules/land/selectors'
import { createSectorRequest, editSectorRequest } from 'modules/land/actions'

const mapState = (state: RootState, _ownProps: OwnProps): MapStateProps => ({
  landTiles: getLandTiles(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onCreateSector: (name, description, coords) => dispatch(createSectorRequest(name, description, coords)),
  onEditSector: (land, toAdd, toRemove) => dispatch(editSectorRequest(land, toAdd, toRemove))
})

export default connect(mapState, mapDispatch)(SectorEditorModal)
