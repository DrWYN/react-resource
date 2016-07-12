export const SHOW_LOAD = 'SHOW_LOAD';
export const HIDE_LOAD = 'HIDE_LOAD';

export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

export function showLoad(isShow=false) {
	let type = isShow ? SHOW_LOAD : HIDE_LOAD;
	return {
		type: type,
		show: isShow
	}
}

export function showToast(info={},delay=500){
	return {
		type: SHOW_TOAST,
		show: true,
		delay: delay,
		info: info
	}
}

export function hideToast(){
	return {
		type: HIDE_TOAST,
		show: false,
		delay: 0,
		info: {}
	}
}

