import * as React from 'react'
import { Row, Column, Section, Narrow, InputOnChangeData, Header, Form, Field, Button, Mana, Radio, Popup } from 'telestoworld-ui'
import { T, t } from 'telestoworld-dapps/dist/modules/translation/utils'
import { getTokenAmountToApprove } from 'telestoworld-dapps/dist/modules/authorization/utils'
import { TransactionLink } from 'telestoworld-dapps/dist/containers'
import Back from 'components/Back'
import LoggedInDetailPage from 'components/LoggedInDetailPage'
import { locations } from 'routing/locations'
import { MAX_NAME_SIZE, PRICE, isNameValid, isNameAvailable, hasNameMinLength, isEnoughClaimTelo } from 'modules/ens/utils'
import { CONTROLLER_ADDRESS } from 'modules/common/contracts'
import { Props, State } from './ClaimENSPage.types'

import './ClaimENSPage.css'

export default class ClaimENSPage extends React.PureComponent<Props, State> {
  state: State = {
    name: '',
    isLoading: false,
    isAvailable: true,
    isError: false
  }

  handleTeloApprove = async () => {
    const { allowance, onAllowTelo } = this.props
    const manaToAllow = isEnoughClaimTelo(allowance) ? 0 : getTokenAmountToApprove()
    onAllowTelo(manaToAllow.toString())
  }

  handleClaim = async () => {
    const { wallet, telo, allowance, onOpenModal } = this.props
    const { name } = this.state

    const isValid = isNameValid(name)
    const isEnoughTelo = wallet && isEnoughClaimTelo(telo.toString())
    const isTeloAllowed = isEnoughClaimTelo(allowance)

    if (!isValid || !isEnoughTelo || !isTeloAllowed) return

    this.setState({ isLoading: true })
    try {
      const isAvailable = await isNameAvailable(name)
      if (isAvailable) {
        onOpenModal('ClaimNameFatFingerModal', { originalName: name })
        this.setState({ isLoading: false })
      } else {
        this.setState({ isAvailable: false, isLoading: false })
      }
    } catch (error) {
      this.setState({ isLoading: false, isAvailable: true, isError: true })
    }
  }

  handleNameChange = (_event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    const { isAvailable } = this.state
    if (data.value.length <= MAX_NAME_SIZE) {
      if (!isAvailable) {
        this.setState({ name: data.value, isAvailable: true, isError: false })
      } else {
        this.setState({ name: data.value, isError: false })
      }
    }
  }

  handleBack = () => {
    this.props.onNavigate(locations.root())
  }

  handleAction = () => {
    /* noop */
  }

  render() {
    const { wallet, telo, allowance, onBack } = this.props
    const { name, isError, isAvailable } = this.state

    const isLoading = this.props.isLoading || this.state.isLoading

    const isValid = isNameValid(name)
    const isEnoughTelo = wallet && isEnoughClaimTelo(telo.toString())
    const isTeloAllowed = isEnoughClaimTelo(allowance)

    const isDisabled = !isValid || !isAvailable || !isEnoughTelo || !isTeloAllowed

    let message: string = ''
    if (isError) {
      message = t('claim_ens_page.error_message')
    } else if (!isAvailable) {
      message = t('claim_ens_page.repeated_message')
    } else if (name.length <= 2) {
      message = ''
    } else if (!isValid) {
      message = t('claim_ens_page.name_message')
    }

    return (
      <LoggedInDetailPage className="ClaimENSPage" hasNavigation={false}>
        <Row height={48}>
          <Back absolute onClick={this.handleBack} />
        </Row>
        <Narrow>
          <Row className="main">
            <Column>
              <div className="avatar-friends"></div>
            </Column>
            <Column className="content">
              <Section>
                <Header className="title" size="large">
                  {t('claim_ens_page.title')}
                </Header>
                <span className="subtitle">
                  <T
                    id="claim_ens_page.subtitle"
                    values={{
                      exampleLink: <i>https://name.tw.eth.link</i>,
                      br: (
                        <>
                          <br />
                          <br />
                        </>
                      ),
                      twWorldLink: (
                        <a href="http://play.telesto.world" rel="noopener noreferrer" target="_blank">
                          {t('claim_ens_page.world')}
                        </a>
                      )
                    }}
                  />
                </span>
              </Section>
              <Form onSubmit={this.handleClaim}>
                <Section className={name.length === MAX_NAME_SIZE ? 'red' : ''}>
                  <Field
                    label={t('claim_ens_page.name_label')}
                    value={name}
                    message={message}
                    placeholder={t('claim_ens_page.name_placeholder')}
                    action={`${name.length}/${MAX_NAME_SIZE}`}
                    error={isError || (hasNameMinLength(name) && !isValid) || !isAvailable}
                    onChange={this.handleNameChange}
                    onAction={this.handleAction}
                  />
                </Section>
                <Section className="field">
                  <Header sub={true}>MANA Approved</Header>
                  <Radio toggle disabled={isLoading} checked={isTeloAllowed} onChange={this.handleTeloApprove} />
                  <p className="message">
                    <T
                      id="claim_ens_page.need_mana_message"
                      values={{
                        contract_link: (
                          <TransactionLink address={CONTROLLER_ADDRESS} txHash="">
                            TWController
                          </TransactionLink>
                        )
                      }}
                    />
                  </p>
                </Section>
                <Row className="actions">
                  <Button className="cancel" onClick={onBack} type="button">
                    {t('global.cancel')}
                  </Button>
                  {!isLoading && (!isEnoughTelo || !isTeloAllowed) ? (
                    <Popup
                      className="modal-tooltip"
                      content={
                        !isEnoughTelo ? t('claim_ens_page.not_enough_mana') : !isTeloAllowed ? t('claim_ens_page.mana_not_allowed') : ''
                      }
                      position="top center"
                      trigger={
                        <div className="popup-button">
                          <Button type="submit" primary disabled={isDisabled} loading={isLoading}>
                            {t('claim_ens_page.claim_button')} <Mana>{PRICE.toLocaleString()}</Mana>
                          </Button>
                        </div>
                      }
                      hideOnScroll={true}
                      on="hover"
                      inverted
                    />
                  ) : (
                    <Button type="submit" primary disabled={isDisabled} loading={isLoading}>
                      {t('claim_ens_page.claim_button')} <Mana>{PRICE.toLocaleString()}</Mana>
                    </Button>
                  )}
                </Row>
              </Form>
            </Column>
          </Row>
        </Narrow>
      </LoggedInDetailPage>
    )
  }
}
