import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Preloader from './Preloader';

export default class Panel extends Component {
	static propTypes = {
		children: PropTypes.node,
		header: PropTypes.node,
		styleClass: PropTypes.string,
		customClass: PropTypes.string,
		preloaderColor: PropTypes.string,
		pending: PropTypes.bool,
	};
	static defaultProps = {
		children: '',
		customClass: '',
		header: null,
		styleClass: 'default',
		preloaderColor: '#6CA6E0',
		pending: false,
	};
	render() {
		const {
			styleClass,
			header,
			customClass,
			preloaderColor,
			pending,
		} = this.props;
		return (
			<div className={`common-panel ${styleClass} ${customClass}`}>
				{header && (
					<div className={`panel_header ${styleClass}`}>
						{header}
						{pending && (
							<Preloader size="small" color={preloaderColor} />
						)}
					</div>
				)}
				<div className="panel_body">{this.props.children}</div>
			</div>
		);
	}
}
