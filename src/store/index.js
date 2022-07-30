import Vue from 'vue'
import Vuex from 'vuex'

import mygames from './mygame'

Vue.use(Vuex)



const store = new Vuex.Store({
    modules:{
        mygames
    }
})

store.subscribe((mutation, state) => {
    console.log('allgames', JSON.stringify(state.mygames));
})

export default store