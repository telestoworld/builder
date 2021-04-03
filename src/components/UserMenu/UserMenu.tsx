import React from 'react'
import { UserMenu as BaseUserMenu } from 'telestoworld-dapps/dist/containers'

export default class UserMenu extends React.PureComponent {
  render() {
    return <BaseUserMenu {...this.props} />
  }
}
