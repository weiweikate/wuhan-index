import { initWeixin } from './weixin'
import IMAGES from '../assets/images';
function track(eventId, labelId) {
    // 埋点
    try {
        PALifeOpen.invoke(
            'device',
            'addRecord',
            {
                eventId: eventId, //必填，根据需求
                labelId: labelId, //必填，根据需求
                parameters: {
                    // 扩展参数
                    ext: JSON.stringify({
                        act_action: 'share'
                    })
                }
            },
            function (res) {
                console.log('success', res)
            },
            function (e) {
                // 调用接口异常的回调函数
                console.log('failed ', e)
            })
    } catch(err) {
        console.log(err)
    }
}

export const share = () => {
    // logShare()
    // 唤起 APP 的分享面板
    try {
        const url  = window.location.origin
        PALifeOpen.share(
            {
                title: '抗击疫情 共同战“疫”',
                content: '“疫”路上 车主圈为您保驾护航',
                extention: url, // 分享页面的链接地址
                imgUrl:'https://cos-1257316466.cos.ap-shanghai.myqcloud.com/6a252d963150406da6ecdcb49523a487_WechatIMG432.jpeg', // 分享图标
                shareTypes: 'WXHY|WXPYQ|XLWB|DX' // 分享渠道，以"|"为分隔符。WXHY:微信好友;WXPYQ:微信朋友圈;XLWB:新浪微博;DX:短信。
            },
            function success(rsp) {
                // alert(JSON.stringify(rsp))
            },
            function error(e) {
                // alert('share error')
            }
        )
    }
    catch(err) {
        console.log(err)
        initWeixin()
    }
}
export const navigateUrl = (uri) =>{
    try {
        var param = {uri}
        PALifeOpen.executeUri(
            param,
            function(rsp) { console.debug("success",data); },
            function(data) { console.debug("failed", data); }
        )
    }
    catch(err) {
        console.log(err)
        window.location.href = uri;
    }

}
// 初始化
export const logInit = () => {
    try {
        PALifeOpen.config({ debug: false, isProd: true })
        PALifeOpenH5.config({ debug: false, isProd: true, autoMergeRecord: true })
        initWeixin()
    }
    catch(err) {
        initWeixin()
    }
}
// 进入页面
export const logEnter = () => {
    const a = [
        { event: "705", label: "705-20200221kjyq" }
    ]
    a.map(i => {
        try {
            PALifeOpenH5.addRecord(i.event, i.label)
            track(i.event, i.label)
        }
        catch(err) {
            console.log(err)
        }

    })
}

// 点击【播放完整】
export const logPlayVideo = () => {
    try {
        PALifeOpenH5.addRecord("705-1", `70501-20200221kjyq`)
        track("705-1", `70501-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}
// 点击【助力】
export const logZhuLi = () => {
    try {
        PALifeOpenH5.addRecord("705-2", `70502-20200221kjyq`)
        track("705-2", `70502-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}
// 点击【胶囊banner】
export const logBanner = () => {
    try {
        PALifeOpenH5.addRecord("705-3", `70503-20200221kjyq`)
        track("705-3", `70503-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}
// 点击【年检代办】
export const logNianJian = () => {
    try {
        PALifeOpenH5.addRecord("705-4-1", `7050401-20200221kjyq`)
        track("705-4-1", `7050401-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}
// 点击【在家享服务】
export const logHomeServe = () => {
    try {
        PALifeOpenH5.addRecord("705-4-2", `7050402-20200221kjyq`)
        track("705-4-2", `7050402-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}
// 点击【汽车消毒视频】
export const logCartXiaoDu = () => {
    try {
        PALifeOpenH5.addRecord("705-5-1", `7050501-20200221kjyq`)
        track("705-5-1", `7050501-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}

// 点击【返程防护指南】
export const logFCZN = () => {
    try {
        PALifeOpenH5.addRecord("705-5-2", `7050502-20200221kjyq`)
        track("705-5-2", `7050502-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}

// 点击【私家车防护指南】
export const logCartFHZN = () => {
    try {
        PALifeOpenH5.addRecord("705-5-3", `7050503-20200221kjyq`)
        track("705-5-3", `77050503-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}

// 点击【驾管业务】】
export const logJGYW = () => {
    try {
        PALifeOpenH5.addRecord("705-5-4", `7050504-20200221kjyq`)
        track("705-5-4", `7050504-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}


// 点击【口罩事项】
export const logKZThings= () => {
    try {
        PALifeOpenH5.addRecord("705-5-5", `7050505-20200221kjyq`)
        track("705-5-5", `7050505-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}

// 点击【更多】
export const logMoreNews= () => {
    try {
        PALifeOpenH5.addRecord("705-6", `7050506-20200221kjyq`)
        track("705-6", `7050506-20200221kjyq`)
    }
    catch(err) {
        console.log(err)
    }
}

export const initWeixinShare = () => {
    try {
        const url  = window.location.origin
        const res = PALifeOpenH5.createWXShare(url)
        wx.updateAppMessageShareData({
            title: '抗击新冠肺炎  共同守卫平安', // 分享标题
            desc: '汇总疫情动态，助您科学预防。武汉加油！中国平安！', // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:IMAGES.SHARE_IMG, // 分享图标
            success: function () {
                console.log('更新成功')
                // 设置成功
            },
        })
    }
    catch(err) {
        console.log(err)
    }

}
