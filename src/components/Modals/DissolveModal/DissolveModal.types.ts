import { ModalProps } from 'telestoworld-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Land } from 'modules/land/types'
import { Dispatch } from 'redux'
import { dissolveSectorRequest, DissolveSectorRequestAction } from 'modules/land/actions'

export type Props = ModalProps & {
  metadata: DissolveModalMetadata
  onDissolve: typeof dissolveSectorRequest
}

export type DissolveModalMetadata = {
  land: Land
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onDissolve'>
export type MapDispatch = Dispatch<DissolveSectorRequestAction>
