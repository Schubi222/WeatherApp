<script lang="ts">
	import { Jellyfish } from 'svelte-loading-spinners';
	export let text: string;
</script>

<div class="Loading-Wrapper page">
	<Jellyfish size="80" color="#1a4a72" unit="px" duration="2s" />
	<div class="text">{text}</div>
</div>

<style lang="scss">
	@import '$lib/style/mixins.scss';
	.Loading-Wrapper {
		@include flex-center;
		flex-direction: column;
		margin: auto;
		.text {
			font-size: 20px;
			font-weight: 600;
			text-align: center;
			padding: 10px;
		}
	}
</style>
