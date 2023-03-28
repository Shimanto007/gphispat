import {configureStore} from "@reduxjs/toolkit";

import homeReducer from '../redux/home'
import backgroundReducer from '../redux/about/background'
import directorsReducer from '../redux/about/directors'
import missionReducer from '../redux/about/mission-vission-values'
import corporateinfoReducer from '../redux/about/corporate-info'
import directorscommitteReducer from '../redux/about/directors-committe'
import sisterconcernReducer from '../redux/about/sister-concern'
import researchdevelopmentReducer from '../redux/about/research-and-development'
import globalreachReducer from '../redux/about/global-reach'
import smartFutureReducer from '../redux/smarterFuture/smarterFuture'
import smartOpportunityReducer from '../redux/smarterFuture/opportunity-of-smart'
import gphsustainabilityReducer from '../redux/sustainability/gphSustainability'
import governancesustainabilityReducer from '../redux/sustainability/ourGovernance'
import performancesustainabilityReducer from '../redux/sustainability/ourPerformance'
import stakeholderReducer from '../redux/sustainability/ourStakeholders'
import materialReducer from '../redux/sustainability/ourMaterial'
import economicSustainabilityReducer from '../redux/sustainability/economicSustainability'
import environmentalSustainabilityReducer from '../redux/sustainability/environmentalSustainability'
import socialSustainabilityReducer from '../redux/sustainability/socialSustainability'
import energyReducer from '../redux/smarterFuture/energy-consumption'
import whygphReducer from '../redux/career/why-gph'
import hrpolicyReducer from '../redux/career/hr-policy'
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {combineReducers} from "@reduxjs/toolkit";
import eafReducer from '../redux/product/eaf'
import serviceReducer from '../redux/product/service'
import qualityServiceReducer from '../redux/product/quality-service'
import contactReducer from '../redux/contact'
import careerReducer from '../redux/career/index'
import careerDetailReducer from '../redux/career/detail'
import searchReducer from '../redux/search'
import productReducer from '../redux/product/product'
import newsEventsReducer from '../redux/mediaEvents/newsEvents'
import newsEventsDetailReducer from '../redux/mediaEvents/newsEvents/detail'
import pressReleaseReducer from '../redux/mediaEvents/pressRelease'
import pressReleaseDetailReducer from '../redux/mediaEvents/pressRelease/detail'
import orderReducer from '../redux/product/order'
import investorReducer from '../redux/investor-matters/index'
import brochureReducer from '../redux/mediaEvents/gphBrochure'
import tvcReducer from '../redux/mediaEvents/tvc/index'
import managementReducer from '../redux/about/management-team'
import advisoryPanelReducer from '../redux/about/advisory-panel'
import leafletReducer from '../redux/mediaEvents/leaflet/index'
import applyDataReducer from '../redux/mediaEvents/leaflet/index'
import menuReducer from '../redux/menu/index'

import economicSustainability from "../redux/sustainability/economicSustainability";
import termsConditionsReducer from '../redux/terms-of-use/terms-of-use'
import privacyPolicyReducer from '../redux/privacy-policy/index'


// this is to set a flag for initial server renders
export const SET_IS_SERVER = 'SET_IS_SERVER'

function serverCheck(state = {isServer: false}, action) {
    const {type} = action
    switch (type) {
        case SET_IS_SERVER: {
            return {...state, isServer: true}
        }
        default:
            return state
    }
}


// combined all reducers
const combinedReducer = combineReducers({
    serverCheck,
    homeReducer,
    backgroundReducer,
    smartOpportunityReducer,
    energyReducer,
    gphsustainabilityReducer,
    governancesustainabilityReducer,
    performancesustainabilityReducer,
    stakeholderReducer,
    materialReducer,
    economicSustainabilityReducer,
    environmentalSustainabilityReducer,
    socialSustainabilityReducer,
    contactReducer,
    directorsReducer,
    missionReducer,
    corporateinfoReducer,
    directorscommitteReducer,
    sisterconcernReducer,
    researchdevelopmentReducer,
    globalreachReducer,
    whygphReducer,
    hrpolicyReducer,
    economicSustainability,
    careerReducer,
    careerDetailReducer,
    smartFutureReducer,
    eafReducer,
    serviceReducer,
    qualityServiceReducer,
    searchReducer,
    productReducer,
    pressReleaseReducer,
    newsEventsReducer,
    orderReducer,
    newsEventsDetailReducer,
    pressReleaseDetailReducer,
    tvcReducer,
    brochureReducer,
    investorReducer,
    managementReducer,
    advisoryPanelReducer,
    leafletReducer,
    menuReducer,
    termsConditionsReducer,
    privacyPolicyReducer
})


// master reducer
const masterReducer = (state, actions) => {
    if (actions.type === HYDRATE) {
        return {...state, ...actions.payload}
    } else {
        return combinedReducer(state, actions)
    }
}


// main store
export const store = () => configureStore({
    reducer: masterReducer
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export const wrapper = createWrapper(store) //,{debug: true} -- if need debug

