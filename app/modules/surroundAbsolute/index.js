module.exports = {
	path: 'surroundAbsolute',
	getComponent(nextState, cb){
		require.ensure([], require => {
			cb(null, require('./main.js'))
		}, 'surroundAbsolute')
	}
}