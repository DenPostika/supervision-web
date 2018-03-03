import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

export default class Box extends Component {
	static propTypes = {
		children: PropTypes.node,
		styleClass: PropTypes.string,
		currentKey: PropTypes.string,
	};

	static defaultProps = {
		children: '',
		styleClass: null,
		currentKey: null,
	};
	render() {
		const { styleClass, currentKey } = this.props;
		const key = currentKey || '/';
		const timeout = { enter: 200, exit: 300 };
		return (
			<div className={`common-box ${styleClass}`}>
				{/* <TransitionGroup> */}
				{/* <CSSTransition */}
				{/* // key={key} */}
				{/* // timeout={timeout} */}
				{/* // classNames="mount" // appear > */}
				{this.props.children}
				{/* </CSSTransition> */}
				{/* </TransitionGroup> */}
			</div>
		);
	}
}
