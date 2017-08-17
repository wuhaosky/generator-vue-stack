'use strict';

/**
 * 获取数据
 * @param baseargs --基本参数对象
 * @param cb --回调函数
 */
export function fetchAjaxData (baseargs, cb) {

    // 模拟经过1000ms，拉取到ajax
    setTimeout(function(){
        let ajaxData = {
            count: 12
        }
        cb(ajaxData);
    }, 1000);

}
