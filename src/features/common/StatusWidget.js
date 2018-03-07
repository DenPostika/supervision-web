import React, { Component } from 'react';

export default class StatusWidget extends Component {
	static propTypes = {};
	renderUsers = (users = [], lists = []) => {
		const exceptAdmin = users.filter(user => user.type !== 'admin');
		console.log(exceptAdmin);
		return exceptAdmin.map(user => (
			<div key={user.cardId} role="button" fval={user.cardId} className="userCard">
				<div className="box-header">
					<div className="user_name">{user.username}</div>
					<div className="user_status active">at work</div>
				</div>
				<div className="box-content">
					<div className="info">
						<span className="phone">
							tel:<span className="val">{user.mobileNumber}</span>
						</span>
						<span className="email">
							email:<span className="val">{user.email}</span>
						</span>
						<span className="slack">
							slack name:<span className="val">
								{user.slackName}
                  </span>
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
