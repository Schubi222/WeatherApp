<script lang="ts">
	import { current_data_kv } from '$lib/store/KurzfristforhersageStore';

	$: console.log($current_data_kv);
</script>

<div>KV</div>
