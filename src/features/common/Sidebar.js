import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { checkUserType } from './utils/users';

export default class Sidebar extends Component {
	static propTypes = {
		userInfo: PropTypes.objectOf(PropTypes.node),
	};

	render() {
		const { userInfo } = this.props;
		return (
			<div className="common-sidebar">
				<nav className="nav_wrap">
					<ul className="nav_menu">
						<li className="menu_item_wrap">
							<NavLink to="/dashboard" className="menu_item">
								<i className="fa fa-chart-line" />Dashboard
							</NavLink>
						</li>
						<li key="calendar" className="menu_item_wrap">
							<NavLink to="/users/calendar" className="menu_item">
								<i className="fas fa-calendar-alt" />Calendar
							</NavLink>
						</li>
						{checkUserType(userInfo, 'admin') && [
							<li key="face" className="menu_item_wrap">
								<NavLink
									to="/users/face_detection"
									className="menu_item"
								>
									<i className="fa fa-camera-retro" />face
									detection
								</NavLink>
							</li>,
						]}
						<li className="menu_item_wrap">
							<NavLink to="/users/profile" className="menu_item">
								<i className="fa fa-user" />Profile
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}
