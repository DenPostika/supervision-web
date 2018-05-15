import React, { Component } from 'react';

import Panel from './Panel';

export default class Filters extends Component {
	static propTypes = {};

	render() {
		const { title } = this.props;
		return (
			<Panel
				header={title}
				preloaderColor="#fff"
				styleClass="purple-light no-padding"
			>
				Component content: common/Filters
			</Panel>
		);
	}
}
