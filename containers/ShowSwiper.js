import React, {Component} from 'react';
import Swiper from '../components/swiper';

export default class ShowSwiper extends Component{
	constructor(props){
		super(props);
		// this.handleItemClick = this.handleItemClick.bind(this);
	}

	handleItemClick(index){
		console.log(index);
	}

	renderImageSwiper(){
		let items = [require('../testImgs/homeBanner.jpg'),require('../testImgs/luckyBanner.jpg'),require('../testImgs/successBanner.jpg')];
		return (
			<Swiper touch={true} autoPlay={true}>
				{
					items&&items.map((item, i) => {
						return (
							<div key={i} onClick={this.handleItemClick.bind(this,i)}>
								<img src={items[i]} style={{width: '100%'}}/>
							</div>
						);			
					})
				}
			</Swiper>
		);
	}

	renderTextSwiper(){
		let updateTime = 3;
		let tips = [{text: "test11111111"}, {text: "test222222222"}, {text: "test3333333"}];

		 return (
		 	<div style={{height: "30px", overflow: "hidden"}}>
			 	<Swiper dir={'v'} autoplay={true} dots={false} interval={Number(updateTime)||0} touch={false}>
			 		{
			 			tips&&tips.map((tip, i) => {
			 				return (
			 					<div key={i} style={{height: "30px", lineHeight: '30px'}}>{tip.text}</div>
			 				);
			 			})
			 		}
			 	</Swiper>
		 	</div>
		 );
	}

	render(){
		// const req = require.context('../testImgs', true, /\.(png|jpg|gif)$/);
		
		return (
			<div>
				{this.renderImageSwiper()}
				{this.renderTextSwiper()}
			</div>
		);
	}
}