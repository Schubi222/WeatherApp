<script lang="ts">
	import { current_data_kv } from '$lib/store/KurzfristforhersageStore';
	import type { FeaturesKV, ParameterNamesKVStrings } from '$lib/type/Kurzfrist';
	import { ParameterNames } from '$lib/type/Kurzfrist';
	import { getDDMonthFromUnix, getTimeFomUnix } from '$lib/utils/Time/timeFormat';

	const dates: number[] = [];
	$: console.log($current_data_kv);
	$: if ($current_data_kv?.timestamps?.length) {
		calculateDate();
	}

	const calculateDate = () => {
		$current_data_kv.timestamps.forEach((timestamp) => dates.push(Date.parse(timestamp) / 1000));
		dates.sort((a, b) => (a > b ? 1 : -1));
		console.log(dates);
	};

	/*	$: if ($current_data_kv) {
		console.log(Date.parse($current_data_kv.timestamps[0]));
	}*/

	const getDataAndUnit = (feature: FeaturesKV, param: ParameterNamesKVStrings, index: number) => {
		if (
			!param ||
			!feature?.properties?.parameters[param] ||
			(!feature?.properties?.parameters[param]?.data?.at(index) &&
				feature?.properties?.parameters[param]?.data?.at(index) !== null)
		)
			return 'Invalid data';
		let return_string = '';
		const data = feature.properties.parameters[param].data.at(index);
		if (data === undefined) return 'Invalid data';

		let data_string: string;

		if (data === null) data_string = '0.0';
		else data_string = '' + data.toFixed(1);

		let unit = feature.properties.parameters[param].unit;
		if (unit === 'degree Celsius') unit = '°C';
		return_string += data_string + unit;
		return return_string;
	};
</script>

{#if $current_data_kv}
	<div class="flex flex-col mx-auto container">
		{#each $current_data_kv.timestamps as _, index}
			<div>
				{#if getTimeFomUnix(dates[index]) === '00:00'}
					<div>{getDDMonthFromUnix(dates[index])}</div>
				{/if}
				{getTimeFomUnix(dates[index])}
				{#each Object.values(ParameterNames) as parameter}
					{getDataAndUnit($current_data_kv.features[0], parameter, index) + ' '}
				{/each}
			</div>
		{/each}
	</div>
{/if}
