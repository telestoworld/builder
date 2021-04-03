import * as React from 'react'
import { t } from 'telestoworld-dapps/dist/modules/translation/utils'
import { Popup } from 'telestoworld-ui'

import { Props } from './CollectionBadge.types'
import './CollectionBadge.css'

export default class CollectionBadge extends React.PureComponent<Props> {
  render() {
    const { collection } = this.props
    return collection.isPublished ? (
      <Popup
        position="top center"
        content={t('global.published')}
        trigger={<div className="CollectionBadge" title="published" />}
        hideOnScroll={true}
        on="hover"
        inverted
        basic
      />
    ) : null
  }
}
