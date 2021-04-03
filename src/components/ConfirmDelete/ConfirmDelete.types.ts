import React from 'react'
import { StrictConfirmProps } from 'telestoworld-ui'

export type Props = {
  name: string
  trigger: React.ReactElement<any>
  size?: StrictConfirmProps['size']
  onDelete: () => void
}

export type State = {
  isOpen: boolean
}
