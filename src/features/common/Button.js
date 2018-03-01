import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
	static propTypes = {
		styleClass: PropTypes.string,
		type: PropTypes.string,
		onlyIcon: PropTypes.bool,
		children: PropTypes.node,
		disabled: PropTypes.bool,
		onClick: PropTypes.func,
	};
	static defaultProps = {
		styleClass: null,
		type: 'button',
		onlyIcon: false,
		children: 'click',
		disabled: false,
		onClick: () => {},
	};
	render() {
		const {
			styleClass,
			children,
			onlyIcon,
			onClick,
			disabled,
			type,
		} = this.props;
		return (
			<button
				className={`common-button btn ${styleClass} ${
					onlyIcon ? 'onlyIcon' : ''
				}`}
				onClick={onClick}
				type={type}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}
}
