module.exports = {
	path: 'react-player',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('./main.js'))
		}, 'reactPlayer');
	}
}
