<template>
    <div class="page-empty">
        <div>
            <slot name="empty-icon">
                <img src="../../../src/assets/images/page-empty.png" class="page-empty-icon" />
            </slot>
        </div>
        <div class="empty-tips">{{ tips }}</div>
        <div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageEmpty',
    props: {
        tips: {
            type: String,
            default: '暂无数据~'
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.page-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 90px;
    .page-empty-icon {
        width: 160px;
    }
    .empty-tips {
        font-size: 13px;
        margin: 10px 0;
        font-weight: 400;
    }
}
</style>
