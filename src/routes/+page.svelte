<!-- src/routes/meals/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import type { PageData } from './$types';
	import L from 'leaflet';

	export let data: PageData;

	let map: L.Map;
	let mapElement: HTMLElement;

	onMount(() => {
		if (browser) {
			// Import Leaflet CSS
			import('leaflet/dist/leaflet.css');

			// Initialize map
			map = L.map(mapElement).setView([37.8715, -122.273], 13);

			// Add OpenStreetMap tile layer
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			// Add markers for each meal event
			data.meals.forEach((meal) => {
				const { lat, lng } = meal.location.coordinates;

				// Create marker
				const marker = L.marker([lat, lng]).addTo(map);

				// Create popup with event details
				const popupContent = `
          <div class="meal-popup">
            <h3>${meal.event}</h3>
            <p><strong>Provider:</strong> ${meal.provider}</p>
            <p><strong>Time:</strong> ${meal.time}</p>
            <p><strong>Address:</strong> ${meal.location.address}</p>
            <p><strong>Directions:</strong> ${meal.location.directions}</p>
          </div>
        `;

				marker.bindPopup(popupContent);
			});
		}
	});

	// Format date for display
	const formatDate = (dateString: string) => {
		if (!dateString) return '';

		try {
			// Parse date string (Monday, August 4, 2025)
			const parts = dateString.split(', ');
			return parts.length > 1 ? parts.slice(1).join(', ') : dateString;
		} catch (e) {
			return dateString;
		}
	};
</script>

<svelte:head>
	<title>Free Meals in Berkeley & Oakland | assistlist.org</title>
</svelte:head>
<div class="meal-finder">
	<header>
		<h1>Free Meals in Berkeley & Oakland</h1>
		<p class="date">{formatDate(data.meals[0]?.date || '')}</p>
		<DatePicker />
	</header>
	<div class="content">
		<div class="map-container">
			<div bind:this={mapElement} class="map"></div>
		</div>

		<div class="meal-list">
			<h2>Available Meals Today</h2>

			{#each data.meals as meal}
				<div class="meal-card">
					<div class="meal-time">{meal.time}</div>
					<div class="meal-details">
						<h3>{meal.event}</h3>
						<p class="provider">{meal.provider}</p>
						<p class="address">{meal.location.address}</p>
						<p class="directions">{meal.location.directions}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.meal-finder {
		display: flex;
		flex-direction: column;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}

	header {
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 1.8rem;
		margin: 0;
	}

	.date {
		font-size: 1.2rem;
		color: #555;
		margin: 0.5rem 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
	}

	@media (min-width: 768px) {
		.content {
			flex-direction: row;
		}
	}

	.map-container {
		flex: 1;
		min-height: 400px;
	}

	.map {
		height: 100%;
		min-height: 400px;
		border-radius: 4px;
		overflow: hidden;
	}

	.meal-list {
		flex: 1;
		overflow-y: auto;
		max-height: 600px;
	}

	.meal-card {
		display: flex;
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: #f9f9f9;
		border-radius: 4px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.meal-time {
		min-width: 100px;
		font-weight: bold;
		color: #444;
	}

	.meal-details {
		flex: 1;
	}

	.meal-details h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
	}

	.provider {
		color: #666;
		margin: 0;
	}

	.address {
		margin: 0.5rem 0 0 0;
		font-weight: bold;
	}

	.directions {
		margin: 0.25rem 0 0 0;
		font-size: 0.9rem;
		color: #555;
	}

	/* Popup styles */
	:global(.meal-popup) {
		min-width: 200px;
	}

	:global(.meal-popup h3) {
		margin: 0 0 8px 0;
		font-size: 16px;
	}

	:global(.meal-popup p) {
		margin: 4px 0;
		font-size: 14px;
	}
</style>
