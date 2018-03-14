import React, { Component } from 'react';

export default class StatusWidget extends Component {
	static propTypes = {};
	renderUsers = (users = [], lists = []) => {
		const exceptAdmin = users.filter(user => user.type !== 'admin');
		return exceptAdmin.map(user => (
			<div key={user.cardId} className="userCard">
				<button
					className="btn box-header"
					fval={user.cardId}
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
					<div className="info">
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
			</div>
		));
	};
	render() {
		const { usersList, trackingList } = this.props;
		return (
			<div className="common-status-widget box">
				{this.renderUsers(usersList, trackingList)}
			</div>
		);
	}
}
