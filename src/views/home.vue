<template>
   <div class="home-page">
       <div style="" class="top-img">
           <img v-lazy="IMAGES.handimg" alt=""/>
           <div class="share" v-if="!isInWeChat" @click='onClickShare' ></div>
       </div>
       <div class="top-bar">
           <div class="video-player-div">
               <div>
                   <video-player class="video-player vjs-custom-skin"
                                 ref="videoPlayer1"
                                 :playsinline="playsinline"
                                 :options="playerOptions">
                   </video-player>
                   <div class="see-all" @click='onCustombuttonClick'></div>
           </div>
       </div>
        <div style="height:102px">
            <!--弹幕1-->
            <div  id="box1" style="overflow:hidden;width:100%;">
                <div id="divList1">
                    <div class="news" v-for="(item, index) in list" :key="index">
                        <span class="news-left"></span>
                        <div class="news-middle" v-if="isInWeChat">
                            <img :src="item.headImg"  class="headImg"/>
                            {{item.nickname}} : {{ item.statement }}
                        </div><div v-else class="news-middle"> {{ item.statement }}</div>
                        <span class="news-right"></span>
                    </div>
                </div>
                <div id="copyDiv1"></div>
            </div>
            <!--弹幕2-->
            <div  id="box2" style="overflow:hidden;width:100%;">
                <div id="divList2">
                    <div class="news" v-for="(item, index) in list2" :key="index">
                        <span class="news-left"></span>
                        <div class="news-middle" v-if="isInWeChat">
                            <img :src="item.headImg"  class="headImg"/>
                            {{item.nickname}} : {{ item.statement }}
                        </div>
                        <div v-else class="news-middle"> {{ item.statement }} </div>
                        <span class="news-right"></span>
                    </div>
                </div>
                <div id="copyDiv2"></div>
            </div>
        </div>
        <div class="fighting" @click='toggleWishView'>
            <div>点我助力抗击疫情</div>
        </div>
        </div>
        <div class="container">
            <div class="img-view" @click='jump(1,"https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-topic-detail?bizId=T2626")'>
                <img v-lazy="IMAGES.ICON_IMG_BANNER" />
            </div>
            <div class="topic">
                <div class="topic-title">
                    <img :src="IMAGES.title01" />
                </div>
                <div class="topic-tips">疫情严峻，减少人员聚集，平安为您提供线上自助服务</div>
               <div class="topic-content">
                   <div class="topic-p"
                        v-for="(item, index) in topic1"
                        :key="index"
                        @click='jump(item.type,item.url)'
                   >
                       <img class='topic-img-1'v-lazy="item.img" />
                       <div >{{item.content1}} <br/> {{item.content2}}</div>
                   </div>
               </div>
            </div>

            <!--<div class="topic">-->
                <!--<div class="topic-title">抗击肺炎健康专题</div>-->
                <!--<div class="topic-item" v-for="(item, index) in 2">-->
                    <!--<img class='topic-img-2'v-lazy="'https://test2cdn.sharegoodsmall.com/sharegoods/5c346ec930c0493fbb8172d55cbedc1c.jpg'" />-->
                    <!--<div class="topic-item-content">非常时期 正确的汽车消毒姿势</div>-->
                <!--</div>-->
            <!--</div>-->

            <div class="topic">
                <div class="topic-title topic-title-2">
                    <img :src="IMAGES.title02" />
                </div>
                <div class="topic-item shadow"
                     v-for="(item, index) in topic3"
                     :key="index"
                    @click='jump(item.type,item.url)'
                >
                    <img class='topic-img-2' v-lazy="item.img" />
                    <div>
                        <span class="icon" v-if="item.icon"></span>{{item.content}}
                    </div>
                </div>
                <div class="see-more" @click='jump(9,isInWeChat? "https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Feco_home_page%3FpageNo%3D70500":"pars://pars.pingan.com/mc/channel_list?channelId=C133&circleType=01&contentType=%5B%22topic%22%2C%22information%22%2C%22wiki%22%2C%22post%22%5D")'>查看更多</div>
           </div>
       </div>
       <div class="logo"></div>
        <!--底部弹窗-->
       <van-action-sheet v-model="showFighting" title="为大家舍小家 致敬逆行英雄">
         <div style="height:272px;overflow: scroll">
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
import { navigateUrl, share, logInit, logEnter, logPlayVideo, logZhuLi, logBanner, logNianJian, logHomeServe, logCartXiaoDu, logFCZN, logCartFHZN, logJGYW, logKZThings, logMoreNews} from '../utils/log';
const BASE_URL = process.env.VUE_APP_BASE_TARGET;
import IMAGES from '../assets/images';
const isInWeChat = isWeixin()
export default {
    name: 'home',
    components: {

    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player
        },
        playsinline(){
            var ua = navigator.userAgent.toLocaleLowerCase();
            if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
                return false
            }else{
                return true
            }
        },
    },
    data() {
        return {
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
                    content:'【预防指南】做好这几件小事，抗击疫情更有安全感',
                    img:IMAGES.ICON_IMG_1,
                    icon:true,
                    type:4,
                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-post-detail?bizId=P1200143'
                },
                {
                    content:'【全力防疫】疫情当下返程防护指南！',
                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-post-detail?bizId=P1236865',
                    img:IMAGES.ICON_IMG_2,
                    type:5,
                },
                {
                    content:'【全力防疫】疫情当前，私家车防护指南！',
                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-post-detail?bizId=P1230061',
                    img:IMAGES.ICON_IMG_3,
                    type:6
                },
                {
//                    content:'【预防指南】做好这几件小事，抗击疫情更有安全感',
//                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-post-detail?bizId=P1200143',
                    content:'验车验本先别着急！ 疫情期间车驾管业务最全指南来了',
                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-post-detail?bizId=P1230093',
                    img:IMAGES.ICON_IMG_4,
                    type:7
                },
                {
                    content:'#抗击疫情|佩戴口罩的注意事项有哪些#',
                    url:'https://als.cdn.lifeapp.pingan.com.cn/elis_smp_als_dmz/r-act/index.html#/micro-community/share-topic-detail?bizId=T2521',
                    img:IMAGES.ICON_IMG_5,
                    type:8
                },
            ],
            topic1: [
                {
                    content1:'防疫期间',
                    content2:'年检代办暖心升级',
                    img:IMAGES.ICON_1,
                    type:2,
                    url:isWeixin()? 'https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Fmc%2Fnew_hcz_auth_page%3FpluginName%3D%25e5%25b9%25b4%25e6%25a3%2580%25e4%25bb%25a3%25e5%258a%259e%26url%3Dpars%253a%252f%252fpars.pingan.com%252fhealthcircle%252fcar_plugin_with_car_manage%253ftype%253dAnnualInspection%2526title%253d%2525E5%2525B9%2525B4%2525E6%2525A3%252580%2525E4%2525BB%2525A3%2525E5%25258A%25259E':'pars://pars.pingan.com/mc/new_hcz_auth_page?pluginName=%e5%b9%b4%e6%a3%80%e4%bb%a3%e5%8a%9e&url=pars%3a%2f%2fpars.pingan.com%2fhealthcircle%2fcar_plugin_with_car_manage%3ftype%3dAnnualInspection%26title%3d%25E5%25B9%25B4%25E6%25A3%2580%25E4%25BB%25A3%25E5%258A%259E'
                },
                {
                    content1:'抗“疫”进行时',
                    content2:'在家享更多车服务',
                    img:IMAGES.ICON_2,
                    type:3,
                    url:'https://m.lifeapp.pingan.com.cn/m/r-act/index.html#/micro-community/driver-club'
                },
            ],
            topic1: [
                {
                    content1:'防疫期间',
                    content2:'年检代办暖心升级',
                    img:IMAGES.ICON_1,
                    type:2,
                    url:isWeixin()? 'https://ulink.lifeapp.pingan.com.cn/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Fmc%2Fnew_hcz_auth_page%3FpluginName%3D%25e5%25b9%25b4%25e6%25a3%2580%25e4%25bb%25a3%25e5%258a%259e%26url%3Dpars%253a%252f%252fpars.pingan.com%252fhealthcircle%252fcar_plugin_with_car_manage%253ftype%253dAnnualInspection%2526title%253d%2525E5%2525B9%2525B4%2525E6%2525A3%252580%2525E4%2525BB%2525A3%2525E5%25258A%25259E':'pars://pars.pingan.com/mc/new_hcz_auth_page?pluginName=%e5%b9%b4%e6%a3%80%e4%bb%a3%e5%8a%9e&url=pars%3a%2f%2fpars.pingan.com%2fhealthcircle%2fcar_plugin_with_car_manage%3ftype%3dAnnualInspection%26title%3d%25E5%25B9%25B4%25E6%25A3%2580%25E4%25BB%25A3%25E5%258A%259E'
                },
                {
                    content1:'抗“疫”进行时',
                    content2:'在家享更多车服务',
                    img:IMAGES.ICON_2,
                    type:3,
                    url:'https://m.lifeapp.pingan.com.cn/m/r-act/index.html#/micro-community/driver-club'
                },
            ],
            show:false,
            showFighting:false,
            list:[],
            list2:[],
            timer1:null,
            timer2:null,
            playerOptions: {
                //播放速度
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                //如果true,浏览器准备好时开始回放。
                autoplay: true,
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
                    src: 'https://vdept.bdstatic.com/65716c744544535455506a59784a6235/7963517250325639/b272f983d650bc871e25ffbcb02fbc57206d353e06c0d33625fae3ae9467ffca4c531e1a0882c2d719760c86200f85d4.mp4?auth_key=1582184726-0-0-dbcd2bdfffb4a99f604c1433b5d971fb'
                }],
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
                    src: 'https://vdept.bdstatic.com/65716c744544535455506a59784a6235/7963517250325639/b272f983d650bc871e25ffbcb02fbc57206d353e06c0d33625fae3ae9467ffca4c531e1a0882c2d719760c86200f85d4.mp4?auth_key=1582184726-0-0-dbcd2bdfffb4a99f604c1433b5d971fb'
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
    methods: {
        init(){
            const arr = this.encourageList
            this.list.splice(0,this.list.length,...this.shuffle(arr))
            this.list2.splice(0,this.list2.length,...this.shuffle(arr))
            console.log(this.list)
            console.log( this.list2)
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
                    this.$nextTick(()=>{
//                        //移动速度，值越大速度越慢
                        this.timer1 = setInterval(()=>{
                            this.marquee(1)
                            this.marquee(2)
                        },20);
                    })
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
                    const Player1Time = videoPlayer1.player.currentTime()
                    videoPlayer2.player.currentTime(Player1Time)
                    videoPlayer2.player.play()
                })
            })
            logPlayVideo()
        },
        close(){
            this.$nextTick(()=>{
                const videoPlayer1 = this.$refs.videoPlayer1
                this.show = false
                videoPlayer1.player.play()
            })
        },
        marquee(index=1) {
            var box =  document.getElementById(`box${index}`);
            var divList = document.getElementById( `divList${index}`);
            var copyDiv = document.getElementById(`copyDiv${index}`);
            copyDiv.innerHTML = divList.innerHTML;
            //判断复制的信息是否到达box的最左边
            if (box.scrollLeft >= divList.scrollWidth) {
                box.scrollLeft = 0
            } else {
                box.scrollLeft++
            }
        },
        sendWish(statement){
            this.showFighting = false
            clearInterval(this.timer1)
            var box =  document.getElementById(`box1`);
            var divList = document.getElementById( `divList1`);
            box.scrollLeft = 50
            this.list.splice(1,1,{
                statement,
                ...this.userInfo

            })
            this.timer1 = setInterval(()=>{
                this.marquee(1)
                this.marquee(2)
            },20);
        },
        jump(type,url){
            console.log(111)
            if(isWeixin()){
                window.location.href = url;
            } else {
                navigateUrl(url)
            }
            const track = {
                1: ()=>{logBanner()},// 点击胶囊}
                2: ()=>{logNianJian()}, // 年检代办
                3: ()=>{logHomeServe()}, // zaijia
                4: ()=>{logCartXiaoDu()},
                5: ()=>{logFCZN()},
                6: ()=>{logCartFHZN()},
                7: ()=>{logJGYW()},
                8: ()=>{logKZThings()},
                9: ()=>{logMoreNews()},
            }[type]
            track()
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
                console.log(this.$store.getters.openid)
                this.getUserInfo()
                this.getEncourageList()
            }
        } else {
            this.getEncourageList()
        }

        this.$nextTick(() => {
            window.addEventListener("scroll", this.handleScroll);
        })
        logInit()
        logEnter()

    },
    destroyed() {
        clearInterval(this.timer1)
        window.removeEventListener("scroll", this.handleScroll);
    },
};
</script>
<style lang="less" rel="stylesheet/less">
    .home-page {
        .van-hairline--bottom::after {
            border-bottom-width: 0px;
        }
    }
