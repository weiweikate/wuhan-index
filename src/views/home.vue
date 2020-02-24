<template>
    <div class="home-page">
        <div style="" class="top-img">
            <img :src="IMAGES.handimg" alt=""/>
            <div class="share" v-if="!isInWeChat" @click='onClickShare' ></div>
        </div>
        <div class="top-bar">
            <div class="video-player-div">
                <div>
                    <!--<img src="https://cos-1257316466.cos.ap-shanghai.myqcloud.com/079d205ca0eb4f30956ea8c8585e4dae_3m.gif" alt="" style="width: 100%"/>-->
                    <video-player class="video-player vjs-custom-skin"
                                  ref="videoPlayer1"
                                  :playsinline="playsinline"
                                  :options="playerOptions">
                    </video-player>
                    <div class="see-all" @click='onCustombuttonClick'></div>
                </div>
            </div>
            <div class="box">
                <!--弹幕1-->
                <div class="line1">
                    <div v-if="list.length">
                        <vue-seamless-scroll :data="list" :class-option="optionLeft" class="seamless-warp">
                            <ul class="item">
                                <li v-for="item in list">
                                    <span class="news-left"></span>
                                    <div class="news-middle" v-if="isInWeChat">
                                        <img :src="item.headImg" class="headImg"/>
                                        {{item.nickname}} : {{ item.statement }}
                                    </div>
                                    <div v-else class="news-middle"> {{ item.statement }}</div>
                                    <span class="news-right"></span>
                                </li>
                            </ul>
                        </vue-seamless-scroll>
                    </div>
                </div>
                <!--弹幕2-->
                <div v-if="list2.length">
                    <vue-seamless-scroll :data="list2" :class-option="optionLeft" class="seamless-warp seamless-warp2">
                        <ul class="item">
                            <li v-for="item in list2">
                                <span class="news-left"></span>
                                <div class="news-middle" v-if="isInWeChat">
                                    <img :src="item.headImg" class="headImg"/>
                                    {{item.nickname}} : {{ item.statement }}
                                </div>
                                <div v-else class="news-middle"> {{ item.statement }}</div>
                                <span class="news-right"></span>
                            </li>
                        </ul>
                    </vue-seamless-scroll>
                </div>
            </div>
            <div class="fighting" @click='toggleWishView'>
            <div>点我助力抗击疫情</div>
        </div>
        </div>
        <div class="container">
            <div class="img-view"
                @click='jump(1,"https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-topic-detail?bizId=T2626")'
            >
                <img :src="IMAGES.ICON_IMG_BANNER"/>
            </div>
            <div class="topic topic-1">
                <div class="topic-title">
                    <img :src="IMAGES.title01"/>
                </div>
                <div class="topic-1-list">
                    <div v-for="(item, index) in topic1"
                         :class="['topic-1-item',index==0? 'active':'']"
                         :key="index"
                    @click='jump(item.type,item.url)'
                    >
                        <img class='topic1-img' :src="item.img"/>
                    </div>
                </div>
            </div>
            <div class="topic topic-2">
                <div class="topic-title topic-title-2">
                    <img :src="IMAGES.title02"/>
                </div>
                <div class="topic-item shadow"
                     v-for="(item, index) in topic3"
                     :key="index"
                     @click='jump(item.type,item.url)'
                >
                    <img class='topic-img-2' :src="item.img"/>
                    <div>
                        <span class="icon" v-if="item.icon"></span>{{item.content}}
                    </div>
                </div>
                <div class="see-more" @click='jump(15,isInWeChat? "https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Feco_home_page%3FpageNo%3D70500":"pars://pars.pingan.com/mc/channel_list?channelId=C133&circleType=01&contentType=%5B%22topic%22%2C%22information%22%2C%22wiki%22%2C%22post%22%5D")'>查看更多
                </div>
            </div>
        </div>
        <div class="logo"></div>
        <!--底部弹窗-->
        <van-action-sheet v-model="showFighting" title="为大家舍小家 致敬逆行英雄">
            <div class="wrap">
                <div class='fighting-item'
                     v-for="(item, index) in content"
                     :key="index"
                     @click="sendWish(item)"
                >
                {{item}}
                </div>
            </div>
        </van-action-sheet>
        <div class="all-video-div" v-if="show">
            <div style="position: relative">
                <div class="close-icon" @click='close'></div>
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer2"
                          :playsinline="playsinline"
                          :options="playerOptions2">
            </video-player>
            </div>
        </div>
    </div>
