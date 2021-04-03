import * as React from 'react'
import { ProfileProps } from 'telestoworld-ui'
import { Profile as BaseProfile } from 'telestoworld-dapps/dist/containers'
import { isEqual } from 'lib/address'
import { SPACE_POOL_ADDRESS } from 'modules/land/utils'

export default class Profile extends React.PureComponent<ProfileProps> {
  render() {
    const newProps = { ...this.props }
    if (isEqual(newProps.address, SPACE_POOL_ADDRESS)) {
      newProps.isDecentraland = true
    }

    return <BaseProfile {...newProps} />
  }
}
