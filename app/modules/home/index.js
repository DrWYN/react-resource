module.exports = {
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('./main.js'))
		}, 'home');
	}
}
