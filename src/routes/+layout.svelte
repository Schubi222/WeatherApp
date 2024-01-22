<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';
	import { onMount } from 'svelte';
	import { error_layout, loading_layout } from '$lib/store/layoutStore';
	import '$lib/style/mixins.scss';
	import '$lib/style/Global.scss';
	import '$lib/style/Variables.scss';
	import '../app.css';
</script>

{#if $error_layout !== ''}
	<Error bind:error={$error_layout} />
{:else if $loading_layout}
	<Loading text="Loading..." />
{:else}
	<slot />
{/if}
