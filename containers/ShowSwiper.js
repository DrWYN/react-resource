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

	render(){
		// const req = require.context('../testImgs', true, /\.(png|jpg|gif)$/);
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
}