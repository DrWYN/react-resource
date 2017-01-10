module.exports = {
	path: 'showtab',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('./main.js'))
		}, 'showtab');
	}
}
