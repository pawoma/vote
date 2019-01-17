import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectedVoteList: [],
        isLogin: false,
        prizeLevel: 0,
        userInfo: {}
    },
    mutations: {
        SELECTE_VOTE(state, mounted) {
            state.selectedVoteList.push(mounted)
        },
        CLEAR_SELECTED(state) {
            state.selectedVoteList.splice(0, 10)
        },
        REMOVE_VOTE(state, mounted) {
            state.selectedVoteList = state.selectedVoteList.filter(item => item.ID !== mounted.ID)
        },
        UPDATE_USERINFO(state, mounted) {
            state.userInfo = mounted
        },
        UPDATE_LEVEL(state, mounted) {
            state.prizeLevel = mounted
        },
        UPDATE_IS_LOGIN(state, mounted) {
            state.isLogin = mounted
        }
    }
})