</style>
<style lang="less" rel="stylesheet/less" scoped>
.home-page{
    .top-img{
        margin-bottom: -57px;
        position: relative;
        min-height:240px;
        background: url("../assets/images/handimg.png") no-repeat left top;
        background-size: 100% 100%;
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
    #box1,#box2{
        white-space: nowrap;
        vertical-align: top;
        #divList1,#divList2,#copyDiv1,#copyDiv2{
            overflow: hidden;
            margin-bottom:11px;
            display: inline-block;
            white-space: nowrap;
            .news{
                display: inline-block;
                height:46px;
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
        #divList1,#copyDiv1{
            .news{
                margin-right: 29px;
            }
        }
        #divList2,#copyDiv2{
            .news{
                margin-left: 29px;
            }
        }
    }
    #box2{
        #divList2,#copyDiv2{
            margin-bottom:0px;
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
        padding: 0 15px;
        .img-view{
            margin-top:10px;
            margin-bottom: 40px;
        }
    }
    .top-bar{
        background: url('../assets/images/handing02.png') no-repeat left center;
        background-size:contain;
    }
    .topic{
        position: relative;
        background:#FCEDE6;
        box-shadow:0px 1px 4px 0px rgba(254,199,163,1);
        border-radius:5px;
        padding:25px 22px 20px 20px;
        margin-top:42px;
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
