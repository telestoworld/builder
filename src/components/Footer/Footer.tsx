import * as React from 'react'
import { FooterProps } from 'telestoworld-ui'
import { Footer as DappsFooter } from 'telestoworld-dapps/dist/containers'

import { locales } from 'modules/translation/utils'

export default class Footer extends React.PureComponent<FooterProps> {
  render() {
    return <DappsFooter locales={locales} {...this.props} />
  }
}
