import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './style.scss';
import { getRAF, getStylePrefix, isSupportTransform3D, loadImg, isEqual } from '../../libs/util';
// 轮播组件
/*
  index: 0
  dots: 是否显示,
  autoplay: 是否自动播放,
  canSwiper: 是否可以滑动,
  dir: 轮播方向,
  touch: 是否可以左右滑动
  interval: 时间间隔（s)
*/
export default class Swiper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      style: {}
    }

		this.canTouch = true;
    this.canSwiper = false;
		this.threshold = 5;
		this.touchAngle = 60;
    this.duration = 350;
		this.resistanceRatio = 0.9;
    // Swiper的一级子元素，图片懒加载用
    this.children = {};
    // 懒加载部分的偏移量
    this.loadOffset = 0;
    // this.startTime = 0;
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
    // this.handleTouchCancel = this.onTouchCancel.bind(this);
    // CSS 兼容性
    let prefix = getStylePrefix('transform');
    if (prefix === '') {
      this.transform = 'transform';
      this.transProperty = 'transform';
    } else {
      this.transform = `${prefix}Transform`;
      this.transProperty = `-${prefix}-transform`;
    }
    prefix = getStylePrefix('transitionProperty');
    prefix = prefix === '' ? 't' : `${prefix}T`;
    this.transformStyle = isSupportTransform3D() ? 'translate3d' : 'translate';
    this.transProperty = prefix === 't' ? 'transform' : `-${prefix}-transform`;
    this.transitionProperty = `${prefix}ransitionProperty`;
    this.transitionTimingFunction = `${prefix}ransitionTimingFunction`;
    this.transitionDuration = `${prefix}ransitionDuration`;
    this.transitionEnd = prefix === 't' ? 'transitionend' : `${prefix}ransitionEnd`;
  }
  
  componentWillMount() {
    const { className, dir } = this.props;
    this.className = dir === 'h' ? styles.swiperWraper : styles.swiperVertical;
    if (className) {
      this.className += ` ${className}`;
    }
  }
  // 有update时候 initData等执行两次，待优化
  componentDidMount() {
    this.initData();
    if (!this.canSwiper) return;
    this.setState({ style: this.setStyle() }, () => {
			this.autoPlay();
		});
  }
  componentDidUpdate(prevProps) {
    // if (this.props.lazyload && this.props.update && (this.props.update !== prevProps.update)) {
    if (!isEqual(this.props.children, prevProps.children)) {
      if (this.props.lazyload) this.clearImg();
      this.stopAutoPlay();
      this.initData();
      this.setState({ currentIndex: 0, style: this.setStyle() }, () => {
        this.smoothMoveToIndex(0);
        this.canSwiper && this.autoPlay();
      });
    }
  }
  componentWillUnmount() {
		this.stopAutoPlay();
	}
	initData() {
		const { children, dir, interval, touch, canSwiper, lazyload, loadOffset } = this.props;
    const count = React.Children.count(children);
    this.canSwiper = count > 1;
    this.canSwiper = this.canSwiper && canSwiper;
    this.maxIndex = count || 1;
    if (!this.canSwiper) {
      if ( lazyload && count === 1) {
        this.children = { 0: this.swiperContainer.getDOMNode().childNodes[0] };
        this.lazyLoadImg(0);
      }
      return;
    }
		this.isHorizontal = dir === 'h';
		this.interval = (interval || 3) * 1e3;
		// this.canTouch = this.canTouch || touch;
    this.touch = Boolean(touch);
    // this.distance = this.isHorizontal ? React.findDOMNode(this).scrollWidth/(this.maxIndex+1) : React.findDOMNode(this).clientHeight/(this.maxIndex+1);
    this.distance = this.isHorizontal ? findDOMNode(this).clientWidth : findDOMNode(this).clientHeight / (this.maxIndex + 1);
    if (lazyload) {
      let index = 0;
      const childrenObj = {};
      const children = this.swiperContainer.getDOMNode().childNodes;
      for (let i = 0; i < children.length; i++) {
        childrenObj[index] = children[i];
        index++;
      }
      this.children = childrenObj;
      if (loadOffset && !isNaN(Number(loadOffset))) {
        this.loadOffset = loadOffset;
        for (let i = 0; i <= loadOffset; i++) {
          this.lazyLoadImg(i);
        }
      } else {
        this.lazyLoadImg(0);
      }
      if (count > 1) this.lazyLoadImg(this.maxIndex);
    }
	}
	// 水平方向可以滑动
	handleTouchStart(e) {
    if (!this.touch || !this.canSwiper) return;
		if (!this.canTouch || !this.isHorizontal) {
      e.stopPropagation();
      e.preventDefault();
      return; // return false;
    }
		this.stopAutoPlay();
    this.startTime = Date.now();
		this.scrolling = true;
		this.startX = e.changedTouches[0].pageX;
		this.startY = e.changedTouches[0].pageY;
    this.baseX = -this.state.currentIndex * this.distance;
		this.direction = 0;
    this.moveOffset = 0;
		// if (u.device.ios && u.params.iOSEdgeSwipeDetection && i <= u.params.iOSEdgeSwipeThreshold) {
    //     return
    // }
	}
	handleTouchMove(e) {
    if (!this.touch || !this.canSwiper) return;
		if (!this.scrolling) return;
		const pageX = e.changedTouches[0].pageX;
    const pageY = e.changedTouches[0].pageY;
    const angle = Math.atan2(Math.abs(pageY - this.startY), Math.abs(pageX - this.startX)) * 180 / Math.PI;
    if (this.isHorizontal) {
      if (angle > this.touchAngle) {
        this.canTouch = false;
      } else {
        e.preventDefault();
      }
    } else {
      if (90 - angle > this.touchAngle) {
        this.canTouch = false;
      } else {
        e.preventDefault();
      }
    }
    if (this.canTouch) {
      let moveOffset = pageX - this.startX;
      this.direction = moveOffset === 0 ? this.direction : moveOffset > 0 ? -1 : 1;
      if (this.direction === -1) {
        moveOffset = -1 + Math.pow(moveOffset, this.resistanceRatio);
      } else if (this.direction === 1) {
        moveOffset = 1 - Math.pow(-moveOffset, this.resistanceRatio);
      }
      this.moveOffset = moveOffset;
      this.currentX = this.baseX + moveOffset;
      this.setState({ style: this.setStyle(this.currentX) });
    }
	}
	handleTouchEnd() {
    if (!this.touch || !this.canSwiper) return;
    this.scrolling = false;
    if (this.canTouch) {
      // 响应Banner的点击事件
      if (Math.abs(this.moveOffset) < 2) {
        this.handleClick();
        this.autoPlay();
        return;
      }
      let currentIndex = this.state.currentIndex;
      // 正常的touchEnd事件//&& Date.now()-this.startTime>50（暂时取消了时间约束）
      if (Math.abs(this.moveOffset) > this.threshold) {
        currentIndex = -this.currentX / this.distance;
        currentIndex = this.direction > 0
          ? Math.ceil(currentIndex)
          : this.direction < 0
            ? Math.floor(currentIndex)
            : Math.round(currentIndex);
        // if (currentIndex >= this.maxIndex) {
        //   currentIndex = 0
        // }
      }
      this.smoothMoveToIndex(currentIndex);
      this.autoPlay();
    } else {
      this.canTouch = true;
      this.autoPlay();
    }
	}
	// handleTouchCancel() {
  //   if (!this.touch) return;
  //   this.scrolling = false;
  //   this.autoPlay();
  // }
  handleClick() {
    // if (this.clickSafe === true) {
		// 	e.preventDefault();
    //   e.stopPropagation();
    //   e.nativeEvent.stopPropagation();
		// }
    const { onItemClick } = this.props;
    onItemClick && onItemClick(this.state.currentIndex);
  }
  clearImg() {
    const { defaultImg } = this.props;
    if (defaultImg) return;
    const children = [...this.swiperContainer.getDOMNode().childNodes];
    for (const child of children) {
      const imgs = [...child.getElementsByTagName('img')];
      for (const img of imgs) {
        if (img.src !== defaultImg) {
          img.src = defaultImg;
          img.dataset.lazyloadflag = 0;
        }
      }
    }
  }
  lazyLoadImg(index) {
    if (!this.children || !this.children[index]) return;
    const child = this.children[index];
    const imgDoms = [...child.getElementsByTagName('img')];
    if (imgDoms) {
      for (const imgDom of imgDoms) {
        loadImg(imgDom);
      }
    }
    delete this.children[index];
  }
  autoPlay() {
    if (this.props.autoplay) {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
					const index = (this.state.currentIndex + 1) % (this.maxIndex + 1);
          this.smoothMoveToIndex(index);
        }, this.interval);
    }
  }
  stopAutoPlay() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
  }
  smoothMoveToIndex(index, time) {
    getRAF(() => {
      this.moveToIndex(index, time);
    });
  }
  moveToIndex(index, time) {
    const duration = (typeof time !== 'number' || time < 0) ? this.duration : time;
    let currentIndex = index;
    if (typeof currentIndex === 'undefined') {
      currentIndex = this.state.currentIndex;
    }
		if (currentIndex < 0) {
			currentIndex = 0;
			this.setState({ style: this.setStyle(0, this.duration) });
		} else if (currentIndex > this.maxIndex - 1) {
      // 区分是否自动录播
      if (this.props.autoplay) {
        currentIndex = 0;
        this.setState({ style: this.setStyle(-this.maxIndex * this.distance, this.duration) });
        this.handleTransitionEnd = function() {
          this.setState({ style: this.setStyle(-currentIndex * this.distance, 0) });
          this.swiperContainer.removeEventListener(this.transitionEnd, this.handleTransitionEnd, false);
        }.bind(this);
        this.swiperContainer.addEventListener(this.transitionEnd, this.handleTransitionEnd, false);
      } else {
        currentIndex = this.maxIndex - 1;
        this.setState({ style: this.setStyle(-currentIndex * this.distance, this.duration) });
      }
    } else {
      this.setState({ style: this.setStyle(-currentIndex * this.distance, duration) }, () => {
        this.lazyLoadImg(currentIndex + this.loadOffset);
      });
    }
    this.currentX = -currentIndex * this.distance;
    if (currentIndex !== this.state.currentIndex) {
      this.setState({ currentIndex }, () => {
        const { onSlided } = this.props;
        onSlided && onSlided(currentIndex);
      });
    }
  }
  setStyle(offset, duration) {
	  const offsetStr = this.isHorizontal ? `${(offset||0)}px,0px` : `0px,${(offset||0)}px`;
    const transformStyle = this.transformStyle === 'translate3d' ? `${this.transformStyle}(${offsetStr},0px)` : `${this.transformStyle}(${offsetStr})`;
    return {
      [this.transitionProperty]: this.transProperty,
      [this.transitionTimingFunction]: 'cubic-bezier(0,0,0.25,1)',
      [this.transitionDuration]: `${duration || 0}ms`,
      [this.transform]: transformStyle
    };
  }
  renderChildren() {
    const { children, autoplay } = this.props;
    if (React.Children.count(children) <= 1 || !autoplay) {return children;}
		const childrenNodes = [];
		const length = children.length;
    for (let i = 0; i <= length; i++) {
      const child = i < length ? children[i] : children[0];
      childrenNodes.push(React.cloneElement(child, Object.assign({}, child.props, { key: i })));
    }
    return childrenNodes;
  }
  renderIndicators() {
    const { dots, children } = this.props;
    if (!dots || React.Children.count(children) <= 1) return false;
    return (
      <ul className={styles.indicators}>{React.Children.map(children, (child, index) =>
          (<i key={index} className={this.state.currentIndex === index ? styles.current : ''}></i>)
        )}
      </ul>
    );
  }
  render() {
    return (
      <div className={this.className} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} onTouchCancel={this.handleTouchEnd}>
        {this.renderIndicators()}
        <div ref={ref => this.swiperContainer = ref} className={styles.swiper} style={this.state.style}>
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}

Swiper.defaultProps = {
    index: 0,
    dots: true,
    autoplay: false,
    canSwiper: true,
    dir: 'h',
    interval: 3,
    touch: true,
  }

Swiper.propTypes = {
  index: PropTypes.number,
  dir: PropTypes.oneOf([ 'h', 'v' ]),
  dots: PropTypes.bool,
  touch: PropTypes.bool,
  autoplay: PropTypes.bool,
  interval: PropTypes.number,
  canSwiper: PropTypes.bool,
  className: PropTypes.string,
  lazyload: PropTypes.bool,
  loadOffset: PropTypes.number,
  update: PropTypes.bool,
  defaultImg: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  onSlided: PropTypes.func,
  onItemClick: PropTypes.func,
};
