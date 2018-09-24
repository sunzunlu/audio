function text2audio() {
    //采用配置项替换默认值，作用类似jquery.extend
    if(arguments.length === 1 && typeof arguments[0] === "object") {
        var src = arguments[0] || {};
        for(key in src) {
            if(src[key] && defaultSettings[key] && src[key] === defaultSettings[key])
                continue;
            else if(src[key])
                defaultSettings[key] = src[key];
        }
    }

    // 初始化
    var url = 'https://gss0.baidu.com/6KAZsjip0QIZ8tyhnq/text2audio';
    var data = {
        tex: encodeURI("签到成功"),
        cuid: "baike",
        lan: "ZH",
        ctp: "1",
        pdt: "301",
        vol: "9",
        spd: "120"
    }
    url = getFullUrlByParams(url, data);
    // 动态创建audio标签
    var audio = new Audio();
    audio.src = url;
    audio.controls = true;
    audio.style.display = "none";
    audio.autoplay = "autoplay";
    audio.preload = "auto";
}

/**
 * 将json参数拼接到url中
 * @param {String} url 地址
 * @param {Object} jsonObj 数据
 * @return {String} 返回最终的url
 */
function getFullUrlByParams(url, jsonObj) {
    url = url || '';
    // url = exports.getFullPath(url);
    // 将jsonObj拼接到url上
    var extrasDataStr = '';

    if(jsonObj) {
        for(var item in jsonObj) {
            if(extrasDataStr.indexOf('?') === -1 && url.indexOf('?') === -1) {
                extrasDataStr += '?';
            } else {
                extrasDataStr += '&';
            }
            extrasDataStr += item + '=' + jsonObj[item];
        }
    }
    url = url + extrasDataStr;

    return url;
};