<script lang="ts">
	import { mapStore } from '$lib/stores/mapStore';
	import type { MealEvent } from '$lib/utils/mealTransformer';

	interface Props {
		meal: MealEvent;
		index: number;
	}

	let { meal, index }: Props = $props();

	function handleClick() {
		mapStore.focusOnEvent(meal.id, meal);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<div
	class="meal-card"
	class:past={meal.isPast}
	onclick={handleClick}
	onkeydown={handleKeydown}
	role="button"
	tabindex="0"
>
	<div class="meal-header">
		<span class="meal-time">{meal.time}</span>
		<span class="meal-number">#{index + 1}</span>
		{#if meal.isPast}
			<span class="past-indicator">PAST</span>
		{/if}
	</div>
	<div class="meal-body">
		<h3 class="meal-event">{meal.event}</h3>
		<p class="meal-provider">{meal.provider}</p>
		<div class="meal-location">
			<p class="address">
				<span class="icon">📍</span>
				{meal.location.address}
			</p>
			{#if meal.location.directions}
				<p class="directions">{meal.location.directions}</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.meal-card {
		background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%);
		border: 1px solid rgba(220, 20, 60, 0.2);
		border-radius: 8px;
		margin-bottom: 0.75rem;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		overflow: hidden;
		position: relative;
		cursor: pointer;
	}

	.meal-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(220, 20, 60, 0.05) 0%, transparent 50%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.meal-card:hover {
		transform: translateY(-2px);
		border-color: rgba(220, 20, 60, 0.4);
		box-shadow: 0 8px 25px rgba(220, 20, 60, 0.15);
	}

	.meal-card:hover::before {
		opacity: 1;
	}

	.meal-header {
		background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
		color: white;
		padding: 0.75rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 600;
		font-size: 0.8125rem;
		border-bottom: 1px solid rgba(220, 20, 60, 0.2);
		position: relative;
		gap: 0.5rem;
	}

	.meal-header::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent 0%, #dc143c 50%, transparent 100%);
	}

	.meal-time {
		color: #dc143c;
		letter-spacing: 0.25px;
		font-weight: 700;
		text-shadow: 0 0 8px rgba(220, 20, 60, 0.3);
	}

	.meal-number {
		opacity: 0.6;
		font-size: 0.75rem;
		background: rgba(220, 20, 60, 0.1);
		padding: 0.125rem 0.375rem;
		border-radius: 4px;
		border: 1px solid rgba(220, 20, 60, 0.2);
		flex-shrink: 0;
	}

	.past-indicator {
		font-size: 0.625rem;
		font-weight: 700;
		letter-spacing: 0.5px;
		background: rgba(128, 128, 128, 0.2);
		color: rgba(128, 128, 128, 0.8);
		padding: 0.125rem 0.375rem;
		border-radius: 4px;
		border: 1px solid rgba(128, 128, 128, 0.3);
		flex-shrink: 0;
	}

	.meal-body {
		padding: 1rem;
		color: white;
	}

	.meal-event {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.25px;
		color: white !important;
		line-height: 1.2;
	}

	.meal-provider {
		color: rgba(255, 255, 255, 0.7);
		margin: 0 0 0.75rem 0;
		font-size: 0.8125rem;
		font-weight: 500;
	}

	.meal-location {
		background: rgba(26, 26, 26, 0.6);
		padding: 0.75rem;
		border-radius: 6px;
		border: 1px solid rgba(220, 20, 60, 0.1);
		backdrop-filter: blur(5px);
	}

	.address {
		margin: 0;
		font-weight: 600;
		font-size: 0.8125rem;
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.9);
	}

	.icon {
		flex-shrink: 0;
		filter: drop-shadow(0 0 4px rgba(220, 20, 60, 0.3));
	}

	.directions {
		margin: 0.5rem 0 0 1.5rem;
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.4;
		font-weight: 400;
	}

	/* Mobile optimizations */
	@media (max-width: 767px) {
		.meal-card {
			margin-bottom: 0.5rem;
		}

		.meal-header {
			padding: 0.625rem 0.875rem;
		}

		.meal-body {
			padding: 0.875rem;
		}

		.meal-event {
			font-size: 0.9375rem;
		}
	}

	/* Past event styling */
	.meal-card.past {
		opacity: 0.6;
		background: linear-gradient(135deg, rgba(64, 64, 64, 0.4) 0%, rgba(32, 32, 32, 0.6) 100%);
		border-color: rgba(128, 128, 128, 0.2);
	}

	.meal-card.past::before {
		background: linear-gradient(135deg, rgba(128, 128, 128, 0.02) 0%, transparent 50%);
	}

	.meal-card.past:hover {
		transform: translateY(-1px);
		opacity: 0.7;
		border-color: rgba(128, 128, 128, 0.3);
		box-shadow: 0 4px 15px rgba(128, 128, 128, 0.1);
	}

	.meal-card.past .meal-header {
		background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
		border-bottom-color: rgba(128, 128, 128, 0.2);
	}

	.meal-card.past .meal-header::after {
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(128, 128, 128, 0.3) 50%,
			transparent 100%
		);
	}

	.meal-card.past .meal-time {
		color: rgba(128, 128, 128, 0.8);
		text-shadow: none;
	}

	.meal-card.past .meal-number {
		background: rgba(128, 128, 128, 0.1);
		color: rgba(128, 128, 128, 0.6);
		border-color: rgba(128, 128, 128, 0.2);
	}

	.meal-card.past .meal-event {
		color: rgba(255, 255, 255, 0.6);
	}

	.meal-card.past .meal-provider {
		color: rgba(255, 255, 255, 0.4);
	}

	.meal-card.past .meal-location {
		background: rgba(64, 64, 64, 0.3);
		border-color: rgba(128, 128, 128, 0.1);
	}

	.meal-card.past .address {
		color: rgba(255, 255, 255, 0.5);
	}

	.meal-card.past .directions {
		color: rgba(255, 255, 255, 0.3);
	}

	.meal-card.past .icon {
		filter: grayscale(1) opacity(0.5);
	}

	/* Desktop enhancements */
	@media (min-width: 1024px) {
		.meal-card:hover {
			transform: translateY(-4px);
			box-shadow: 0 12px 35px rgba(220, 20, 60, 0.2);
		}

		.meal-card.past:hover {
			transform: translateY(-2px);
			box-shadow: 0 6px 20px rgba(128, 128, 128, 0.15);
		}

		.meal-header {
			padding: 0.875rem 1.25rem;
		}

		.meal-body {
			padding: 1.25rem;
		}

		.meal-event {
			font-size: 1.0625rem;
		}
	}
</style>
