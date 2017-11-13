import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teamOneScore: 0,
    teamTwoScore: 0,
    teamGuessing: 0
  },
  mutations
})
