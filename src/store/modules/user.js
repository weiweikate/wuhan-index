import { API } from '../../api';

const user = {
	namespaced: true,
	state: {
		token: '',
		info: {}
	},

	mutations: {
		LOGOUT: (state) => {
			state.token = '';
		},
		SET_TOKEN: (state, data) => {
			state.token = data;
		},
		SET_INFO: (state, data) => {
			state.info = data;
		},
		SET_OPENID:(state, data) => {
			state.openid = data;
		}
	},

	actions: {
		// 登录
		LogIn({ commit, state }, token) {
			commit('SET_TOKEN', token);
		},
		Logout({ commit, state }) {
			return new Promise((resolve, reject) => {
				commit('SET_TOKEN', '');
				resolve('退出登录');
			});
		}
	}
};

export default user;
