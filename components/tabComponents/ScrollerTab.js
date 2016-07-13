
import React, {Component, PropTypes} from 'react';
import ReactDOM from "react-dom";
import styles from './scrollTab.scss';

//仿淘宝秒杀滑动tab组件
/*
	items: 数据列表（包含title和subTTitle）
	index: 当前选中为第index个tab
	tabDefaultStyle: 默认状态下tab的style
	tabActiveStyle: 选中状态下tab的style
	onTabClick: 点击tab触发的回调函数
*/

export default class ScrollerTab extends Component{

	constructor(props){
		super(props);
		this.state = {
			item_width: 0
		}
	}

	componentDidMount(){
		this.scrollContainerDom = ReactDOM.findDOMNode(this.refs.scrollContainer);
	    let item_width = this.scrollContainerDom.clientWidth/5;  //定义每行几个

	    //this.scrollContainerDom.scrollLeft = this.props.index * item_width;

	    this.setState({item_width: item_width});
	}

	componentWillReceiveProps(nextProps){
	    if(nextProps.index !== this.props.index){
	      this.handleTabClick(nextProps.index);
	    }
	}

	handlerScroll(e){

	     if(this.counter){
	      clearTimeout(this.counter);
	     }


	    let dom = e.target;
	     this.counter = setTimeout(() => {
	      let index = this.getIndexByPosition(dom.scrollLeft, this.state.item_width);
	      dom.scrollLeft =  index* this.state.item_width;

	      const { onTabClick } = this.props;
	     // onTabClick && onTabClick(index+2);
	     onTabClick && onTabClick(index);
	    }, 300);
	}

	handleTabClick(index){
	    this.scrollContainerDom = ReactDOM.findDOMNode(this.refs.scrollContainer);
	    // scrollContainerDom.scrollLeft = (index - 2) * this.item_width;
	    this.scrollContainerDom.scrollLeft = index * this.state.item_width;

	     const { onTabClick } = this.props;
	     onTabClick && onTabClick(index);
	}

   //position: scrollLeft  base: 基数，每个li宽度，现在是 this.item_width
   getIndexByPosition(position,base){
      return Math.round(position/base);
   }

	render(){
		const {items, index} = this.props;

		// tab条
     	let tabStyle = {};

		//单个tab style
		let tabDefaultStyle = this.props.tabDefaultStyle || {};
     	let tabActiveStyle = this.props.tabActiveStyle || {};

     	if(items.length > 1){
	        tabStyle.width = this.state.item_width * items.length;
	        //paddingLeft + paddingRight + 1 === 每行个数  如，现在一行5个 === 2 + 2 + 1
	        tabStyle.paddingLeft = this.state.item_width * 2;
	        tabStyle.paddingRight = this.state.item_width * 2;
	     } else {

	     }

		return (
			<div className={styles.tabContainer} ref="scrollContainer" onScroll={this.handlerScroll.bind(this)}>
				<ul className="flex" style={tabStyle}>
					{
						items&&items.map((item, i) => {
							const style = ((parseInt(index) === i) ? tabActiveStyle : tabDefaultStyle);

							return (
								<li key={i} className={'clickable flex-1 ' + styles.sTab} onClick={this.handleTabClick.bind(this, i)}>
									<div style={style} className={styles.sTabText}>
										<div>{item.title}</div>
										<div>{item.subTitle}</div>
									</div>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}

ScrollerTab.defaultPropTypes = {
	index: 0,
}

ScrollerTab.propTypes = {
	items: PropTypes.array,
	index: PropTypes.number,
	tabDefaultStyle: PropTypes.object,
	tabActiveStyle: PropTypes.object,
  	onTabClick: PropTypes.func,
};

