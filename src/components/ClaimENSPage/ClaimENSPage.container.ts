import { connect } from 'react-redux'
import { push, goBack } from 'connected-react-router'
import { getData as getWallet, getTelo } from 'telestoworld-dapps/dist/modules/wallet/selectors'
import { isLoadingType } from 'telestoworld-dapps/dist/modules/loading/selectors'
import { RootState } from 'modules/common/types'
import { openModal } from 'modules/modal/actions'
import { allowClaimManaRequest, claimNameRequest, ALLOW_CLAIM_TELO_REQUEST } from 'modules/ens/actions'
import { getLoading, isWaitingTxAllowTelo, getAuthorizationByWallet } from 'modules/ens/selectors'
import { MapStateProps, MapDispatchProps, MapDispatch } from './ClaimENSPage.types'
import ClaimENSPage from './ClaimENSPage'

const mapState = (state: RootState): MapStateProps => {
  const authorization = getAuthorizationByWallet(state)

  return {
    wallet: getWallet(state),
    mana: getTelo(state)!,
    allowance: authorization ? authorization.allowance : '0',
    isLoading: !authorization || isLoadingType(getLoading(state), ALLOW_CLAIM_TELO_REQUEST) || isWaitingTxAllowTelo(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onOpenModal: (name, metadata) => dispatch(openModal(name, metadata)),
  onAllowTelo: allowance => dispatch(allowClaimManaRequest(allowance)),
  onClaim: name => dispatch(claimNameRequest(name)),
  onNavigate: path => dispatch(push(path)),
  onBack: () => dispatch(goBack())
})

export default connect(mapState, mapDispatch)(ClaimENSPage)
