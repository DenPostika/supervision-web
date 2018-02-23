import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
	static propTypes = {
		styleClass: PropTypes.string,
		onlyIcon: PropTypes.bool,
		children: PropTypes.node,
	};
	static defaultProps = {
		styleClass: null,
		onlyIcon: false,
		children: 'click',
	};
	render() {
		const { styleClass, children, onlyIcon } = this.props;
		return (
			<button
				className={`common-button btn ${styleClass} ${
					onlyIcon ? 'onlyIcon' : ''
				}`}
			>
				{children}
			</button>
		);
	}
}
