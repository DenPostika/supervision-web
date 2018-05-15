import React, { Component } from 'react';

export default class CircleMenu extends Component {
	static propTypes = {};
	state = { isChecked: false };
	handleChange = e => {
		const { target } = e;
		const { name } = target;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;
		this.setState({
			[name]: value,
		});
	};
	handleClose = () => {
		this.setState({ isChecked: false });
	};
	render() {
		const { children, id } = this.props;
		const wrapChildren = React.Children.map(children, (child, i) => (
			<li className="menu-item" onClick={this.handleClose}>
				{child}
			</li>
		));

		return (
			<div className="common-circle-menu">
				<nav className="menu">
					<input
						type="checkbox"
						id={id}
						onChange={this.handleChange}
						checked={this.state.isChecked}
						className="menu-toggler"
						name="isChecked"
					/>
					<label htmlFor={id} />
					<ul>{wrapChildren}</ul>
				</nav>
			</div>
		);
	}
}
