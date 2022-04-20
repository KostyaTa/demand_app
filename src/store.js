import Vuex from 'vuex'
import Cookies from 'js-cookie';

export default new Vuex.Store({
    state: {
        token: null,
    },
    mutations: {
		SET_TOKEN(state, token) {
		    state.token = token;
		},
	 	REMOVE_TOKEN(state) {
	   		state.token = null;
	  	},
    },
  	actions: {
        LogIn({commit}, token) {

		   commit('SET_TOKEN', token)

            Cookies.set('X-CSRF-TOKEN', token)
            
        },

        logOut({commit}) {
            Cookies.remove('X-CSRF-TOKEN')
            commit('REMOVE_TOKEN')
        }
    }
})