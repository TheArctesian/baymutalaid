<!-- src/routes/meals/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import MealCard from '$lib/components/MealCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let map: any;
	let mapElement: HTMLElement;
	let mealListContainer: HTMLElement;

	onMount(async () => {
		if (browser && mapElement) {
			// Wait a tick to ensure the element is fully rendered
			await new Promise(resolve => setTimeout(resolve, 0));
			
			// Dynamically import Leaflet to avoid SSR issues
			const L = await import('leaflet');

			// Create custom marker icons
			const createCustomIcon = (isPast = false) => L.divIcon({
				className: `custom-marker ${isPast ? 'past-marker' : ''}`,
				html: `
					<div class="marker-pin">
						<div class="marker-icon ${isPast ? 'past' : ''}">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
							</svg>
						</div>
						<div class="marker-shadow"></div>
					</div>
				`,
				iconSize: [30, 40],
				iconAnchor: [15, 40],
				popupAnchor: [0, -40]
			});

			// Initialize map
			try {
				console.log('Initializing map with element:', mapElement);
				map = L.map(mapElement).setView([37.8715, -122.273], 13);
				console.log('Map initialized successfully:', map);
			} catch (error) {
				console.error('Error initializing map:', error);
				return;
			}

			// Add OpenStreetMap tile layer
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			// Force map to recalculate size after initialization
			setTimeout(() => {
				if (map) {
					map.invalidateSize();
					console.log('Map size invalidated');
				}
			}, 100);

			// Add markers for each meal event
			data.meals.forEach((meal, index) => {
				const { lat, lng } = meal.location.coordinates;

				// Create marker with appropriate icon based on past status
				const marker = L.marker([lat, lng], { icon: createCustomIcon(meal.isPast) }).addTo(map);

				// Create popup with event details
				const popupContent = `
          <div class="meal-popup ${meal.isPast ? 'past' : ''}">
            <div class="popup-header">
              <h3>${meal.event}</h3>
              <div class="popup-badges">
                <span class="popup-number">#${index + 1}</span>
                ${meal.isPast ? '<span class="popup-past">PAST</span>' : ''}
              </div>
            </div>
            <div class="popup-content">
              <div class="popup-field">
                <span class="field-label">PROVIDER:</span>
                <span class="field-value">${meal.provider}</span>
              </div>
              <div class="popup-field">
                <span class="field-label">TIME:</span>
                <span class="field-value">${meal.time}</span>
              </div>
              <div class="popup-field">
                <span class="field-label">ADDRESS:</span>
                <span class="field-value">${meal.location.address}</span>
              </div>
              ${
								meal.location.directions
									? `
                <div class="popup-field">
                  <span class="field-label">DIRECTIONS:</span>
                  <span class="field-value">${meal.location.directions}</span>
                </div>
              `
									: ''
							}
            </div>
          </div>
        `;

				marker.bindPopup(popupContent, {
					maxWidth: 300,
					className: 'custom-popup'
				});
			});
		}

		// Auto-scroll to current/next meal
		if (browser && mealListContainer && data.meals.length > 0) {
			setTimeout(() => {
				// Find the first non-past meal or current time meal
				const currentMealIndex = data.meals.findIndex(meal => !meal.isPast);
				
				if (currentMealIndex !== -1) {
					// Scroll to the meal card for the current/next meal
					const mealCard = mealListContainer.querySelector(`[data-meal-index="${currentMealIndex}"]`);
					if (mealCard) {
						mealCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
					}
				}
			}, 200); // Small delay to ensure DOM is ready
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
			<span class="current-date">{formatDate(data.meals[0]?.date || '')}</span>
			<DatePicker />
			<div class="time-info">
				<span class="time-label">CA TIME:</span>
				<span class="current-time">{data.currentLATime}</span>
			</div>
		</div>
	</header>

	<div class="content">
		<div class="map-container">
			<div bind:this={mapElement} class="map"></div>
		</div>

		<div class="meal-list-container">
			<div class="meal-list-header">
				<h2>MEAL LOCATIONS</h2>
				<div class="stats">
					<span class="meal-count">{data.meals.length}</span>
					<span class="count-label">LOCATIONS</span>
				</div>
			</div>

			<div bind:this={mealListContainer} class="meal-list">
				{#if data.meals.length === 0}
					<div class="no-meals">
						<h3>NO MEALS FOUND</h3>
						<p>Try selecting a different date.</p>
					</div>
				{:else}
					{#each data.meals as meal, index}
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

	/* Fallback for browsers that don't support background-clip */
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
	}

	@media (min-width: 768px) {
		.content {
			flex-direction: row;
		}
	}

	.map-container {
		flex: 1;
		min-height: 300px;
		position: relative;
		border: 1px solid rgba(220, 20, 60, 0.2);
		border-radius: 8px;
		overflow: hidden;
		margin: 0 1rem;
		width: 100%;
	}

	.map {
		height: 100%;
		width: 100%;
		min-height: 300px;
		filter: contrast(1.1) brightness(0.9);
		z-index: 1;
		background: #1a1a1a;
	}

	/* Ensure Leaflet controls are visible */
	:global(.leaflet-control-zoom) {
		border: 1px solid rgba(220, 20, 60, 0.3) !important;
	}

	:global(.leaflet-control-zoom a) {
		background-color: rgba(26, 26, 26, 0.9) !important;
		border-bottom: 1px solid rgba(220, 20, 60, 0.3) !important;
		color: white !important;
	}

	:global(.leaflet-control-zoom a:hover) {
		background-color: rgba(220, 20, 60, 0.2) !important;
	}

	.meal-list-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
		border-top: 1px solid rgba(220, 20, 60, 0.3);
		margin-top: 1rem;
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

	/* Custom Map Marker Styles */
	:global(.custom-marker) {
		background: transparent !important;
		border: none !important;
	}

	:global(.marker-pin) {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 40px;
	}

	:global(.marker-icon) {
		width: 30px;
		height: 30px;
		background: linear-gradient(135deg, #dc143c 0%, #ff1744 100%);
		border: 2px solid #000000;
		border-radius: 50% 50% 50% 0;
		transform: rotate(-45deg);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 8px rgba(220, 20, 60, 0.4);
		transition: all 0.3s ease;
		position: relative;
		z-index: 1000;
	}

	:global(.marker-icon svg) {
		transform: rotate(45deg);
		color: white;
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
	}

	:global(.marker-shadow) {
		position: absolute;
		bottom: -2px;
		left: 50%;
		transform: translateX(-50%);
		width: 20px;
		height: 6px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 50%;
		filter: blur(2px);
	}

	:global(.marker-pin:hover .marker-icon) {
		transform: rotate(-45deg) scale(1.1);
		box-shadow: 0 4px 15px rgba(220, 20, 60, 0.6);
	}

	/* Past marker styles */
	:global(.marker-icon.past) {
		background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%) !important;
		border: 2px solid #4b5563 !important;
		box-shadow: 0 2px 8px rgba(107, 114, 128, 0.3) !important;
	}

	:global(.past-marker:hover .marker-icon.past) {
		transform: rotate(-45deg) scale(1.1);
		box-shadow: 0 4px 15px rgba(107, 114, 128, 0.4) !important;
	}

	/* Custom Popup Styles */
	:global(.leaflet-popup-content-wrapper) {
		background: linear-gradient(
			135deg,
			rgba(26, 26, 26, 0.98) 0%,
			rgba(0, 0, 0, 0.98) 100%
		) !important;
		border: 1px solid rgba(220, 20, 60, 0.3) !important;
		border-radius: 8px !important;
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.4),
			0 0 20px rgba(220, 20, 60, 0.2) !important;
		backdrop-filter: blur(20px) !important;
		-webkit-backdrop-filter: blur(20px) !important;
		padding: 0 !important;
		overflow: hidden !important;
	}

	:global(.leaflet-popup-content) {
		margin: 0 !important;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif !important;
	}

	:global(.leaflet-popup-tip) {
		background: linear-gradient(
			135deg,
			rgba(26, 26, 26, 0.98) 0%,
			rgba(0, 0, 0, 0.98) 100%
		) !important;
		border: 1px solid rgba(220, 20, 60, 0.3) !important;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
	}

	:global(.leaflet-popup-close-button) {
		color: rgba(255, 255, 255, 0.7) !important;
		font-size: 18px !important;
		font-weight: 700 !important;
		width: 24px !important;
		height: 24px !important;
		padding: 0 !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		transition: all 0.3s ease !important;
		border-radius: 4px !important;
		top: 8px !important;
		right: 8px !important;
	}

	:global(.leaflet-popup-close-button:hover) {
		color: #dc143c !important;
		background: rgba(220, 20, 60, 0.1) !important;
		transform: scale(1.1) !important;
	}

	:global(.meal-popup) {
		color: white;
		min-width: 280px;
		max-width: 320px;
	}

	:global(.popup-header) {
		background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
		padding: 1rem;
		border-bottom: 1px solid rgba(220, 20, 60, 0.3);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		position: relative;
	}

	:global(.popup-badges) {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		align-items: flex-end;
	}

	:global(.popup-header::after) {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent 0%, #dc143c 50%, transparent 100%);
	}

	:global(.popup-header h3) {
		margin: 0;
		font-size: 0.9375rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.25px;
		color: white;
		line-height: 1.2;
		flex: 1;
	}

	:global(.popup-number) {
		background: rgba(220, 20, 60, 0.2);
		color: #dc143c;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 700;
		border: 1px solid rgba(220, 20, 60, 0.3);
		text-shadow: 0 0 8px rgba(220, 20, 60, 0.3);
		flex-shrink: 0;
	}

	:global(.popup-past) {
		background: rgba(128, 128, 128, 0.2);
		color: rgba(128, 128, 128, 0.8);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.625rem;
		font-weight: 700;
		border: 1px solid rgba(128, 128, 128, 0.3);
		letter-spacing: 0.5px;
		flex-shrink: 0;
	}

	:global(.popup-content) {
		padding: 1rem;
		background: rgba(10, 10, 10, 0.8);
	}

	:global(.popup-field) {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-bottom: 0.75rem;
	}

	:global(.popup-field:last-child) {
		margin-bottom: 0;
	}

	:global(.field-label) {
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		color: rgba(220, 20, 60, 0.8);
	}

	:global(.field-value) {
		font-size: 0.8125rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.4;
	}

	/* Past popup styling */
	:global(.meal-popup.past) {
		opacity: 0.8;
	}

	:global(.meal-popup.past .popup-header) {
		background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
		border-bottom-color: rgba(128, 128, 128, 0.3);
	}

	:global(.meal-popup.past .popup-header::after) {
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(128, 128, 128, 0.3) 50%,
			transparent 100%
		);
	}

	:global(.meal-popup.past .popup-header h3) {
		color: rgba(255, 255, 255, 0.7);
	}

	:global(.meal-popup.past .popup-number) {
		background: rgba(128, 128, 128, 0.1);
		color: rgba(128, 128, 128, 0.6);
		border-color: rgba(128, 128, 128, 0.2);
		text-shadow: none;
	}

	:global(.meal-popup.past .popup-content) {
		background: rgba(32, 32, 32, 0.6);
	}

	:global(.meal-popup.past .field-label) {
		color: rgba(128, 128, 128, 0.6);
	}

	:global(.meal-popup.past .field-value) {
		color: rgba(255, 255, 255, 0.6);
	}

	/* Scrollbar styling */
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

	/* Tablet adjustments */
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

		.content {
			flex-direction: row;
		}

		.map-container {
			flex: 1.2;
			min-height: 500px;
			margin: 1rem 0 1rem 1rem;
		}

		.meal-list-container {
			flex: 1;
			border-top: none;
			border-left: 1px solid rgba(220, 20, 60, 0.3);
			margin-top: 0;
			margin-right: 1rem;
			margin-bottom: 1rem;
			border-radius: 0 8px 8px 0;
			overflow: hidden;
		}

		.meal-list-header {
			padding: 1.25rem 1.5rem;
		}

		.meal-list-header h2 {
			font-size: 1.125rem;
		}
	}

	/* Desktop full-screen */
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

		.map-container {
			flex: 1.5;
			margin: 1rem 0 1rem 2rem;
		}

		.meal-list-container {
			margin-right: 2rem;
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
