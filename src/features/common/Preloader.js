import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Preloader extends Component {
	static propTypes = {
		size: PropTypes.string,
	};
	static defaultProps = {
		size: null,
	};
	render() {
		const { size, color } = this.props;
		return (
			<div
				className={`common-preloader spinner ${size}`}
				// style={{ background: color }}
			>
				<div className="rect1" style={{ background: color }} />
				<div className="rect2" style={{ background: color }} />
				<div className="rect3" style={{ background: color }} />
				<div className="rect4" style={{ background: color }} />
				<div className="rect5" style={{ background: color }} />
			</div>
		);
	}
}
