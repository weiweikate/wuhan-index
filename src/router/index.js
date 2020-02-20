/**
 * @description: 路由
 */
import Vue from 'vue';
import Router from 'vue-router';
import constantRoutes from './constant-routes';

const modules = {};
const routes = [];
const requireContext = require.context('@/router/modules', true, /\.js/);
const requireAll = (context) => {
	context.keys().forEach((key) => {
		modules[key] = requireContext(key).default || requireContext(key);
	});
};

requireAll(requireContext);
Object.values(modules).forEach((item) => {
	routes.push(...item);
});

Vue.use(Router);
const router = new Router({
	// mode: 'history',
	mode: 'hash',
	scrollBehavior: () => ({ y: 0 }),
	routes: routes.concat(constantRoutes)
});
export default router;
