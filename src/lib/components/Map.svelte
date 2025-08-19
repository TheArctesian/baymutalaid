<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { mapStore } from '$lib/stores/mapStore';
	import { initializeMap, addMarkerToMap } from '$lib/utils/mapUtils';
	import type { MealEvent } from '$lib/utils/mealTransformer';

	interface Props {
		meals: MealEvent[];
	}

	let { meals }: Props = $props();
	let mapElement: HTMLElement;
	let mounted = false;

	onMount(async () => {
		if (!browser || !mapElement) return;

		await new Promise((resolve) => setTimeout(resolve, 0));

		const map = await initializeMap(mapElement);
		const markers = meals.map((meal, index) => addMarkerToMap(map, meal, index));

		mapStore.setMap(map);
		mapStore.setMarkers(markers);
		mounted = true;

		return () => {
			mapStore.reset();
			if (map) {
				map.remove();
			}
		};
	});
</script>

<div bind:this={mapElement} class="map-element"></div>

<style>
	.map-element {
		height: 100%;
		width: 100%;
		min-height: 300px;
		filter: contrast(1.1) brightness(0.9);
		z-index: 1;
		background: #1a1a1a;
	}

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

	:global(.marker-icon.past) {
		background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%) !important;
		border: 2px solid #4b5563 !important;
		box-shadow: 0 2px 8px rgba(107, 114, 128, 0.3) !important;
	}

	:global(.past-marker:hover .marker-icon.past) {
		transform: rotate(-45deg) scale(1.1);
		box-shadow: 0 4px 15px rgba(107, 114, 128, 0.4) !important;
	}

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
</style>
