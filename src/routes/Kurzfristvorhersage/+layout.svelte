<script lang="ts">
	import { onMount } from 'svelte';
	import { error_layout, loading_layout } from '$lib/store/layoutStore';
	import Error from '$lib/components/Error.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { current_data_kv } from '$lib/store/KurzfristforhersageStore';
	let error = '';
	let loading = true;
	// const params = ['FFX', 'RSD', 'RSX', 'SCH', 'SUX', 'VKM', 'WSK'];
	const params = ['mnt2m', 'mxt2m', 'rh2m', 'rr_acc', 'snow', 'sundur_acc', 't2m', 'u10m', 'vgust'];
	const base = 'https://dataset.api.hub.geosphere.at';
	const version = 'v1';

	//'https://dataset.api.hub.geosphere.at/v1/station/current/tawes-v1-10min?station_ids=16412'
	//'https://dataset.api.hub.geosphere.at/v1/station/current/tawes-v1-10min?parameters=RR&station_ids=11035'
	//'https://dataset.api.hub.geosphere.at/v1/type/current/tawes-v1-10min?parameters=RR&station_ids=11035'

	const constructUrl = (
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

	onMount(async () => {
		loading = true;
		const url = constructUrl(base, version, 'timeseries', 'forecast', 'nwp-v1-1h-2500m', params, [
			'lat_lon=47.065%2C15.444',
			'forecast_offset=0',
			'start=2024-01-21T00%3A00',
			'end=2024-02-22T00%3A00',
			'output_format=geojson'
		]);
		if (!url) {
			error = 'Die Parameter sind inkorrekt.';
			loading = false;
			return;
		}
		console.log('URL: ', url);
		fetch(url, { method: 'GET', headers: { accept: 'application/json' } })
			.then(async (value) => {
				if (value.status !== 200) {
					error = 'Die Daten konnten nicht geladen werden. Bitte probieren sie es später erneut.';
					return;
				}
				current_data_kv.set(await value.json());
			})
			.catch((e) => {
				console.error('Error on mount', e);
				error = e;
			});
		loading = false;
	});
</script>

{#if error}
	<Error bind:error={$error_layout} />
{:else if loading}
	<Loading text="Loading..." />
{:else}
	<slot />
{/if}
