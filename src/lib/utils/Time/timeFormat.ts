import moment from 'moment';

export const getTimeFomUnix = (unix: number) => {
	return moment.unix(unix).format('HH:mm');
};
export const getDDMonthFromUnix = (unix: number) => {
	return moment.unix(unix).format('DD.MM');
};
