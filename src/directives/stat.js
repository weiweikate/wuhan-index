/*
<div v-stat="{type:'click',desc:'do'}">
*/
export default {
    bind(el, binding) {
        el.addEventListener(
            'click',
            () => {
                // const data = binding.value;
                // const prefix = 'store';
                // analytics.request({
                //     ty: `${prefix}_${data.type}`,
                //     dc: data.desc || ''
                // }, 'n');
            },
            false
        );
    }
};
