import type { Coordinates } from 'leaflet';

const COORDINATE_MAP: Record<string, Coordinates> = {
	'722 Washington St., Oakland': { lat: 37.8007, lng: -122.2751 },
	'2255 Shattuck Ave.': { lat: 37.8679, lng: -122.2679 },
	'1931 Center St., Berkeley': { lat: 37.8705, lng: -122.2754 },
	'2218 Acton St., Berkeley': { lat: 37.8651, lng: -122.2839 },
	'2427 Haste St.': { lat: 37.8659, lng: -122.2593 },
	'1921 San Pablo Ave., Oakland CA, 94612': { lat: 37.8107, lng: -122.2712 },
	'550 24th St., Oakland CA': { lat: 37.8132, lng: -122.2681 },
	'200 Grand Ave., Oakland CA': { lat: 37.8097, lng: -122.2557 },
	'1640 Stuart St., Berkeley': { lat: 37.8572, lng: -122.2754 },
	'1100 64th Ave., Oakland CA': { lat: 37.7644, lng: -122.1934 },
	'2150 Dwight Way, Berkeley CA': { lat: 37.8648, lng: -122.2667 },
	'1600 Sacramento St., Berkeley CA': { lat: 37.8775, lng: -122.2818 },
	'2012 Berkeley Way': { lat: 37.8731, lng: -122.2697 },
	'2478 Haste St., Berkeley': { lat: 37.8659, lng: -122.2582 },
	'2236 Parker St., Berkeley': { lat: 37.8625, lng: -122.2636 },
	'2300 Bancroft Way, Berkeley': { lat: 37.869, lng: -122.2625 }
};

const DEFAULT_COORDINATES: Coordinates = { lat: 37.8715, lng: -122.273 };

export function getCoordinates(address: string): Coordinates {
	return COORDINATE_MAP[address] || DEFAULT_COORDINATES;
}

export function getBerkeleyCenter(): Coordinates {
	return DEFAULT_COORDINATES;
}
