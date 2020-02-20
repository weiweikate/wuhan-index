import { initWeixin } from './weixin'

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
    logShare()
    // 唤起 APP 的分享面板
    PALifeOpen.share(
        {
            title: '抗击新冠肺炎  共同守卫平安',
            content: '汇总疫情动态，助您科学预防。武汉加油！中国平安！',
            extention: 'https://wuhan.90hub.com/', // 分享页面的链接地址
            imageUrl: 'https://minx.oss-cn-shanghai.aliyuncs.com/wuhan/share-weixin.png',
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
export const logInit = () => {
    PALifeOpen.config({ debug: false, isProd: true })
    PALifeOpenH5.config({ debug: false, isProd: true, autoMergeRecord: true })
    initWeixin()
}

export const logEnter = () => {
    const a = [
        { event: "704-20200202-yq", label: "704-20200202-yq" },
        { event: "705-20200202-yq", label: "705-20200202-yq" },
        { event: "708-20200202-yq", label: "708-20200202-yq" },
    ]
    a.map(i => {
        PALifeOpenH5.addRecord(i.event, i.label)
        track(i.event, i.label)
    })
}

export const logContent = (id) => {
    PALifeOpenH5.addRecord("705-20200202-yq", `705-20200202-${id}-yq`)
    track("705-20200202-yq", `705-20200202-${id}-yq`)
}

export const logLipei = () => {
    PALifeOpenH5.addRecord("705-20200202-yq", `705-2020020201-yq`)
    track("705-20200202-yq", `705-2020020201-yq`)
}

export const logBaoquan = () => {
    PALifeOpenH5.addRecord("705-20200202-yq", `705-2020020202-yq`)
    track("705-20200202-yq", `705-2020020202-yq`)
}

export const logWenzhen = () => {
    PALifeOpenH5.addRecord("705-20200202-yq", `705-2020020203-yq`)
    track("705-20200202-yq", `705-2020020203-yq`)
}

export const logShare = () => {
    PALifeOpenH5.addRecord("705-20200202-yq", `705-2020020205-yq`)
    track("705-20200202-yq", `705-2020020205-yq`)
}

export const logQifu = () => {
    PALifeOpenH5.addRecord("705-20200202-yq", `705-2020020206-yq`)
    track("705-20200202-yq", `705-2020020206-yq`)
}

export const initWeixinShare = () => {
    const res = PALifeOpenH5.createWXShare('https://wuhan.90hub.com/')
    wx.updateAppMessageShareData({
        title: '抗击新冠肺炎  共同守卫平安', // 分享标题
        desc: '汇总疫情动态，助您科学预防。武汉加油！中国平安！', // 分享描述
        link: 'https://wuhan.90hub.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://minx.oss-cn-shanghai.aliyuncs.com/wuhan/share-weixin.png', // 分享图标
        success: function () {
            console.log('更新成功')
            // 设置成功
        },
    })
}
