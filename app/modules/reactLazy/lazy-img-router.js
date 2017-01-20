module.exports = {
	path: 'lazy-img',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('./lazyImage.js'))
		}, 'lazyImage');
	}
}
