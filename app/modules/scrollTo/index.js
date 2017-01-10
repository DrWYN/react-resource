module.exports = {
	path: 'scrollto',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('./main.js'))
		}, 'scrollto');
	}
}
