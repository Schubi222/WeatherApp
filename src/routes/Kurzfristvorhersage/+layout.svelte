<script lang="ts">
	import { onMount } from 'svelte';
	import { error_layout } from '$lib/store/layoutStore';
	import Error from '$lib/components/Error.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { current_data_kv } from '$lib/store/KurzfristforhersageStore';
	import { fetchData } from '$lib/utils/Kurzfrist/queries';
	let error = '';
	let loading = true;
	// const params = ['FFX', 'RSD', 'RSX', 'SCH', 'SUX', 'VKM', 'WSK'];
	const params = ['mnt2m', 'mxt2m', 'rh2m', 'rr_acc', 'snow', 'sundur_acc', 't2m', 'u10m', 'vgust'];
	const base = 'https://dataset.api.hub.geosphere.at';
	const version = 'v1';

	//'https://dataset.api.hub.geosphere.at/v1/station/current/tawes-v1-10min?station_ids=16412'
	//'https://dataset.api.hub.geosphere.at/v1/station/current/tawes-v1-10min?parameters=RR&station_ids=11035'
	//'https://dataset.api.hub.geosphere.at/v1/type/current/tawes-v1-10min?parameters=RR&station_ids=11035'

	onMount(async () => {
		loading = true;
		const data = await fetchData(base, version, params);
		if (data?.error) error = data.error;
		else current_data_kv.set(data);
		loading = false;
	});
</script>

<svelete:head>
	<title>Weather App | Kurzfristvorhersage</title>
</svelete:head>

{#if error}
	<Error bind:error={$error_layout} />
{:else if loading}
	<Loading text="Loading..." />
{:else}
	<slot />
{/if}
