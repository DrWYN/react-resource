module.exports = {
	path: 'lazy-load',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('./main.js'))
		}, 'lazyLoad');
	}
}
