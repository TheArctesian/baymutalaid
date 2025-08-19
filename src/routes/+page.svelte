<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import MealCard from '$lib/components/MealCard.svelte';
	import Map from '$lib/components/Map.svelte';
	import { mapStore } from '$lib/stores/mapStore';
	import { markPastEvents } from '$lib/utils/mealTransformer';
	import { createScrollObserver, observeElements, unobserveElements } from '$lib/utils/scrollUtils';
	import type { PageData } from './$types';

	export let data: PageData;

	let mealListContainer: HTMLElement;
	let processedMeals = markPastEvents(data.meals, data.currentLATime);
	let scrollObserver: IntersectionObserver | null = null;

	onMount(() => {
		if (browser && mealListContainer && processedMeals.length > 0) {
			// Setup scroll observer to sync map focus
			scrollObserver = createScrollObserver(mealListContainer, (index) => {
				const meal = processedMeals[index];
				if (meal) {
					mapStore.focusOnEvent(meal.id, meal);
				}
			});

			// Observe all meal cards
			setTimeout(() => {
				const mealCards = mealListContainer.querySelectorAll('[data-meal-index]');
				observeElements(scrollObserver!, mealCards);

				// Auto-scroll to current meal on desktop only
				const isMobile = window.innerWidth < 768;
				if (!isMobile) {
					const currentMealIndex = processedMeals.findIndex((meal) => !meal.isPast);
					if (currentMealIndex !== -1) {
						const mealCard = mealListContainer.querySelector(
							`[data-meal-index="${currentMealIndex}"]`
						);
						if (mealCard) {
							mealCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
						}
					}
				}
			}, 300);
		}
	});

	onDestroy(() => {
		if (scrollObserver && mealListContainer) {
			const mealCards = mealListContainer.querySelectorAll('[data-meal-index]');
			unobserveElements(scrollObserver, mealCards);
			scrollObserver.disconnect();
		}
	});

	const formatDate = (dateString: string) => {
		if (!dateString) return '';
		try {
			const parts = dateString.split(', ');
			return parts.length > 1 ? parts.slice(1).join(', ') : dateString;
		} catch (e) {
			return dateString;
		}
	};
</script>

<svelte:head>
	<title>FIND MEALS | Bay Mutual Aid</title>
	<meta
		name="description"
		content="Find free meals in Berkeley and Oakland area. Updated daily from assistlist.org"
	/>
</svelte:head>

