
const initialState = {
	load: {show: false},
	toast: {show: false,delay: 0,info: {}},
};

export const global = (state=initialState,action) => {
	switch(action.type){
		case Global.SHOW_LOAD:
		case Global.HIDE_LOAD:
			return Object.assign({}, state, {
				load: {show: action.show}
			});
			break;
		case Global.SHOW_TOAST:
		case Global.HIDE_TOAST:
			return Object.assign({},state,{
				toast:{show:action.show,delay: action.delay,info: action.info}
			});
			break;
		default: 
			return state;
	}
}