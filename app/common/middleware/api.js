
function callApi(payload) {
	let data = payload;
	let api = 'http://nero-zou.com/test';
	return fetch(api, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
        		'Content-Type': 'application/json' //记得加上这行，不然bodyParser.json() 会识别不了
			},
			// body: '_mt=snscenter.getSubjectCount&_sm=md5&_sig=98b0c21542e32e11d6b68f46c57bd2d7'
			body: JSON.stringify({
		        name: "nero",
		        email: "Nero@Nero-zou.com"
		    })

		})
		.then(response => response.json())
}

export default store => next => action => {
	const callAPI = action[Global.CALL_API];
	// console.log('---->>>>callAPI', callAPI);
	// 如果没要CALL_API标志，跳过该中间件
	if (typeof callAPI === 'undefined') {
		return next(action);
	}
	let {
		payload
	} = callAPI;
	const {
		types
	} = callAPI;

	function actionWith(data) {
		// console.log('------>>>>>>actionWith ', data);
		const finalAction = Object.assign({}, action, data);
		delete finalAction[Global.CALL_API];
		return finalAction;
	}

	const [successType, requestType, finishType, apiFailureType, businessFailureType] = types;

	// 请求开始事件（例如：显示载入图标）
	if (requestType) {
		next(actionWith({
			type: requestType
		}));
	}

	return callApi(payload)
		.then((data) => {
			// console.log('------data', data);
			// 请求完成事件（例如：隐藏载入图标）
			if (finishType) {
				next(actionWith({
					type: finishType,
					systime: data.stat.systime
				}));
			}
			if (data && data.stat && data.stat.code < 0) {
				var tokenCodes = [-380, -370, -360, -340, -320, -300, -180];
				if (tokenCodes.indexOf(data.stat.code) !== -1) {
					var errorCode = data.stat.code;
					if (errorCode === ErrorCode.RISK_USER_LOCKED ||
						errorCode === ErrorCode.NO_ACTIVE_DEVICE ||
						errorCode === ErrorCode.NO_TRUSTED_DEVICE ||
						// 怕出问题,先注释掉
						// errorCode === ErrorCode.TOKEN_ERROR ||
						errorCode === ErrorCode.SIGNATURE_ERROR) {
						Util.needReLogin(payload.noJump);
					} else {
						Util.renewToken(payload.noJump);
					}
				}
				// return next(actionWith({
				//   type: apiFailureType,
				//   error: 'state code lt 0'
				// }))
			} else if (data && data.stat && data.stat.stateList && data.stat.stateList.length > 0 && data.stat.stateList[0].code !== 0) {
				// API请求成功，业务逻辑错误
				return next(actionWith({
					type: businessFailureType,
					content: {
						ext: 'businessFail',
						data: data
					}
				}));
			} else if (data) {
				// 请求成功
				return next(actionWith({
					type: successType,
					content: data
				}));
			}
		}, error => next(actionWith({
			type: apiFailureType,
			error: error.message || 'Something bad happened'
		})));
};