</template>

<script>
import { isWeixin } from '../utils/common';
import {
    navigateUrl,
    share,
    logInit,
    logEnter,
    logPlayVideo,
    logZhuLi,
    logBanner,
    logNianJian,
    logAddressHelp,
    logBDService,
    logViolationEnquiry,
    logOilCardRecharge,
    logParkingPayment,
    logHomeService,
    logCartXiaoDu,
    logFCZN,
    logCartFHZN,
    logJGYW,
    logKZThings,
    logDoLittleThings,
    logMoreNews
} from '../utils/log';
const BASE_URL = process.env.VUE_APP_BASE_TARGET;
import IMAGES from '../assets/images';
const isInWeChat = isWeixin()
export default {
    data () {
        return {
            newsList: [{
                'title': 'A simple, seamless scrolling for Vue.js'
            }, {
                'title': 'A curated list of awesome things related to Vue.js'
            }],
            IMAGES,
            userInfo:{
                nickname:'我',
                headImg:require('../assets/images/user-icon.png')
            },
            content:[
                '愿你们整整齐齐去，平平安安回',
                '平安可贵，英雄可敬',
                '不信谣不传谣，宅在家里做贡献',
                '少出门勤洗手，保护好自己和家人，共渡难关',
                '冬将尽，春可期，愿山河无恙，世间平安',
                '世间美好与你们环环相扣，愿你们平平安安',
                '祝一切平安，早日归来',
                '口罩护体，病毒退散',
                '最美逆行人，耀眼中国“星”',
                '万众一心抗战役，众志成城保平安'
            ],
            isInWeChat,
            topic3: [
                {
                    content:'非常时期 正确的汽车消毒姿势',
                    img:IMAGES.ICON_IMG_1,
                    icon:true,
                    type:9,
                    url:isInWeChat? 'https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Flive%2Froom%3FliveId%3D2325816':"pars://pars.pingan.com/mc/video_live_detail?liveid=2325816"
                },
                {
                    content:'【全力防疫】疫情当下返程防护指南！',
                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-post-detail?bizId=P1236865',
                    img:IMAGES.ICON_IMG_2,
                    type:10,
                },
                {
                    content:'【全力防疫】疫情当前，私家车防护指南！',
                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-post-detail?bizId=P1230061',
                    img:IMAGES.ICON_IMG_3,
                    type:11
                },
                {
                    content:'验车验本先别着急！ 疫情期间车驾管业务最全指南来了',
                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-post-detail?bizId=P1230093',
                    img:IMAGES.ICON_IMG_4,
                    type:12
                },
                {
                    content:'【预防指南】做好这几件小事，抗击疫情更有安全感',
                    img:IMAGES.ICON_IMG_6,
                    type:14,
                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-post-detail?bizId=P1200143'
                },
                {
                    content:'#抗击疫情|佩戴口罩的注意事项有哪些#',
                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-topic-detail?bizId=T2521',
                    img:IMAGES.ICON_IMG_5,
                    type:13
                },
            ],
            topic1: [
                {
                    img:IMAGES.TOPIC_ICON_1,
                    des:"头图",
                    url:'',
                },
                {
                    img:IMAGES.TOPIC_ICON_8,
                    des:"年检代办暖心升级",
                    type:2,
                    url:isInWeChat? 'https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Fmc%2Fnew_hcz_auth_page%3FpluginName%3D%25e5%25b9%25b4%25e6%25a3%2580%25e4%25bb%25a3%25e5%258a%259e%26url%3Dpars%253a%252f%252fpars.pingan.com%252fhealthcircle%252fcar_plugin_with_car_manage%253ftype%253dAnnualInspection%2526title%253d%2525E5%2525B9%2525B4%2525E6%2525A3%252580%2525E4%2525BB%2525A3%2525E5%25258A%25259E':'pars://pars.pingan.com/mc/new_hcz_auth_page?pluginName=%e5%b9%b4%e6%a3%80%e4%bb%a3%e5%8a%9e&url=pars%3a%2f%2fpars.pingan.com%2fhealthcircle%2fcar_plugin_with_car_manage%3ftype%3dAnnualInspection%26title%3d%25E5%25B9%25B4%25E6%25A3%2580%25E4%25BB%25A3%25E5%258A%259E'
                },
                {
                    img:IMAGES.TOPIC_ICON_2,
                    type:3,
                    des:'道路救援',
                    url:'https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Fmc%2Fnew_hcz_auth_page%3FpluginName%3D%25e9%2581%2593%25e8%25b7%25af%25e6%2595%2591%25e6%258f%25b4%26url%3Dhttps%253a%252f%252fhcz-static.pingan.com.cn%252ffin-common%252froadService%252findex.html'
                },
                {
                    img:IMAGES.TOPIC_ICON_3,
                    type:4,
                    des:'保单服务',
                    url:'https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Fmc%2Fnew_hcz_auth_page%3FpluginName%3D%25e4%25bf%259d%25e5%258d%2595%25e6%259f%25a5%25e8%25af%25a2%26url%3Dpars%253a%252f%252fpars.pingan.com%252fpearl%252fopen_rn%253fbundleId%253d11%2526moduleName%253dPARNPolicy'
                },
                {
                    img:IMAGES.TOPIC_ICON_4,
                    type:5,
                    des:'违章查询',
                    url:'https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Fmc%2Fnew_hcz_auth_page%3FpluginName%3D%25e8%25bf%259d%25e7%25ab%25a0%25e6%259f%25a5%25e8%25af%25a2%26url%3Dpars%253a%252f%252fpars.pingan.com%252fillegal_index'
                },
                {
                    img:IMAGES.TOPIC_ICON_5,
                    type:6,
                    des:"油卡充值",
                    url:'https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Fmc%2Fnew_hcz_auth_page%3FpluginName%3D%25e6%25b2%25b9%25e5%258d%25a1%25e5%2585%2585%25e5%2580%25bc%26url%3Dhttps%253a%252f%252fhcz-static.pingan.com.cn%252ffin-common%252fumc-discount-cheer%252findex.html%2523%252fhome'
                },
//                {
//                    img:IMAGES.TOPIC_ICON_6,
//                    type:7,
//                    des:"停车缴费",
//                    url:'https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Fmc%2Fnew_hcz_auth_page%3FpluginName%3D%25e5%2581%259c%25e8%25bd%25a6%25e6%259f%25a5%25e7%25bc%25b4%26url%3Dpars%253a%252f%252fpars.pingan.com%252fhealthcircle%252fcar_plugin_with_car_manage%253ftype%253dParkingCar%2526title%253d%2525e5%252581%25259c%2525e8%2525bd%2525a6%2525e6%25259f%2525a5%2525e7%2525bc%2525b4'
//                },
                {
                    img:IMAGES.TOPIC_ICON_7,
                    type:8,
                    des:"车主服务中心",
                    url:'https://m.lifeapp.pingan.com.cn/m/r-act/index.html#/micro-community/driver-club'
                },
            ],
            show:false,
            showFighting:false,
            list:[],
            list2:[],
            playerOptions: {
                //播放速度
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                //如果true,浏览器准备好时开始回放。
                autoplay: false,
                // 默认情况下将会消除任何音频。
                muted: false,
                // 导致视频一结束就重新开始。
                loop: true,
                controls:false,
                // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                preload: 'auto',
                language: 'zh-CN',
                // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                aspectRatio: '16:9',
                // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                fluid: true,
                sources: [{
                    //类型
                    type: "video/mp4",
                    //url地址
                    src: 'https://cos-1257316466.cos.ap-shanghai.myqcloud.com/338916de6bd646d9ac596de220b2a87c_022315s.m4v'
                }],
                poster: require('../assets/images/poster.png'), //你的封面地址
                //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                notSupportedMessage: '此视频暂无法播放，请稍后再试',
            },
            playerOptions2: {
                //播放速度
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                //如果true,浏览器准备好时开始回放。
                autoplay: true,
                // 默认情况下将会消除任何音频。
                muted: false,
                // 导致视频一结束就重新开始。
                loop: false,
                preload: 'auto',
                language: 'zh-CN',
                // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                aspectRatio: '16:9',
                // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                fluid: true,
                sources: [{
                    //类型
                    type: "video/mp4",
                    //url地址
                    src: ' https://cos-1257316466.cos.ap-shanghai.myqcloud.com/d0cb06bee5ad47dcbaa0dd8dfa6984b9_0224allv1.m4v'
                }],
                //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                notSupportedMessage: '此视频暂无法播放，请稍后再试',
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    //全屏按钮
                    fullscreenToggle: true
                }
            }
        };
    },
    computed: {
        optionLeft () {
            return {
                direction: 2,
                limitMoveNum: 2,
                hoverStop: false,
                clickStop:false,
                openTouch:false,
                step:2
            }
        },
        player() {
            return this.$refs.videoPlayer.player
        },
        playsinline(){
            var ua = navigator.userAgent.toLocaleLowerCase();
            if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        init(){
            const arr = this.encourageList
            this.list.splice(0,this.list.length,...this.shuffle(arr))
            this.list2.splice(0,this.list2.length,...this.shuffle(arr))
        },
        shuffle(arr) {
            let i = arr.length;
            while (i) {
                let j = Math.floor(Math.random() * i--);  //5555

                [arr[j], arr[i]] = [arr[i], arr[j]];
            }
            return arr
        },
        getUserInfo(){
            this.$api.getUserOpenId({
                openId:this.openId
            }).then(res => {
                this.userInfo = res.data
            })
            .catch(res => {
                console.log(res);
            });
        },
        getEncourageList() {
            this.$api.getEncourageList({

            }).then(res => {
                this.encourageList = res.data
                this.init()
            })
            .catch(res => {
                console.log(res);
            });
        },
        toggleWishView(){
            this.showFighting = true
            logZhuLi()
        },

        onCustombuttonClick () {
            this.$nextTick(()=>{
                const videoPlayer1 = this.$refs.videoPlayer1
                this.show = true
                videoPlayer1.player.pause()
                this.$nextTick(()=>{
                    const videoPlayer2 = this.$refs.videoPlayer2
                    videoPlayer2.player.play()
                })
            })
//            this.show = true
//            this.$nextTick(()=>{
//                const videoPlayer2 = this.$refs.videoPlayer2
//                videoPlayer2.player.play()
//            })
            logPlayVideo()
        },
        close(){
            this.$nextTick(()=>{
                const videoPlayer1 = this.$refs.videoPlayer1
                this.show = false
                videoPlayer1.player.play()
            })
        },
        sendWish(statement){
            this.$toast('祈福成功，抗疫路上，感恩有你');
            let list = [...this.list]
            list.splice(1,1)
            list = this.shuffle(list)
            this.list.splice(0,this.list.length)
            list.splice(1,0,{
                statement,
                ...this.userInfo
            })
            setTimeout(()=>{
                this.list.splice(0,list.length,...list)
                this.showFighting = false
            },20)
        },
        jump(type,url){
            if(!url) return
            if(isWeixin()){
                window.location.href = url;
            } else {
                navigateUrl(url)
            }
            if(type!==undefined){
                const track ={
                    1: ()=> {
                        logBanner()
                    },
                    2: ()=> {
                        logNianJian()
                    },
                    3: ()=> {
                        logAddressHelp()
                    },
                    4: ()=> {
                        logBDService()
                    },
                    5: ()=> {
                        logViolationEnquiry()
                    },
                    6: ()=> {
                        logOilCardRecharge()
                    },
                    7: ()=> {
                        logParkingPayment()
                    },
                    8: ()=> {
                        logHomeService()
                    },
                    9: ()=> {
                        logCartXiaoDu()
                    },
                    10: ()=> {
                        logFCZN()
                    },
                    11: ()=> {
                        logCartFHZN()
                    },
                    12: ()=> {
                        logJGYW()
                    },
                    13: ()=> {
                        logKZThings()
                    },
                    14: ()=> {
                        logDoLittleThings()
                    },
                    15: ()=> {
                        logMoreNews()
                    },
                }[type]
                track()
            }
        },
        handleScroll(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop>=300){
                this.$nextTick(()=>{
                    const videoPlayer1 = this.$refs.videoPlayer1
                    videoPlayer1.player.pause()
                })
            }
        },
        onClickShare(){
            isWeixin() ? this.WeiXinShareBtn() : share()
        },
        WeiXinShareBtn() {
            try {
                if (typeof WeixinJSBridge == "undefined") {

                } else {
                    let title = '抗击疫情 共同战“疫”';
                    let desc = '“疫”路上 车主圈为您保驾护航';
                    let imgUrl = IMAGES.SHARE_IMG
                    WeixinJSBridge.invoke("sendAppMessage", {
                        "title": title,
                        "link": location.href.split('#')[0],
                        "desc": desc,
                        "img_url": 'https://cos-1257316466.cos.ap-shanghai.myqcloud.com/6a252d963150406da6ecdcb49523a487_WechatIMG432.jpeg'
                    });
                }
            } catch(err) {
                console.log(err)
            }
        }
    },
    mounted() {
        this.openId = this.$cloud.getLocationHrefParam('openId') || this.$store.getters.openid;
        if(isWeixin()){
            if(!this.openId){
                let url = `${encodeURIComponent(window.location.origin+'/#/home')}`;
                location.replace(`${BASE_URL}/api/wx/oauth?backUrl=${url}`)
                return
            } else {
                this.$store.commit('user/SET_OPENID', this.openId);
                console.log(typeof WeixinJSBridge)
                const that = this
//                if (typeof WeixinJSBridge == "undefined") {
//                    document.addEventListener("WeixinJSBridgeReady", function() {
//                        that.$nextTick(() => {
//                            console.log(1111)
//                            setTimeout(()=>{
//                                const videoPlayer1 = that.$refs.videoPlayer1
//                                videoPlayer1.player.play()
//                            },2000)
//                        })
//                    }, false);
//                }
                this.getUserInfo()
                this.getEncourageList()
            }
        } else {
            this.getEncourageList()
        }
        const that = this
        this.$nextTick(() => {
            window.addEventListener("scroll", this.handleScroll);
            document.addEventListener('touchstart', function(){
                if(!that.ready){
                    that.ready = 1
                    const videoPlayer1 = that.$refs.videoPlayer1
                    videoPlayer1.player.play()
                }
            }, false);
        })
        logInit()
        logEnter()

    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.seamless-warp {
    overflow: hidden;
    height:46px;
    width: 100%;
    &.seamless-warp2{
        ul.item {
            li{
                margin-right: 0px;
                margin-left: 29px;
            }
        }
    }
    ul.item {
        margin-bottom:11px;
        white-space: nowrap;
        li {
            display: inline-block;
            height:46px;
            margin-right: 29px;
            .news-left,.news-right{
                width:12px;
                height:100%;
                display: inline-block;
                background: url('../assets/images/00hand.png') no-repeat left center;
                background-size:100% 100%;
                vertical-align: top;
            }
            .news-left{
                margin-right: -1px;
            }
            .news-middle{
                vertical-align: top;
                display: inline-block;
                height:100%;
                line-height: 46px;
                background: url('../assets/images/00middle.png') no-repeat left center;
                background-size:100% 100%;
                color:#8B572A ;
                font-size: 14px;
            }
            .news-right{
                margin-left: -1px;
                background-image: url("../assets/images/00foot.png");
            }
            .headImg{
                width:30px;
                height:30px;
                border-radius: 50%;
                margin-right: 6px;
                vertical-align: middle;
            }
        }
    }
}
.home-page{
    .wrap{
        height:50vh;
        overflow: scroll;
    }
    .top-img{
        margin-bottom: -57px;
        position: relative;
        min-height:240px;
        background: url("../assets/images/handimg.png") no-repeat left top;
        background-size: 100% 100%;
        >img{
            width: 100%;
        }
    }
    .share{
        position: absolute;
        right:0;
        top: 22px;
        width:24px;
        height: 65px;
        background: url('../assets/images/share-icon.png') no-repeat left center;
        background-size:100% 100%;
    }
    .box{
        height: 102px;
        >div.line1{
            height:46px;
            margin-bottom: 11px;
        }
    }
    .video-player-div{
        margin-bottom:20px;
        padding:0 15px;
        >div{
            position: relative;
            box-sizing: border-box;
            border-radius:5px;
            padding:6px;
            background: #FFEFDD;
            .video-player{
                border-radius:3px;
            }
        }
        .see-all{
            width:90px;
            height:22px;
            line-height:22px;
            background: url('../assets/images/player.png') no-repeat left center;
            background-size:100%;
            border-radius:11px;
            right:16px;
            bottom:15px;
            position: absolute;
            font-size:14px;
            padding-left: 24px;
            color: #2E2E2E;
        }
    }
    .all-video-div{
        position: fixed;
        background: #000000;
        left:0;
        right:0;
        top:0;
        bottom:0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: right;
        z-index:9999;
        >div{
            padding:0 16px;
        }
        .close-icon{
            display: inline-block;
            width:22px;
            height:22px;
            background: url('../assets/images/player-close.png') no-repeat left center;
            background-size:100%;
            position: absolute;
            right:21px;
            top:-32px;
            z-index:99;
        }
    }
    .van-popup{
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 10px 0px rgba(254,199,163,1);
    }
    .logo{
        background: url('../assets/images/logo.png') no-repeat center center;
        background-size:178px 32px;
        height: 72px;
    }
    .fighting-item{
        width:326px;
        min-height:56px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        line-height:24px;
        background:rgba(254,252,251,1);
        box-shadow:0px 0px 4px 0px rgba(254,199,163,1);
        border-radius:28px;
        box-sizing: border-box;
        margin: 12px auto;
        margin-top:2px;
        padding: 8px 18px;
        color: #8D6C4D;
        font-size: 16px;
    }
    .fighting{
        height:99px;
        text-align: center;
        >div{
            width:280px;
            height:99px;
            margin:0 auto;
            background: url('../assets/images/btn.png') no-repeat left center;
            background-size:100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size:20px;
            color:#fff;
            -webkit-animation:ripple 0.5s linear both infinite alternate;
            animation:ripple 0.5s linear both infinite alternate;
        }
    }
    @keyframes ripple {
        0% {
            width:270px;
            /*height:80px;*/
        }
        100% {
            width:280px;
            /*height:99px;*/
        }
    }
    .container{
        width: 343px;
        margin: 0 auto;
        .img-view{
            margin-top:10px;
            margin-bottom: 40px;
            min-height:95px;
        }
    }
    .top-bar{
        background: url('../assets/images/handing02.png') no-repeat left center;
        background-size:contain;
    }
    .topic{
        position: relative;
        &.topic-1{
            height: 355px;
            .topic-1-list{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                .topic-1-item{
                    width: 165px;
                    height: 72px;
                    margin-top: 8px;
                    &.active{
                        margin-top: 0;
                        width: 343px;
                        height: 115px;
                    }
                    .topic1-img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        &.topic-2{
            background:#FCEDE6;
            box-shadow:0px 1px 4px 0px rgba(254,199,163,1);
            border-radius:5px;
            padding:25px 22px 20px 20px;
            margin-top:42px;
        }
        .topic-title{
            position: absolute;
            height:34px;
            width: 181px;
            border-radius:8px;
            left: 50%;
            top: -17px;
            transform: translate(-50%, 0);
            >img{
                height:100%;
                width:100%;
            }
            &.topic-title-2{
                width:209px;
            }
        }
        .topic-tips{
            color: #999;
            font-size: 11px;
            margin-bottom: 20px;
            text-align: center;
        }
        .topic-img-1{
            width:42px;
            /*height:48px;*/
        }
        .topic-content{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .topic-p{
            text-align: center;
            width: 50%;
            font-size: 14px;
            color: #8B572A;
            line-height: 21px;
            box-sizing: border-box;
            padding: 0 18px;
        }
        .topic-item{
            display: flex;
            align-items: center;
            padding:14px 16px;
            background: #fff;
            box-shadow:0px 1px 4px 0px rgba(254,199,163,1);
            border-radius:5px;
            margin-top:13px;
            &.shadow{
                box-shadow:0px 10px 18px 0px rgba(253,225,212,1),0px 1px 4px 0px rgba(254,199,163,1);
            }
            >div{
                flex: 1;
                font-size:16px;
                line-height:21px;
                &.topic-item-content{
                    padding-left: 16px;
                }
                .icon{
                    display: inline-block;
                    background: url('../assets/images/videoicon.png') no-repeat left center;
                    width:15px;
                    height: 14px;
                    background-size:15px 12px;
                }
            }
            >img{
                width:85px;
                height:60px;
                margin-right:12px;
            }
        }
        .see-more{
            color: #0694FB;
            font-size: 12px;
            text-align: center;
            margin-top:20px;
        }
    }
}
</style>
<style lang="less" rel="stylesheet/less">
.home-page {
    .van-hairline--bottom::after {
        border-bottom-width: 0px;
    }
}
</style>
