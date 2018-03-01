import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

export default class Box extends Component {
	static propTypes = {
		children: PropTypes.node,
		styleClass: PropTypes.string,
	};

	static defaultProps = {
		children: '',
		styleClass: null,
	};
	render() {
		const { styleClass } = this.props;
		const timeout = { enter: 300, exit: 200 };
		return (
			<TransitionGroup>
				<CSSTransition
					key="box"
					timeout={timeout}
					classNames="mount"
					appear
				>
					<div className={`common-box ${styleClass}`}>
						{this.props.children}
					</div>
				</CSSTransition>
			</TransitionGroup>
		);
	}
}
