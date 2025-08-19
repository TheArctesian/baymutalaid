import type { Map as LeafletMap, Marker, DivIcon } from 'leaflet';
import type { MealEvent } from '$lib/utils/mealTransformer';

export async function initializeMap(element: HTMLElement): Promise<LeafletMap> {
	const L = await import('leaflet');
	const map = L.map(element).setView([37.8715, -122.273], 13);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	setTimeout(() => map.invalidateSize(), 100);
	return map;
}

export function createMarkerIcon(isPast: boolean = false): DivIcon {
	const L = (window as any).L;
	return L.divIcon({
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
}

export function createPopupContent(meal: MealEvent, index: number): string {
	return `
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
}

export function addMarkerToMap(map: LeafletMap, meal: MealEvent, index: number): Marker {
	const L = (window as any).L;
	const { lat, lng } = meal.location.coordinates;
	const marker = L.marker([lat, lng], {
		icon: createMarkerIcon(meal.isPast)
	}).addTo(map);

	marker.bindPopup(createPopupContent(meal, index), {
		maxWidth: 300,
		className: 'custom-popup'
	});

	return marker;
}
