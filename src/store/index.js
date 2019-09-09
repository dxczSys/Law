import Vuex from 'vuex'
import Vue from 'vue'
import cookie from 'vue-cookie'
import * as types from './type'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            username : ''
        },
        token: null,
        title: ''
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            cookie.set('token', data.accout)
            cookie.set('username', data.username)
            state.token = data.accout;
            state.user.username = data.username
        },
        [types.LOGOUT]: (state) => {
            cookie.delete('token')
            cookie.delete('username')
            state.user.username = ''
            state.token = null
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
})