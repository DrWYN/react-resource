module.exports = {
	path: 'showloader',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('./main.js'))
		}, 'showloader');
	}
}
