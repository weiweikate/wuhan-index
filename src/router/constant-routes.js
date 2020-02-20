const Home = () => import(/* webpackChunkName: "error" */ '@/views/home');
export default [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: '隐形战役',
            noAuth: true,
            keepAlive: false
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
];
