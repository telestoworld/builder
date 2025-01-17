import { action } from 'typesafe-actions'
import { LandPageView } from './types'

export const SET_SPACE_PAGE_VIEW = 'Set land page view'
export const setLandPageView = (view: LandPageView) => action(SET_SPACE_PAGE_VIEW, { view })
export type SetLandPageViewAction = ReturnType<typeof setLandPageView>
