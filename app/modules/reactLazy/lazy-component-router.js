module.exports = {
	path: 'lazy-component',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('./lazyComponent.js'))
		}, 'lazyComponent');
	}
}
