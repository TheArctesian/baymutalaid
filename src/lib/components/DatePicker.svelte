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
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	label {
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	input {
		padding: 0.375rem 0.75rem;
		border: 1px solid rgba(220, 20, 60, 0.3);
		border-radius: 6px;
		background: rgba(26, 26, 26, 0.8);
		color: white;
		font-size: 0.8125rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 120px;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	input:hover {
		border-color: rgba(220, 20, 60, 0.6);
		background: rgba(26, 26, 26, 0.9);
		box-shadow: 0 0 15px rgba(220, 20, 60, 0.2);
	}

	input:focus {
		outline: none;
		border-color: #dc143c;
		box-shadow:
			0 0 0 3px rgba(220, 20, 60, 0.2),
			0 0 20px rgba(220, 20, 60, 0.3);
		background: rgba(26, 26, 26, 0.95);
	}

	input::-webkit-calendar-picker-indicator {
		cursor: pointer;
		opacity: 0.7;
		filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg)
			brightness(100%) contrast(100%);
		transition: all 0.3s ease;
	}

	input::-webkit-calendar-picker-indicator:hover {
		opacity: 1;
		filter: brightness(0) saturate(100%) invert(16%) sepia(99%) saturate(7426%) hue-rotate(350deg)
			brightness(95%) contrast(86%);
		transform: scale(1.1);
	}

	/* Mobile optimizations */
	@media (max-width: 767px) {
		input {
			font-size: 0.75rem;
			padding: 0.3125rem 0.625rem;
			min-width: 110px;
		}

		label {
			font-size: 0.6875rem;
		}
	}

	/* Desktop enhancements */
	@media (min-width: 1024px) {
		input {
			font-size: 0.875rem;
			padding: 0.4375rem 0.875rem;
			min-width: 130px;
		}

		input:hover {
			transform: translateY(-1px);
		}

		input:focus {
			transform: translateY(-1px);
		}
	}
</style>
