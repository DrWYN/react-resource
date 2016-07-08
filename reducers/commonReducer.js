import * as commonActions from '../actions/commonActions';

const initialState = {
	load: {show: false},
	toast: {show: false,delay: 0,info: {}},
};

export const global = (state=initialState,action) => {
	switch(action.type){
		case commonActions.SHOW_LOAD:
		case commonActions.HIDE_LOAD:
			return Object.assign({}, state, {
				load: {show: action.show}
			});
			break;
		case commonActions.SHOW_TOAST:
		case commonActions.HIDE_TOAST:
			return Object.assign({},state,{
				toast:{show:action.show,delay: action.delay,info: action.info}
			});
			break;
		default: 
			return state;
	}
}