// audio DOM视频对象
var audio = document.getElementById("audio");
// 控制播放时按钮
var playcenterNode = document.querySelector(".playcenter").classList;
// 进度条
var audioProgressNode = document.querySelector(".audio-icon").classList;

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
audio.src = url;

// 播放
document.querySelector('.playcenter').addEventListener('click', function () {
    // 执行播放暂停指令
    executePlayPause();
});

// 前进和后退

document.querySelector('.audio-play-icon-pre').addEventListener('click', function () {
    back();
});
document.querySelector('.audio-play-icon-next').addEventListener('click', function () {
    go();
});

function go() {
    audio.currentTime += 100;
    audio.play();
}

function back() {
    audio.currentTime -= 100;
    audio.play();;
}
// 隐藏播放器
document.querySelector('.audio-play-icon-close').addEventListener('click', function () {
    document.querySelector(".audio-content-wrapper").style.display = "none";
});

// 结束事件
audio.addEventListener("ended", function () {
    var message = "语音播报结束了";
    // 执行播放暂停指令
    executePlayPause();
}, false);

function executePlayPause() {
    if(!playcenterNode.contains("audio-play-icon-play")) {
        // 执行动作
        audio.play();
        // 控制进度条
        audioProgressNode.add('playing-progress');
        // 控制播放暂停图标展示
        playcenterNode.add("audio-play-icon-play");
        playcenterNode.remove("audio-play-icon-pause");
    } else {
        // 执行动作
        audio.pause();
        // 控制进度条
        audioProgressNode.remove('playing-progress');
        // 控制播放暂停图标展示
        playcenterNode.add("audio-play-icon-pause");
        playcenterNode.remove("audio-play-icon-play");
    }
}

// 安卓下部分机器型号屏蔽语音播报功能
var ua = navigator.userAgent;
if(/H8/.test(ua) || /H8S/.test(ua) || /S2/.test(ua) ||
    /S1/.test(ua) || /H9/.test(ua) || /H10/.test(ua) ||
    /Kids/.test(ua) || /Coolpad 5200S/.test(ua) || /S10_JTYL/.test(ua) ||
    /HUAWEI G750-T20/.test(ua) || /HUAWEI G750-T01/.test(ua) || /GT-N7102/.test(ua) ||
    /vivo Y22L/.test(ua) || /vivo X3L/.test(ua) || /SM-N7506V/.test(ua) ||
    /Lenovo A788t/.test(ua) || /HUAWEI G521-L076/.test(ua) || /GT-I9158V/.test(ua) ||
    /EBEN T7/.test(ua)) {
    // TODO
    console.log("隐藏播放按钮");
    document.querySelector(".audio-content-wrapper").style.display = "none";
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