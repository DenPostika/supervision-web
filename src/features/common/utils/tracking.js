import moment from 'moment/moment';

export const separateDate = data => {
	const checkTime = data.map(el => el.checkIn);
	const tmp = checkTime.reduce((sum, curr) => {
		let tmp = sum[moment(curr).format('DD.MM.YYYY')];
		if (tmp === undefined) {
			sum[moment(curr).format('DD.MM.YYYY')] = tmp = {};
			tmp.date = moment(curr).format('DD.MM.YYYY');
			tmp.values = [];
		}
		tmp.values.push(moment(curr).format('x'));
		return sum;
	}, {});
	const preRes = Object.keys(tmp).map(key => tmp[key]);
	return preRes.map(el => {
		const min = Math.min(...el.values);
		const max = Math.max(...el.values);
		const { date } = el;
		return { date, max, min };
	});
};
export const filterlistById = (list = [], cardId) =>
	list.filter(el => el.cardId === cardId);
