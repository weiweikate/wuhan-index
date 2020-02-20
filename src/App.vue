<template>
    <div id="app">
        <keep-alive :exclude="views">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'App',
    data() {
        return {};
    },
    computed: {
        ...mapState({
            views: state => {
                return state.exclude.views || [];
            }
        })
    },
    watch: {
        $route(to, from) {}
    },
    created() {
        setTimeout(() => {
            console.log('欢迎访问...', this.$route.name, this.$route.meta.keepAlive);
        }, 0);
    }
};
</script>

<style lang="less">
#app {
    font-family:PingFangSC-Regular,PingFang SC;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: @colorFont;
    /*overflow: auto;*/
}
</style>
