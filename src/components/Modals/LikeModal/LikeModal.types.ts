import { ModalProps } from 'telestoworld-dapps/dist/providers/ModalProvider/ModalProvider.types'

export type Props = ModalProps & {
  isLoggedIn: boolean
}

export type MapStateProps = Pick<Props, 'isLoggedIn'>
export type MapDispatchProps = {}
