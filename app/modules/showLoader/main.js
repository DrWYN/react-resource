import {Component} from 'react';

export default class ShowLoader extends Component{
	constructor(props){
		super(props);
		this.state = {
			isShow: false,
			showToast: false
		}
	}

	handleLoaderClick(){
		
		bindActions.showLoad(!this.state.isShow);
		this.setState({isShow: !this.state.isShow});
	}
	handleToastClick(){
		bindActions.showToast({msg: "show toast!!"},1000);
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