import moment from 'moment/moment';

export const getDateRange = range => {
	if (range.length <= 0)
		throw new Error(
			'empty range, pls select week or month, or array of start and end Date',
		);
	const start = Array.isArray(range)
		? moment(range[0])
		: moment().startOf(range);
	const end = Array.isArray(range) ? moment(range[1]) : moment().endOf(range);
	const days = [];
	let day = start;
	while (day <= end) {
		days.push(moment(day, 'YYYY-MM-DD').format('DD.MM.YYYY'));
		day = day.clone().add(1, 'd');
	}
	return days;
};
export const getStartDate = range =>
	moment()
		.startOf(range)
		.format('YYYY-MM-DD');

export const getEndDate = range =>
	moment()
		.endOf(range)
		.format('YYYY-MM-DD');

export const getStartEndDates = (range = 'month') => {
	const dateStart = moment()
		.startOf(range)
		.format('YYYY-MM-DD');
	const dateEnd = moment()
		.endOf(range)
		.format('YYYY-MM-DD');
	return { dateStart, dateEnd };
};
