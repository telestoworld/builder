import * as React from 'react'

import { Button } from 'telestoworld-ui'
import { t } from 'telestoworld-dapps/dist/modules/translation/utils'

import { ShareModalMetadata, ShareModalType } from 'components/Modals/ShareModal/ShareModal.types'

import { Props, DefaultProps } from './ShareButton.types'
import './ShareButton.css'

export default class ShareButton extends React.PureComponent<Props> {
  static defaultProps: DefaultProps = {
    onClick: () => {
      /* noop */
    }
  }

  handleClick = () => {
    const { project, onOpenModal } = this.props

    onOpenModal('ShareModal', {
      type: ShareModalType.PROJECT,
      id: project.id
    } as ShareModalMetadata)
  }

  render() {
    const { isLoading } = this.props

    return (
      <span className="ShareButton tool">
        <span>
          <Button size="mini" onClick={this.handleClick} disabled={isLoading}>
            {t('global.share')}
          </Button>
        </span>
      </span>
    )
  }
}
