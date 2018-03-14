import React, { Component } from 'react';

export default class RadioInput extends Component {
	static propTypes = {};

	render() {
		const { name, id, value, checked, onChange } = this.props;
		return (
			<div className="common-radio-input radioInput_wrap">
				<input
					id={id}
					type="radio"
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
				/>
				<label htmlFor={id}>{value}</label>
			</div>
		);
	}
}
