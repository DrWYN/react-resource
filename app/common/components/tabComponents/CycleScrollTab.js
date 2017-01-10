import React, {Component,PropTypes} from 'react';
import ReactDOM from "react-dom";
import styles from './cycleScrollTab.scss';

//仿淘宝秒杀滑动tab组件
/*
	items: 数据列表（包含title和subTTitle）
	index: 当前选中为第index个tab
	tabDefaultStyle: 默认状态下tab的style
	tabActiveStyle: 选中状态下tab的style
	onTabClick: 点击tab触发的回调函数
*/

export default class CycleScrollTab extends Component{
	constructor(props){
		super(props);
		this.state = {
			item_width: 0
		}
	}
 	componentDidMount(){
        this.scrollContainerDom = ReactDOM.findDOMNode(this.refs.scrollTabContainer);
        let item_width = this.scrollContainerDom.clientWidth/5;  //定义每行几个

        this.setState({item_width: item_width});
   	}
	handleScroll(e){
	 	let dom = e.target;
	    // console.log('--------->>>>>>>>>>>>>>>>>dom.width',dom.scrollWidth);
	    // console.log('--------->>>>>>>>>>>>>>>>>dom.scrollLeft',dom.scrollLeft);
	    if(dom.scrollLeft > dom.scrollWidth/2){ //向左无线滚动
	      dom.scrollLeft = 0;
	    }
	    //  else if(dom.scrollLeft < 1){  //向右无线滚动、移动端会卡顿
	    //   dom.scrollLeft = dom.scrollWidth/2;
	    // }
	}
	handleTabClick(index){
		index = (index%this.props.items.length);
	    // console.log('------>>>>click index',index); //this.props.items.length = 8
	    // this.props.onTabClick((index%this.props.items.length));
	    this.setState({index: index});
	    const { onTabClick } = this.props;
	     onTabClick && onTabClick(index);
	}
	render(){
		const {items, index} = this.props;
		// tab条
     	let tabStyle = {};
     	tabStyle.width = (items.length > 5) ? (this.state.item_width * items.length * 2) : ("100%");

     	//单个tab style
		let tabDefaultStyle = this.props.tabDefaultStyle || {};
     	let tabActiveStyle = this.props.tabActiveStyle || {};
     	// let currentStyle = this.props.currentStyle || {color: "#ff2f7a"};

     	let clone_items = [];
	     if(items.length > 5){
	      clone_items = items.concat(items);
	     }else{
	      clone_items = items;
	     }

		return (
			<div className={styles.tabContainer} ref="scrollTabContainer" onScroll={this.handleScroll.bind(this)}>
				<ul className="flex" style={tabStyle}>
					{
						clone_items&&clone_items.map((item, i) => {
							let style = ((parseInt(i%items.length) === index) ? tabActiveStyle : tabDefaultStyle);
							// if(item.status === 0){
				   //              style = ((parseInt(i%items.length) === index) ? tabActiveStyle : currentStyle);;
				   //             }
				   			return (
				   				<li key={i} style={style} className={'clickable flex-1 ' + styles.sTab} onClick={this.handleTabClick.bind(this, i)}>
				   					<div className={styles.sTabText}>
					   					<div>{item.title}</div>
										<div>{item.subTitle}</div>
									</div>
				   				</li>
				   			);
						})
					}
				</ul>
			</div>
		);
	}
}

CycleScrollTab.defaultPropTypes = {
	index: 0,
}

CycleScrollTab.propTypes = {
	items: PropTypes.array,
	index: PropTypes.number,
	tabDefaultStyle: PropTypes.object,
	tabActiveStyle: PropTypes.object,
  	onTabClick: PropTypes.func,
};

