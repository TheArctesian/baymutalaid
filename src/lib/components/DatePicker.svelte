<!-- src/lib/components/DatePicker.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// Get the current date in YYYY-MM-DD format
	const today = new Date().toISOString().split('T')[0];

	// Get date from URL or use today
	$: date = $page.url.searchParams.get('date') || today;

	function onDateChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const newDate = target.value;
		goto(`?date=${newDate}`);
	}
</script>

<div class="date-picker">
	<label for="date-select">Select Date: </label>
	<input
		type="date"
		id="date-select"
		value={date}
		on:change={onDateChange}
		min="2025-01-01"
		max="2025-12-31"
	/>
</div>

<style>
	.date-picker {
		margin-bottom: 1rem;
	}

	input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
