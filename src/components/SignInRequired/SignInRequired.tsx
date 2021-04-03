import * as React from 'react'
import { Center } from 'telestoworld-ui'
import { t, T } from 'telestoworld-dapps/dist/modules/translation/utils'
import { Link } from 'react-router-dom'

import { locations } from 'routing/locations'
import './SignInRequired.css'

export default class SignInRequired extends React.PureComponent {
  render() {
    return (
      <Center className="SignInRequired">
        <div className="secondary-text">
          <T id="global.sign_in_required" values={{ link: <Link to={locations.signIn()}>{t('global.sign_in')}</Link> }} />
        </div>
      </Center>
    )
  }
}
