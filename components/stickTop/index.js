import React, { Component, PropTypes } from 'react';
import {findDOMNode} from 'react-dom';
import './style.scss';
import { getRAF, isSupportSticky, getOffsetTop } from '../../libs/util';
// 置顶高阶组件
/*
  sticky: 是否需要吸顶功能
  说明：限定针对的对象（ComposedComponent）的Dom不能为空， 防止潜在的错误
*/
const stickTop = (custClassName) => (ComposedComponent) => class StickTop extends Component {
  static defaultProps = {
    sticky: true,
    top: 0,
  }
  static propTypes = {
    top: PropTypes.number,
    sticky: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.isSticky = isSupportSticky();
		this.handleScroll = this.handleScroll.bind(this);
    this.setStick = this.setStickClass.bind(this);
  }
  componentDidMount() {
    if (!this.props.sticky) return;
    this.componentNode = findDOMNode(this.component);
    if (!this.componentNode) {
        throw new Error('请保证吸顶的组件不能为null(即render返回不能为 null/false/<noscript />)');
    }
    if (!this.componentNode) return;
    if (this.isSticky) {
      this.componentNode.classList.add('sticky');
      this.componentNode.style.top = `${this.props.top}px`;
    } else {
      this.blankNode = findDOMNode(this.blankNodeRef);
      this.initData();
      this.attachScroll();
    }
  }
  componentDidUpdate() {
    !this.isSticky && this.initData();
  }
	componentWillUnmount() {
    !this.isSticky && this.detachScroll();
	}

  // 属性更新完成后，进行初始化，如果原先fixed DOM在顶部，则置顶
  initData() {
    if (!this.componentNode || !this.props.sticky) return;
    const { height, top } = this.componentNode.getBoundingClientRect();
    if ( height > 0 && height !== this.height) {
      // this.component.classList.remove('fixed');
      // this.blankNode.style.display = 'none';
      this.blankNode.style.height = `${height}px`;
      const offsetTop = window.scrollY + top - this.props.top;
      if (window.scrollY >= offsetTop) {
        window.scrollTo(0, offsetTop);
        this.setStickClass();
      }
    }
    this.height = height;
  }
  // 滚动是否成功
	handleScroll() {
    getRAF(() => {
      // // 针对 子组件render return 为false和null的情况
      // if (this.componentNode === null) {
      //   this.componentNode = findDOMNode(this.component);
      // }
      // if (this.componentNode === null) return;
      window.scrollY >= (getOffsetTop(this.blankNode) || getOffsetTop(this.componentNode)) - this.props.top ? this.setStickClass() : this.removeStickClass();
    });
	}
  // 设置fixed
  setStickClass() {
    if (!this.componentNode.classList.contains('fixed')) {
      this.componentNode.classList.add('fixed');
      this.componentNode.style.top = `${this.props.top}px`;
      this.blankNode.style.display = 'block';
      // // 滚动过程中元素高度的变化
      // const { height } = this.componentNode.getBoundingClientRect();
      // if (this.blankNode.offsetHeight !== height) {
      //   this.blankNode.style.height = `${height}px`;
      // }
    }
  }
  // 移除fixed
  removeStickClass() {
    if (this.componentNode.classList.contains('fixed')) {
      this.componentNode.classList.remove('fixed');
      this.componentNode.style.top = null;
      this.blankNode.style.display = 'none';
    }
  }
  render() {
    if (!this.props.sticky) return (<ComposedComponent {...this.props} />);
    if (this.isSticky) {
      return (<ComposedComponent ref={ref => this.component = ref} {...this.props} />);
    }
    // ref={ref => this.componentNode = ref}
		return (
			<nav className={custClassName || ''}>
        <ComposedComponent ref={ref => this.component = ref} {...this.props} setStick={this.setStick} />
        <div className="sticky-blank" ref={ref => this.blankNodeRef = ref}></div>
			</nav>
		);
  }
  attachScroll() {
    if (this.props.sticky) {
      window.addEventListener('touchmove', this.handleScroll, false);
      window.addEventListener('scroll', this.handleScroll, false);
    }
	}
	detachScroll() {
    if (this.props.sticky) {
      window.removeEventListener('touchmove', this.handleScroll, false);
      window.removeEventListener('scroll', this.handleScroll, false);
    }
	}
};

export default stickTop;


// Orientation 为处理屏幕转向（目前不用）
// this.handleOrientation = this.handleOrientation.bind(this);
// componentWillMount() {
//   this.orientation = 'onorientationchange' in window ? 'orientationchange' : 'resize';
// }
// attachOrientation() {
//   window.addEventListener(this.orientation, this.handleOrientation, false);
// }
// detachOrientation() {
//   window.removeEventListener(this.orientation, this.handleOrientation, false);
// }
// // 处理屏幕转向
// handleOrientation() {
//   getRAF(() => {
//     const { top } = findDOMNode(this).getBoundingClientRect();
//     const offsetTop = window.scrollY + top - this.props.top;
//     if (window.scrollY > offsetTop) {
//       window.scrollTo(0, offsetTop);
//       this.setStickClass();
//     }
//   });
// }
