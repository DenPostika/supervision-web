import React, { Component } from 'react';

import Button from '../common/Button';

export default class Header extends Component {
	static propTypes = {};

	render() {
		const { userInfo = {} } = this.props;
		return (
			<div className="common-header">
				<header className="header box-header">
					<div className="left_part">
						<h1 className="title">Lead Intelligence</h1>
					</div>
					<div className="right_part">
						<div className="user_menu">
							<span className="userName">
								{userInfo ? userInfo.username : ''}
							</span>
						</div>
						<Button onlyIcon onClick={this.props.handleSignOut}>
							<i className="fa fa-power-off" />
						</Button>
					</div>
				</header>
			</div>
		);
	}
}
