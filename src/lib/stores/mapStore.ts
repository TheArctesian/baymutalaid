import { writable } from 'svelte/store';
import type { Map, Marker } from 'leaflet';
import type { MealEvent } from '$lib/utils/mealTransformer';

interface MapState {
	map: Map | null;
	markers: Marker[];
	focusedEventId: string | null;
}

function createMapStore() {
	const { subscribe, set, update } = writable<MapState>({
		map: null,
		markers: [],
		focusedEventId: null
	});

	return {
		subscribe,
		setMap: (map: Map) => update((state) => ({ ...state, map })),
		setMarkers: (markers: Marker[]) => update((state) => ({ ...state, markers })),
		focusOnEvent: (eventId: string, event: MealEvent) => {
			update((state) => {
				if (state.map) {
					const { lat, lng } = event.location.coordinates;
					state.map.setView([lat, lng], 15, {
						animate: true,
						duration: 0.5
					});

					const marker = state.markers.find((m, i) => event.id === eventId);
					if (marker) {
						marker.openPopup();
					}
				}
				return { ...state, focusedEventId: eventId };
			});
		},
		reset: () => set({ map: null, markers: [], focusedEventId: null })
	};
}

export const mapStore = createMapStore();
