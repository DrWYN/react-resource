import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../styles/common.scss';

import * as Actions from '../actions/commonActions'

export default class Toast extends Component {

	constructor(props){
		super(props);
		this.state = {
			isShowing: false
		}
	}

	componentWillReceiveProps(nextProps){
		if(this.state.isShowing) return;
	    if(nextProps.show){
	    	this.setState({isShowing: true});
	    	setTimeout(() => {
	    		this.props.dispatch(Actions.hideToast());
	    		this.setState({isShowing: false});
	    	}, nextProps.delay);
	    }
	  }

	render() {
		let { show, info } = this.props;
		return (
			<div className={styles.toast + " " + (show ? styles.show : styles.hide)}>
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