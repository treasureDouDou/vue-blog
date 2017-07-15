import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {
    loading: false,
    articleList: null,
    aboutMe: null,
    labels: null,
    loadErr: false,
}

const mutations = {
    loadingDone(state){
        state.loading = !state.loading
    },
    aboutMeData(state, data){
        state.aboutMe = data
    },
    lablesData(state, data){
        state.labels = data
    },
    articleListData(state, data){
        state.articleList = data
    }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store