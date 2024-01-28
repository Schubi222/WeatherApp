<script lang="ts">
	import { current_data_kv } from '$lib/store/KurzfristforhersageStore';
	import type { FeaturesKV, ParameterNamesKVStrings } from '$lib/type/Kurzfrist';
	import { ParameterNames } from '$lib/type/Kurzfrist';

	$: console.log($current_data_kv);
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
	{#each $current_data_kv.features[0].properties.parameters.mnt2m.data as data, index}
		<div>
			{$current_data_kv.timestamps[index]}
			{#each Object.values(ParameterNames) as parameter}
				{getDataAndUnit($current_data_kv.features[0], parameter, index) + ' '}
			{/each}
		</div>
	{/each}
{/if}
