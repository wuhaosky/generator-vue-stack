"use strict";

import {
    fetchAjaxData
} from "../api/fetch.js"

let mutations = {
    fetchData(state, payload){
        state.ajaxData = payload;
    }
};

let actions = {
    fetchData(context){
        fetchAjaxData(context.state.baseargs, function(ajaxData) {
            context.commit("fetchData", ajaxData);
        })
    }
};

export default function generateStore(baseargs){
    return {
        state: {
            baseargs: baseargs,
            ajaxData: null
        },
        getters: {
            ajaxData: state => {
                return state.ajaxData
            }
        },
        mutations: mutations,
        actions: actions
    }
}
