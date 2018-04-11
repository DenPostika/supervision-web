import React, { Component } from 'react';

export default class CircleMenu extends Component {
	static propTypes = {};
	state = { isChecked: false };
	handleChange = e => {
		e.preventDefault();
		console.log('check');
		this.setState({ isChecked: !this.state.isChecked });
		console.log(this.state.isChecked);
	};

	render() {
		const { children } = this.props;
		const deg = 360 / React.Children.count(children);

		const wrapChildren = React.Children.map(children, (child, i) => (
			<li
				className="menu-item"
				// style={{
				// 	transform: `rotate(${deg / 2 -
				// 		deg * i}deg) translateY(-8em)`,
				// }}
			>
				{child}
			</li>
		));

		return (
			<div className="common-circle-menu">
				<nav className="menu">
					<input
						type="checkbox"
						id="menu-toggler"
						onChange={this.handleChange}
						checked={this.state.isChecked}
						className={`menu-toggler`}
						name="menu-toggler"
					/>
					<label htmlFor="menu-toggler" />
					<ul>{wrapChildren}</ul>
				</nav>
			</div>
		);
	}
}