<div class="meal-finder">
	<header class="page-header">
		<div class="header-content">
			<h1>FREE MEALS</h1>
			<p class="subtitle">BERKELEY • OAKLAND</p>
		</div>
		<div class="date-controls">
			<span class="date-label">DATE:</span>
			<span class="current-date">{formatDate(processedMeals[0]?.date || '')}</span>
			<DatePicker />
			<div class="time-info">
				<span class="time-label">CA TIME:</span>
				<span class="current-time">{data.currentLATime}</span>
			</div>
		</div>
	</header>

	<div class="content">
		<div class="map-container">
			<Map meals={processedMeals} />
		</div>

		<div class="meal-list-container">
			<div class="meal-list-header">
				<h2>MEAL LOCATIONS</h2>
				<div class="stats">
					<span class="meal-count">{processedMeals.length}</span>
					<span class="count-label">LOCATIONS</span>
				</div>
			</div>

			<div bind:this={mealListContainer} class="meal-list">
				{#if processedMeals.length === 0}
					<div class="no-meals">
						<h3>NO MEALS FOUND</h3>
						<p>Try selecting a different date.</p>
					</div>
				{:else}
					{#each processedMeals as meal, index}
						<div data-meal-index={index}>
							<MealCard {meal} {index} />
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.meal-finder {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 60px);
		height: calc(100dvh - 60px);
		width: 100%;
		margin: 0;
		padding: 0;
		background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
		position: relative;
	}

	.page-header {
		background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
		color: white;
		padding: 1rem;
		border-bottom: 1px solid rgba(220, 20, 60, 0.3);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: relative;
		overflow: hidden;
	}

	.page-header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.1) 0%, transparent 50%);
		pointer-events: none;
	}

	.header-content {
		position: relative;
		z-index: 1;
	}

	.header-content h1 {
		margin: 0;
		font-size: 1.75rem;
		font-weight: 800;
		letter-spacing: 0.5px;
		color: white;
		background: linear-gradient(135deg, #ffffff 0%, #dc143c 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1.1;
	}

	@supports not (-webkit-background-clip: text) {
		.header-content h1 {
			color: white !important;
			background: none !important;
			-webkit-text-fill-color: white !important;
		}
	}

	.subtitle {
		margin: 0.25rem 0 0 0;
		font-size: 0.75rem;
		letter-spacing: 1.5px;
		color: rgba(220, 20, 60, 0.8);
		font-weight: 600;
		text-transform: uppercase;
	}

	.date-controls {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		position: relative;
		z-index: 1;
		background: rgba(26, 26, 26, 0.8);
		padding: 0.75rem;
		border-radius: 8px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(220, 20, 60, 0.2);
	}

	.date-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.5px;
		color: rgba(255, 255, 255, 0.7);
		text-transform: uppercase;
	}

	.current-date {
		font-size: 0.875rem;
		margin: 0;
		color: #dc143c;
		font-weight: 700;
		letter-spacing: 0.25px;
		text-shadow: 0 0 10px rgba(220, 20, 60, 0.3);
	}

	.time-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(10, 10, 10, 0.8);
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		border: 1px solid rgba(220, 20, 60, 0.1);
	}

	.time-label {
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 0.5px;
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
	}

	.current-time {
		font-size: 0.75rem;
		margin: 0;
		color: rgba(255, 255, 255, 0.9);
		font-weight: 600;
		letter-spacing: 0.25px;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		position: relative;
		gap: 0;
	}

	@media (min-width: 768px) {
		.content {
			flex-direction: row;
			gap: 1rem;
		}
	}

	.map-container {
		flex: 1;
		min-height: 60vh;
		position: relative;
		border: 1px solid rgba(220, 20, 60, 0.2);
		border-radius: 8px;
		overflow: hidden;
		margin: 0 1rem;
		width: calc(100% - 2rem);
	}

	@media (min-width: 768px) {
		.map-container {
			flex: 1.2;
			min-height: 500px;
			margin: 1rem 0 1rem 1rem;
			width: auto;
		}
	}

	@media (min-width: 1024px) {
		.map-container {
			flex: 1.5;
			margin: 1rem 0 1rem 2rem;
		}
	}

	.meal-list-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
		border-top: 1px solid rgba(220, 20, 60, 0.3);
		margin: 1rem 1rem 0 1rem;
		border-radius: 8px;
		overflow: hidden;
		max-height: 35vh;
	}

	@media (min-width: 768px) {
		.meal-list-container {
			flex: 1;
			border-top: none;
			border-left: 1px solid rgba(220, 20, 60, 0.3);
			margin: 1rem 1rem 1rem 0;
			border-radius: 0 8px 8px 0;
			max-height: none;
		}
	}

	@media (min-width: 1024px) {
		.meal-list-container {
			margin-right: 2rem;
		}
	}

	.meal-list-header {
		padding: 1rem;
		background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
		border-bottom: 1px solid rgba(220, 20, 60, 0.3);
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.meal-list-header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent 0%, #dc143c 50%, transparent 100%);
	}

	.meal-list-header h2 {
		margin: 0;
		font-size: 1rem;
		color: white;
		font-weight: 700;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		position: relative;
		z-index: 1;
	}

	.stats {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(220, 20, 60, 0.1);
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		border: 1px solid rgba(220, 20, 60, 0.2);
		position: relative;
		z-index: 1;
	}

	.meal-count {
		color: #dc143c;
		font-size: 1.125rem;
		font-weight: 800;
		min-width: 1.5rem;
		text-align: center;
		text-shadow: 0 0 10px rgba(220, 20, 60, 0.3);
	}

	.count-label {
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 1px;
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
	}

	.meal-list {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		background: linear-gradient(180deg, rgba(10, 10, 10, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%);
		-webkit-overflow-scrolling: touch;
	}

	.no-meals {
		text-align: center;
		padding: 3rem 1rem;
		color: rgba(255, 255, 255, 0.6);
		background: rgba(26, 26, 26, 0.5);
		border-radius: 8px;
		border: 1px solid rgba(220, 20, 60, 0.1);
		margin: 2rem 0;
	}

	.no-meals h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: 0.5px;
		color: white;
		text-transform: uppercase;
	}

	.no-meals p {
		margin: 0;
		font-size: 0.875rem;
		font-weight: 500;
		opacity: 0.8;
	}

	.meal-list::-webkit-scrollbar {
		width: 4px;
	}

	.meal-list::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.3);
	}

	.meal-list::-webkit-scrollbar-thumb {
		background: linear-gradient(180deg, #dc143c 0%, #ff1744 100%);
		border-radius: 2px;
	}

	.meal-list::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(180deg, #ff1744 0%, #dc143c 100%);
	}

	@media (min-width: 768px) {
		.meal-finder {
			max-width: 1200px;
			margin: 0 auto;
			border-left: 1px solid rgba(220, 20, 60, 0.1);
			border-right: 1px solid rgba(220, 20, 60, 0.1);
		}

		.page-header {
			padding: 1.5rem 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.header-content h1 {
			font-size: 2.25rem;
		}

		.subtitle {
			font-size: 0.875rem;
		}

		.meal-list-header {
			padding: 1.25rem 1.5rem;
		}

		.meal-list-header h2 {
			font-size: 1.125rem;
		}
	}

	@media (min-width: 1024px) {
		.meal-finder {
			max-width: 100%;
			height: calc(100vh - 70px);
			height: calc(100dvh - 70px);
			border: none;
		}

		.page-header {
			padding: 2rem 3rem;
		}

		.header-content h1 {
			font-size: 3rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		.meal-list-header {
			padding: 1.5rem 2rem;
		}

		.meal-list-header h2 {
			font-size: 1.25rem;
		}

		.meal-list {
			padding: 1.5rem;
		}
	}
</style>
