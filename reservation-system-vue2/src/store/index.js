import Vue from 'vue'
import Vuex from 'vuex'

import reservations from './reservations'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    reservations
  }
})