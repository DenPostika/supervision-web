import React, { Component } from 'react';
import Preloader from './Preloader';
import Panel from './Panel';

export default class StatusWidget extends Component {
	static propTypes = {};
	state = {
		isHovered: false,
	};
	triggerUnderline = () => {
		this.setState({ isHovered: !this.state.isHovered });
	};
	renderUsers = (users = []) => {
		const exceptAdmin = users.filter(user => user.type !== 'admin');
		const { selectedUser } = this.props;
		const { isHovered } = this.state;
		return exceptAdmin.map(user => (
			<div key={user.cardId} className="userCard">
				<button
					className="btn box-header"
					fval={user.cardId}
					username={user.username}
					onClick={this.props.selectUser}
					role="button"
				>
					<div className="user_name">{user.username}</div>
					<div
						className={`user_status ${user.atWork ? 'active' : ''}`}
					>
						at work
					</div>
				</button>
				<div className="box-content">
					<div className="info box">
						<span className="phone">
							tel:
							<a
								href={`tel:${user.mobileNumber}`}
								className="val"
							>
								{user.mobileNumber}
							</a>
						</span>
						<span className="email">
							email:
							<a href={`mailto:${user.email}`} className="val">
								{user.email}
							</a>
						</span>
					</div>
				</div>
				<div
					className={`underline ${selectedUser === user.username &&
						'active'}`}
				/>
			</div>
		));
	};
	render() {
		const { usersList, trackingList, pending } = this.props;
		return (
			<Panel
				header="status"
				styleClass="purple-light"
				customClass="common-status-widget"
				pending={pending}
				preloaderColor="#fff"
			>
				{this.renderUsers(usersList, trackingList)}
			</Panel>
		);
	}
}
