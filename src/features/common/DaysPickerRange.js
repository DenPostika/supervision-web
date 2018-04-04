import React from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Button from './Button';

export default class DaysPickerRange extends React.Component {
	static defaultProps = {
		numberOfMonths: 1,
	};
	constructor(props) {
		super(props);
		this.handleDayClick = this.handleDayClick.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
		this.state = this.getInitialState();
	}
	getInitialState() {
		return {
			from: undefined,
			to: undefined,
			show: false,
		};
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleOutsideClick, false);
	}
	handleDayClick(day) {
		const range = DateUtils.addDayToRange(day, this.state);
		this.setState(range);
		const { from, to } = range;
		if (from && to) {
			this.props.selectDaysRange(
				moment(from).format('YYYY-MM-DD'),
				moment(to).format('YYYY-MM-DD'),
			);
		}
	}
	handleResetClick() {
		this.setState(this.getInitialState());
		this.props.resetDaysRange();
	}
	toggleShow = () => {
		if (!this.state.show) {
			// attach/remove event handler
			document.addEventListener('click', this.handleOutsideClick, false);
		} else {
			document.removeEventListener(
				'click',
				this.handleOutsideClick,
				false,
			);
		}
		this.setState({ show: !this.state.show });
	};
	handleOutsideClick = e => {
		// ignore clicks on the component itself
		if (this.node.contains(e.target)) {
			return;
		}

		this.toggleShow();
	};
	render() {
		const { from, to } = this.state;
		const modifiers = { start: from, end: to };
		return (
			<div
				className="common-days-picker-range"
				ref={node => {
					this.node = node;
				}}
			>
				<Button styleClass="small" onClick={this.toggleShow}>
					{!from && !to && `select range of days`}
					{from && !to && 'select last day'}
					{from &&
						to &&
						`from: ${from.toLocaleDateString()}, to:
                ${to.toLocaleDateString()}`}
				</Button>
				{from &&
					to && (
						<Button
							styleClass="small"
							onClick={this.handleResetClick}
						>
							Reset
						</Button>
					)}
				{this.state.show && (
					<DayPicker
						className="Selectable box no-padding"
						numberOfMonths={this.props.numberOfMonths}
						selectedDays={[from, { from, to }]}
						modifiers={modifiers}
						onDayClick={this.handleDayClick}
					/>
				)}
			</div>
		);
	}
}
