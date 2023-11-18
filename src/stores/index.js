import Vue from 'vue'
import Vuex from 'vuex'

import money from '@/stores/money'
import regionalizacao from '@/stores/regionalizacao'
import esic from '@/stores/esic'
import empenhos from '@/stores/empenhos'
import comments from '@/stores/comments'
import auth from '@/stores/auth'
import msgs from '@/stores/msgs'
import modal from '@/stores/modal'
import subscriptions from '@/stores/subscriptions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    money,
    regionalizacao,
    esic,
    empenhos,
    comments,
    auth,
    msgs,
    modal,
    subscriptions
  }
})
