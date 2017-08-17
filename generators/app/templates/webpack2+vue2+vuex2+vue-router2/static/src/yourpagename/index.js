require('es6-promise').polyfill();
// Vue和Vuex和Vue-router
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// 使用vuex和vue-router
Vue.use(Vuex);
Vue.use(VueRouter);

// 引入样式
import './index.less';

// 根vue component
import App from './app.vue'

// store对象生成器
import generateStore from './store/store.js'
// 引入router文件
import generateRouter from './router/router.js'

function renderPage(storeObj) {
    // 实例化Vuex
    let store = new Vuex.Store(storeObj);
    // 实例化VueRouter
    const router = new VueRouter({
        mode: 'hash',
        routes: generateRouter
    });
    // 路由全局钩子
    router.afterEach(route => {
        // 设置每个路由页面的title
        if(route.meta.title){
            document.title = route.meta.title;
	    }
    });
    let vm = new Vue({
        el: '#app',
        store,
        router,
        render: h => h(App)
    });
}

/**
 * 获取基础参数
 */
function getBaseArguments(){
	// 基本参数
	let baseargs = {};
	// ---------------
	// get arguments (例如：经纬度、ua信息等)
	// ---------------
	return baseargs;
}

(function init() {
    let baseargs = getBaseArguments();
    let storeObj = generateStore(baseargs);
    renderPage(storeObj);
})();
