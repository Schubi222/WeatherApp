<script lang="ts">
	import moment from 'moment';

	export let temperature;
	export let time;
	export let snow;
	export let rain;
	export let sun;
</script>

<div class="container w-full h-48 bg-gradient-to-br from-violet-950 to-purple-500 mx-auto">
	<div class="text-blue-100 font-bold text-xl p-3">Graz, Austria</div>
	<div class="text-blue-200 font-bold text-lg px-3">
		{moment().format('dddd, DD MMMM YYYY HH:mm')}
	</div>
</div>
