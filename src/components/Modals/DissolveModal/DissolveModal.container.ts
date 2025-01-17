import { connect } from 'react-redux'
import { RootState } from 'modules/common/types'
import { MapStateProps, MapDispatchProps, MapDispatch } from './DissolveModal.types'
import DissolveModal from './DissolveModal'
import { dissolveSectorRequest } from 'modules/land/actions'

const mapState = (_state: RootState): MapStateProps => ({})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onDissolve: land => dispatch(dissolveSectorRequest(land))
})

export default connect(mapState, mapDispatch)(DissolveModal)
