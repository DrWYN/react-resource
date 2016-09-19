import React, {Component,PropTypes} from 'react';
import ReactDOM from "react-dom";
import styles from './unfoldTab.scss';

export default class UnfoldTab extends Component{
	constructor(props) {
     super(props);
     this.state = {
     	showUl: false
     }
   }

   //点击Tab对应的事件
   handleTabClick(index){
     const { onTabClick } = this.props;
     onTabClick && onTabClick(index);
   }

   handleUlTabClick(e){
   		// console.log('----------->>>handleUlTabClick',e.target.dataset);
   		let index = e.target.dataset.tag;
   		
   		if(index === undefined || index === null) return;

   		let itemsContainerDom = ReactDOM.findDOMNode(this.refs.itemsContainer);
   		itemsContainerDom.scrollLeft = index * 90;

   		this.handleTabClick(index);
   }

   showUl(){
   	this.setState({showUl: !this.state.showUl});
   }

   render() {
     const { items, index } = this.props;

     // tab条
     let tabStyle = this.props.tabStyle || {};
      
     // 单个tab
     let tabDefaultStyle = this.props.tabDefaultStyle || {};
     let tabActiveStyle = this.props.tabActiveStyle || {};
     let tabDisableStyle = this.props.tabDisableStyle || {};

     if(items.length > 4){
        tabStyle.width = 90 * items.length;
     }

     let showMore = false;
     if(items.length > 7){
		showMore = true;
     }

     return(
     	<div className={styles.tabContainer}>
     		<div className="flex">
				<div className={styles.itemsContainer + " flex-1"} ref="itemsContainer">
			        <ul className={styles.sTabs + ' flex'} style={tabStyle} >
			           {
			             items&&items.map((item, i) => {
			               const style = parseInt(index) === i ? tabActiveStyle : tabDefaultStyle
			               return(
			                 <li
			                   key={i}
			                   className={styles.sTab + ' clickable flex-1'}
			                   onClick={this.handleTabClick.bind(this, i)}>
			                    <div style={style} className={styles.sTabText}>
			                      <div className={styles.sTabTitle}>{item.title || ""}</div>
			                      <div className={styles.sTabSubtitle}>{item.subtitle || ""}</div>
			                    </div>
			                 </li>
			               )
			             })
			           }
			         </ul>
		      	</div>
		      	<div className={"clickable " + styles.moreIcon + ' ' + (showMore ? styles.show : styles.hide)} onClick={this.showUl.bind(this)}>
		      		<i className="icon icon-next"/>
		      	</div>
     		</div>
     		<div className={"clickable " + styles.itemsUl + ' ' + (this.state.showUl ? styles.show : styles.hide)} onClick={this.handleUlTabClick.bind(this)}>
     			<ul>
			           {
			             items&&items.map((item, i) => {
			               const style = parseInt(index) === i ? tabActiveStyle : tabDefaultStyle
			               return(
			                 <li
			                   key={i}
			                   style={style}>
			                      <div data-tag={i}>{item.title || ""}</div>
			                 </li>
			               )
			             })
			           }
			    </ul>
     		</div>
     	</div>
     );
   }
}

// export default StickTop('stick-searchbox')(SearchInput);

