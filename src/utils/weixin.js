import axios from 'axios';
const getWeChatConfig = process.env.VUE_APP_BASE_API + '/api/wx/js-config';
import { Base64 } from 'js-base64';
import IMAGES from '../assets/images';
export const initWeixin = async () => {
    try {
        let url = window.location.origin;
        // let url = 'https://wuhan.90hub.com/';

        axios.get( `${getWeChatConfig}?url=${Base64.encode(url)}`).then(datas => {
            const res = datas.data.data || {}
            console.log({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.appId, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                signature: res.signature,// 必填，签名
                jsApiList: [
                    'updateAppMessageShareData',
                    'onMenuShareAppMessage'
                ] // 必填，需要使用的JS接口列表
            })
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.appId, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                signature: res.signature,// 必填，签名
                jsApiList: [
                    'updateAppMessageShareData',
                    'onMenuShareAppMessage'
                ] // 必填，需要使用的JS接口列表
            });

            wx.error(function (res) {
                console.log('err', res)
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
            let title = '抗击疫情 共同战“疫”';
            let desc = '“疫”路上 车主圈为您保驾护航';
            let imgUrl = 'https://cos-1257316466.cos.ap-shanghai.myqcloud.com/6a252d963150406da6ecdcb49523a487_WechatIMG432.jpeg'
            wx.ready(function () {
                wx.updateAppMessageShareData({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        console.log('success')
                        // 设置成功
                    },
                }),
                wx.onMenuShareAppMessage({
                    title: title,
                    desc: desc,
                    link: url,
                    imgUrl: imgUrl,
                    success: function () {}
                });
            });
        })
        .catch(res => {
            console.log(res);
        });
    } catch (err) {
        console.log('err', err)
    }
}
