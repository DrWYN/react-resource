import React, {Component} from 'react';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/commonActions'

class ShowLoader extends Component{
	constructor(props){
		super(props);
		this.state = {
			isShow: false,
			showToast: false
		}
	}

	handleLoaderClick(){
		
		this.props.dispatch(Actions.showLoad(!this.state.isShow));
		this.setState({isShow: !this.state.isShow});
	}
	handleToastClick(){
		this.props.dispatch(Actions.showToast({msg: "show toast!!"},1000));
	}

	render(){
		return (
			<div>
				<button onClick={this.handleLoaderClick.bind(this)}>loader showing: {this.state.isShow + ''}</button> <br/>
				<button onClick={this.handleToastClick.bind(this)}>toast showing</button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
			showLoader: bindActionCreators(Actions.showLoad, dispatch)
		}
	}

export default connect(mapDispatchToProps)(ShowLoader)