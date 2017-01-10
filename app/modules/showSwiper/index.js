module.exports = {
	path: 'showswiper',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('./main.js'))
		}, 'showswiper');
	}
}
