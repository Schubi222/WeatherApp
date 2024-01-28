<script lang="ts">
	import { current_data_kv } from '$lib/store/KurzfristforhersageStore';

	$: console.log($current_data_kv);
</script>

{#if $current_data_kv}
	<div>{Object.values($current_data_kv.features[0].properties.parameters.mnt2m)}</div>
{/if}
