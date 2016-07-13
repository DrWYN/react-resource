import React, {Component} from 'react';

import ScrollerTab from '../components/tabComponents/ScrollerTab';
import CycleScrollTab from '../components/tabComponents/CycleScrollTab';

export default class ShowTab extends Component{
	constructor(props){
		super(props);
		this.state = {
			index: 0
		}
	}
	handleScrollTabClick(index){
		console.log('scroller tab index --->>'+index);
		this.setState({index: index});
	}
	//仿淘宝秒杀tab组件
	renderScrollTab(){
		let items = [{title: 'aaa', subTitle: '1.00'},{title: 'aaa', subTitle: '1.00'},{title: 'aaa', subTitle: '1.00'},{title: 'aaa', subTitle: '1.00'}];
		let tabDefaultStyle = {color: '#000'};
		let tabActiveStyle = {color: 'red'};
		return (
			<div>
				仿淘宝秒杀tab组件
				<ScrollerTab 
					items={items} 
					index={this.state.index} 
					tabDefaultStyle={tabDefaultStyle}
					tabActiveStyle={tabActiveStyle}
					onTabClick={this.handleScrollTabClick.bind(this)}/>
			</div>
		)
	}
	//无线循环tab
	renderCycleScrollTab(){
		let items = [{title: 'aaa', subTitle: '1.00'},{title: 'bbb', subTitle: '1.00'},{title: 'ccc', subTitle: '1.00'},
		{title: 'ddd', subTitle: '1.00'},{title: 'eee', subTitle: '1.00'},{title: 'fff', subTitle: '1.00'}];
		// 单个tab
	      let tabDefaultStyle = {
	         color: '#666',
	        backgroundColor: '#fff',
	        borderColor: 'transparent'
	      }
	      let tabActiveStyle = {
	        color: '#000',
	        backgroundColor: '#f9d336',
	        borderColor: 'transparent',
	        backgroundImage: "linear-gradient(rgb(237,67,121), rgb(237,67,121))",
	        backgroundSize: "60% 2px",
	        backgroundRepeat: "no-repeat",
	        backgroundPosition: "center bottom"
	      }
		return(
			<div>
				无线循环tab
				<CycleScrollTab
					index={this.state.index}
		            items={items}
		            tabDefaultStyle = {tabDefaultStyle}
		            tabActiveStyle = {tabActiveStyle}
		            onTabClick={this.handleScrollTabClick.bind(this)}/>
			</div>
		);
	}

	render(){
		return (
			<div>
				{this.renderScrollTab()}
				{this.renderCycleScrollTab()}
			</div>
		);
	}
}