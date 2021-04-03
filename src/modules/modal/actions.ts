import { getModalActions } from 'telestoworld-dapps/dist/modules/modal/actions'
import { ModalName } from './types'

const { openModal, closeModal, toggleModal } = getModalActions<ModalName>()

export * from 'telestoworld-dapps/dist/modules/modal/actions'
export { openModal, closeModal, toggleModal }
