import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
	static propTypes = {
		styleClass: PropTypes.string,
		children: PropTypes.node,
	};
	static defaultProps = {
		styleClass: null,
		children: 'click',
	};
	render() {
		const { styleClass, children } = this.props;
		return <button className={`common-button btn ${styleClass}`}>{children}</button>;
	}
}
