import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Toast extends Component {
	render() {
		let { show, info } = this.props;
		return (
			<div className={"toast " + (show ? "show" : "hide")}>
					{info.msg}
				<div></div>
			</div>
		);
	}
}

function mapStateToProps(state){
	const {show,delay,info} = state.global.toast;
	return {
		show: show,
		delay: delay,
		info: info
	};
}

export default connect(mapStateToProps)(Toast)