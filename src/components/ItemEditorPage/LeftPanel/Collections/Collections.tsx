import * as React from 'react'
import { Header, Section } from 'telestoworld-ui'
import { t } from 'telestoworld-dapps/dist/modules/translation/utils'
import SidebarCollection from './SidebarCollection'
import { Props } from './Collections.types'
import './Collections.css'

export default class Collections extends React.PureComponent<Props> {
  render() {
    const { collections, items, selectedCollectionId, hasHeader, onSetCollection } = this.props
    if (collections.length === 0) return null

    return (
      <Section className="Collections">
        {hasHeader ? <Header sub>{t('item_editor.left_panel.collections')}</Header> : null}
        {collections.map(collection => (
          <SidebarCollection
            key={collection.id}
            collection={collection}
            items={items}
            isSelected={collection.id === selectedCollectionId}
            onSetCollection={onSetCollection}
          />
        ))}
      </Section>
    )
  }
}
