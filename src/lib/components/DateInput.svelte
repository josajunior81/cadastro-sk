<script>
	import { onMount } from 'svelte';

	let now = new Date(),
		month,
		day,
		year;
	let dateString = '';
	export let fieldName = 'birthdate';
	export let dateValue = ""

	onMount(() => {
		if (dateValue != ""){
			const dtarr = dateValue.split("-");

			(month = '' + dtarr[1]), (day = '' + dtarr[2]), (year = dtarr[0]);

			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;

			dateString = [year, month, day].join('-');
		}
	});
</script>

<input
	name={fieldName}
	class="block w-full disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 p-2.5 text-sm rounded-lg"
	type="date"
	bind:value={dateString}
/>
