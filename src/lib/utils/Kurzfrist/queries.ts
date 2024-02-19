import type { ParameterNames } from '$lib/type/Kurzfrist';
import moment from 'moment';

export async function fetchData(
	base: string,
	version: string,
	params: ParameterNames[] | string[]
) {
	const today = moment().subtract(2, 'hours');
	const tomorrow = moment().add(1, 'days');

	const url = constructUrl(base, version, 'timeseries', 'forecast', 'nwp-v1-1h-2500m', params, [
		'lat_lon=47.065%2C15.444',
		'forecast_offset=0',
		`start=${today.format('YYYY-MM-DDTHH:mm')}`,
		`end=${tomorrow.format('YYYY-MM-DDTHH:mm')}`,
		'output_format=geojson'
	]);
	if (!url) {
		return {
			error: 'Die Parameter sind inkorrekt.'
		};
	}
	const res = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } })
		.then(async (value) => {
			if (value.status !== 200) {
				return {
					error: 'Die Daten konnten nicht geladen werden. Bitte probieren sie es später erneut.'
				};
			}
			const data = await value.json();
			return {
				...data
			};
		})
		.catch((e) => {
			console.error('Error on mount', e);
			return {
				error: e
			};
		});
	return res;
}

/*HELPER*/
export const constructUrl = (
	base: string,
	version: string,
	type: string,
	mode: string,
	resource_id: string,
	params: string[],
	add_params: string[]
) => {
	if (!base || !version || !type || !mode || !params?.length || !add_params?.length) return null;

	let url = base + '/' + version + '/' + type + '/' + mode + '/' + resource_id + '?';
	params.forEach((param) => (url += 'parameters=' + param + '&'));
	add_params.forEach(
		(param, index) => (url += param + (index === add_params.length - 1 ? '' : '&'))
	);

	return url;
};
