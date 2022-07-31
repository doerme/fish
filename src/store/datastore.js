import apiHttp from '../rpc/apiHttp'

const state = {
    initData: {
        data: {
        }
    },
    userInfo: {
        data: {
            wallet: {}
        }
    },
}

const mutations = {
    setInitData(state, data) {
        state.initData = data;
    },
    setUserInfo(state, data) {
        state.userInfo = data
    },
}

const actions = {
    async initData({ commit, state }, data) {
        console.log(`[j] gologin`)
        const resIniData = await apiHttp({
            url: `/api/user/mobilelogin`,
            method: 'POST',
            data: {
                mobile: "18813753471",
                captcha: "123456"
            },
        })
        console.log(`[j] after go login`, resIniData)
        commit('setInitData', resIniData)
        // this.getUserInfo()
        const resUserInfo = await apiHttp({
            url: '/api/game/user/get_profile',
            method: 'GET',
            headers: {
                token: resIniData.data.userinfo.token
            }
        })
        console.log(`[j] after go login`, resUserInfo)
        commit('setUserInfo', resUserInfo)
        console.log(`[j] after ini`, state)
    },
    async getUserInfo({ commit, state }, data) {

    },
}

export default {
    state,
    mutations,
    actions
}