import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RadioInput extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		value: PropTypes.node.isRequired,
		checked: PropTypes.node,
		onChange: PropTypes.func,
		icon: PropTypes.string,
		iconColor: PropTypes.string,
	};
	static defaultProps = {
		checked: null,
		onChange: () => {},
		icon: null,
		iconColor: null,
	};
	render() {
		const {
			name,
			id,
			value,
			checked,
			onChange,
			icon,
			iconColor,
		} = this.props;
		return (
			<div className="common-radio-input radioInput_wrap">
				<input
					id={id}
					type="radio"
					name={name}
					value={value}
					checked={checked === value}
					onChange={onChange}
				/>
				<label htmlFor={id}>
					{icon && (
						<i
							className={`fa ${icon}`}
							style={{ color: iconColor }}
						/>
					)}
					<span
						style={{
							background:
								checked === value ? '#57b955' : 'transparent',
							color: checked === value ? '#fff' : 'inherit',
						}}
					>
						{value}
					</span>
				</label>
			</div>
		);
	}
}
