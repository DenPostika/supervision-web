import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {
	static propTypes = {
		label: PropTypes.string,
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		styleClass: PropTypes.string,
		hasError: PropTypes.bool,
		errorMsg: PropTypes.string,
		onChange: PropTypes.func,
	};
	static defaultProps = {
		label: null,
		placeholder: null,
		styleClass: null,
		hasError: false,
		errorMsg: 'error',
		onChange: () => {},
	};
	state = {
		isFocused: false,
	};
	triggerUnderline = () => {
		this.setState({ isFocused: !this.state.isFocused });
	};
	render() {
		const {
			label,
			name,
			placeholder,
			styleClass,
			hasError,
			errorMsg,
			onChange,
			disabled,
			value,
		} = this.props;
		const { isFocused } = this.state;
		return (
			<div className="input_wrap">
				{label && <label htmlFor={name}>{label}</label>}
				<input
					type="text"
					className={`common-text-input input ${styleClass} ${disabled &&
						'disabled'}`}
					name={name}
					placeholder={placeholder}
					id={name}
					onChange={onChange}
					onFocus={this.triggerUnderline}
					onBlur={this.triggerUnderline}
					disabled={disabled}
					value={value}
				/>
				<div
					className="underline"
					style={{
						backgroundColor: `${
							isFocused ? '#f90' : 'transparent'
						}`,
					}}
				/>
				{hasError && <span className="input_error">{errorMsg}</span>}
			</div>
		);
	}
}
