<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
</script>

<div on:click={() => browser && goto('/Kurzfristvorhersage')}>Kurzfrist</div>
