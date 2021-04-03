import * as React from 'react'
import { Center } from 'telestoworld-ui'
import { t } from 'telestoworld-dapps/dist/modules/translation/utils'

export default class NotFound extends React.PureComponent {
  render() {
    return (
      <Center>
        <span className="secondary-text">{t('global.not_found')}&hellip;</span>
      </Center>
    )
  }
}
