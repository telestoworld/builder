import { action } from 'typesafe-actions'
import { Placement, Deployment } from 'modules/deployment/types'
import { ProgressStage } from './types'
import { PoolDeploymentAdditionalFields } from 'lib/api/builder'

// Deploy to SPACE pool
export const DEPLOY_TO_POOL_REQUEST = '[Request] Deploy to SPACE pool'
export const DEPLOY_TO_POOL_SUCCESS = '[Success] Deploy to SPACE pool'
export const DEPLOY_TO_POOL_FAILURE = '[Failure] Deploy to SPACE pool'

export const deployToPoolRequest = (projectId: string, additionalInfo: PoolDeploymentAdditionalFields | null = null) =>
  action(DEPLOY_TO_POOL_REQUEST, { projectId, additionalInfo })
export const deployToPoolSuccess = (images: string) => action(DEPLOY_TO_POOL_SUCCESS, { images })
export const deployToPoolFailure = (error: string) => action(DEPLOY_TO_POOL_FAILURE, { error })

export type DeployToPoolRequestAction = ReturnType<typeof deployToPoolRequest>
export type DeployToPoolSuccessAction = ReturnType<typeof deployToPoolSuccess>
export type DeployToPoolFailureAction = ReturnType<typeof deployToPoolFailure>

// Deploy to SPACE

export const DEPLOY_TO_SPACE_REQUEST = '[Request] Deploy to SPACE'
export const DEPLOY_TO_SPACE_SUCCESS = '[Success] Deploy to SPACE'
export const DEPLOY_TO_SPACE_FAILURE = '[Failure] Deploy to SPACE'

export const deployToLandRequest = (projectId: string, placement: Placement, overrideDeploymentId?: string) =>
  action(DEPLOY_TO_SPACE_REQUEST, { projectId, placement, overrideDeploymentId })
export const deployToLandSuccess = (deployment: Deployment, overrideDeploymentId?: string) =>
  action(DEPLOY_TO_SPACE_SUCCESS, { deployment, overrideDeploymentId })
export const deployToLandFailure = (error: string) => action(DEPLOY_TO_SPACE_FAILURE, { error })

export type DeployToLandRequestAction = ReturnType<typeof deployToLandRequest>
export type DeployToLandSuccessAction = ReturnType<typeof deployToLandSuccess>
export type DeployToLandFailureAction = ReturnType<typeof deployToLandFailure>

// Clear SPACE deployment

export const CLEAR_DEPLOYMENT_REQUEST = '[Request] Clear Deployment'
export const CLEAR_DEPLOYMENT_SUCCESS = '[Success] Clear Deployment'
export const CLEAR_DEPLOYMENT_FAILURE = '[Failure] Clear Deployment'

export const clearDeploymentRequest = (deploymentId: string) => action(CLEAR_DEPLOYMENT_REQUEST, { deploymentId })
export const clearDeploymentSuccess = (deploymentId: string) => action(CLEAR_DEPLOYMENT_SUCCESS, { deploymentId })
export const clearDeploymentFailure = (deploymentId: string, error: string) => action(CLEAR_DEPLOYMENT_FAILURE, { deploymentId, error })

export type ClearDeploymentRequestAction = ReturnType<typeof clearDeploymentRequest>
export type ClearDeploymentSuccessAction = ReturnType<typeof clearDeploymentSuccess>
export type ClearDeploymentFailureAction = ReturnType<typeof clearDeploymentFailure>

// Set progress

export const SET_PROGRESS = 'Set Deployment progress'
export const setProgress = (stage: ProgressStage, value: number) => action(SET_PROGRESS, { stage, value })
export type SetProgressAction = ReturnType<typeof setProgress>

// Fetch deployments
export const FETCH_DEPLOYMENTS_REQUEST = '[Request] Fetch deployments'
export const FETCH_DEPLOYMENTS_SUCCESS = '[Success] Fetch deployments'
export const FETCH_DEPLOYMENTS_FAILURE = '[Failure] Fetch deployments'

export const fetchDeploymentsRequest = (coords: string[]) => action(FETCH_DEPLOYMENTS_REQUEST, { coords })
export const fetchDeploymentsSuccess = (coords: string[], deployments: Deployment[]) =>
  action(FETCH_DEPLOYMENTS_SUCCESS, { coords, deployments })
export const fetchDeploymentsFailure = (coords: string[], error: string) => action(FETCH_DEPLOYMENTS_FAILURE, { coords, error })

export type FetchDeploymentsRequestAction = ReturnType<typeof fetchDeploymentsRequest>
export type FetchDeploymentsSuccessAction = ReturnType<typeof fetchDeploymentsSuccess>
export type FetchDeploymentsFailureAction = ReturnType<typeof fetchDeploymentsFailure>
