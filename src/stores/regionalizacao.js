import Vapi from 'vuex-rest-api'
import { baseUrls } from '@/configs'
import { http } from '@/utils'

export default new Vapi({
    axios: http,
    baseURL: baseUrls.regionalizacao,
    state: {
        yearPointsRegiao: {},
        yearInfoRegiao: {}
    }
}).get({
    action: 'getYearPointsRegiao',
    property: 'yearPointsRegiao',
    path: ({ year }) => `/dadosRegionalizados/${year}`,
    onSuccess: (state, payload, axios) => {
        if (!state.yearPointsRegiao.features ||
            (payload.data.FeatureCollection[0].properties.uid !==
            state.yearPointsRegiao.features[0].properties.uid)
        ) {
            state.yearPointsRegiao = payload.data
        }
    }
}).get({
    action: 'getYearInfoRegiao',
    property: 'yearInfoRegiao',
    path: ({ year }) => `/dadosRegionalizados/info/${year}`,
    onSuccess: (state, payload, axios) => {
        state.yearInfoRegiao = payload.data.data
    }
}).getStore()