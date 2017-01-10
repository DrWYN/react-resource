

export function showLoad(isShow=false) {
	let type = isShow ? Global.SHOW_LOAD : Global.HIDE_LOAD;
	return {
		type: type,
		show: isShow
	}
}

export function showToast(info={},delay=500){
	return {
		type: Global.SHOW_TOAST,
		show: true,
		delay: delay,
		info: info
	}
}

export function hideToast(){
	return {
		type: Global.HIDE_TOAST,
		show: false,
		delay: 0,
		info: {}
	}
}

