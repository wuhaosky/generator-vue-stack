"use strict";

import {
    fetchAjaxData
} from "../api/fetch.js"

let mutations = {
    fetchData(state, payload){
        state.ajaxData = payload;
    },
    increment (state) {
        state.ajaxData.count ++
    },
    decrement (state) {
        state.ajaxData.count --
    }
};

let actions = {
    fetchData(context){
        fetchAjaxData(context.state.baseargs, function(ajaxData) {
            context.commit("fetchData", ajaxData);
        })
    },
    increment (context) {
        setTimeout(() => {
            context.commit('increment')
        }, 1000)
    },
    decrement (context) {
        setTimeout(() => {
            context.commit('decrement')
        }, 1000)
    }
};

export default function generateStore(baseargs){
    return {
        state: {
            baseargs: baseargs,
            ajaxData: null
        },
        mutations: mutations,
        actions: actions
    }
}
