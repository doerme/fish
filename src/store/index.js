import Vue from 'vue'
import Vuex from 'vuex'

import mygames from './mygame'
import datastore from './datastore'

Vue.use(Vuex)



const store = new Vuex.Store({
    modules: {
        mygames,
        datastore
    }
})

store.subscribe((mutation, state) => {
    console.log('allgames', JSON.stringify(state.mygames));
})

export default store