<template>
    <div class="panel result">
        <section class="body">
            <div class="icon" :class="status"></div>
            <div class="message">{{ message }}</div>
            <div class="tip">{{ tip }}</div>
        </section>
        <section class="foot">
            <button class="btn transparent cancel" v-if="cancelButton && isShowCancel" @click="handleClick(cancelButton.event)">
                {{ cancelButton.name }}
            </button>
            <button class="btn confirm" v-if="confirmButton" @click="handleClick(confirmButton.event)">
                {{ confirmButton.name }}
            </button>
        </section>
    </div>
</template>

<script>
export default {
    name: 'PageResult',
    props: {
        // 结果状态 'success'、'fail'、'logo'
        status: {
            type: String,
            default: 'logo'
        },
        // 信息
        message: {
            type: String,
            default: ''
        },
        // 提示
        tip: {
            type: String,
            default: '如有异议请联系客服'
        },
        isShowCancel: {
            type: Boolean,
            default: true
        },
        // 返回按钮
        cancelButton: {
            type: Object,
            default() {
                return {
                    name: '返回首页',
                    event: 'home'
                };
            }
        },
        // 确认按钮
        confirmButton: {
            type: Object,
            default() {
                return null;
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        handleClick(env) {
            console.log(env);
            this.$emit(`${env}`);
            if (env === 'home') {
                this.$router.push({ path: '/' });
            } else if (env === 'register') {
                this.$router.push({ path: 'register' });
            }
        }
    }
};
</script>
<style lang="less" scoped rel="stylesheet/less">
.result {
    padding: 15px;
    .body {
        background: @colorWhite;
        padding: 30px 15px;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        border-radius: 10px;
        div {
            line-height: 28px;
        }
        .message {
            font-size: 15px;
            font-weight: bold;
        }
        .tip {
            color: #666;
            @fontSmall: 12px;
        }
    }
    .icon {
        display: inline-block;
        width: 100px;
        height: 100px;
        background-size: contain;
        margin: 0 auto;
        margin-bottom: 15px;
        background: url('~@/assets/images/success.png') no-repeat center center;
        background-size: contain;
        &.fail {
            background-image: url('~@/assets/images/fail.png');
        }
    }
    .foot {
        .btn {
            width: 345px;
            height: 40px;
            line-height: 40px;
            background: @colorPrimary;
            color: @colorWhite;
            border-radius: 20px;
            margin-top: 15px;
        }
    }
}
</style>
