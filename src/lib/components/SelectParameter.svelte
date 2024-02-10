<script lang="ts">
	import type { ParameterNames } from '$lib/type/Kurzfrist';

	export let selected_params: ParameterNames[] = [];
	export let all_params: ParameterNames[] = [];
</script>

<div class="container">
	<select bind:value={selected_params}>
		{#each all_params as param}
			<option value={param}>{param}</option>
		{/each}
	</select>
</div>
