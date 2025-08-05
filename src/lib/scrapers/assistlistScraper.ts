// src/lib/scrapers/assistlistScraper.ts

import { JSDOM } from 'jsdom';
import type { Coordinates } from 'leaflet';

interface MealEvent {
	id: string;
	time: string;
	provider: string;
	event: string;
	location: {
		address: string;
		directions: string;
		mapUrl: string;
		coordinates: Coordinates;
	};
	date: string;
	providerUrl: string;
	eventUrl: string;
}

// Map to store known coordinates (to avoid geocoding repeatedly)
// In a real app, you might want to use a database for this
const knownCoordinates: Record<string, Coordinates> = {
	// Pre-populated with coordinates for locations in the data
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

/**
 * Fetches meal events from assistlist.org for a specific date
 * @param date Date in format YYYY-MM-DD
 * @returns Promise resolving to array of MealEvent objects
 */
export async function fetchMealEvents(date?: string): Promise<MealEvent[]> {
	// If no date provided, use today's date
	const targetDate = date || new Date().toISOString().split('T')[0];
	const url = `https://assistlist.org/days/${targetDate}.html`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
		}

		const html = await response.text();
		return parseMealEventsHtml(html);
	} catch (error) {
		console.error('Error fetching meal events:', error);
		throw error;
	}
}

/**
 * Parses HTML content from assistlist.org into structured MealEvent objects
 * @param html HTML content to parse
 * @returns Array of MealEvent objects
 */
function parseMealEventsHtml(html: string): MealEvent[] {
	const dom = new JSDOM(html);
	const document = dom.window.document;

	// Extract date
	const dateElement = document.querySelector('.date_container');
	const date = dateElement ? dateElement.textContent?.trim() : '';

	const mealEvents: MealEvent[] = [];

	// Find all event containers
	const eventContainers = document.querySelectorAll('.event_container');

	eventContainers.forEach((container, index) => {
		// Extract time
		const timeElement = container.querySelector('.event_time');
		const time = timeElement ? timeElement.textContent?.trim() : '';

		// Extract provider
		const providerElement = container.querySelector('.event_provider a');
		const provider = providerElement ? providerElement.textContent?.trim() : '';
		const providerUrl = providerElement
			? `https://assistlist.org${providerElement.getAttribute('href')}`
			: '';

		// Extract event
		const eventElement = container.querySelector('.event_name a');
		const event = eventElement ? eventElement.textContent?.trim() : '';
		const eventUrl = eventElement
			? `https://assistlist.org${eventElement.getAttribute('href')}`
			: '';

		// Extract location
		const locationElement = container.querySelector('.event_location');
		const addressElement = locationElement?.querySelector('a');
		const address = addressElement ? addressElement.textContent?.trim() : '';
		const mapUrl = addressElement ? addressElement.getAttribute('href') || '' : '';

		// Get directions (text after <br>)
		let directions = '';
		if (locationElement) {
			const html = locationElement.innerHTML;
			const parts = html.split('<br>');
			if (parts.length > 1) {
				// Create a temporary element to parse HTML entities
				const tempDiv = document.createElement('div');
				tempDiv.innerHTML = parts[1];
				directions = tempDiv.textContent?.trim() || '';
			}
		}

		// Generate an ID for the event
		const id = `${date?.replace(/[^0-9]/g, '')}-${provider?.replace(/\s+/g, '_')}-${index}`;

		// Get coordinates or use default
		const coordinates = getCoordinates(address || '');

		mealEvents.push({
			id,
			time: time || '',
			provider: provider || '',
			event: event || '',
			location: {
				address: address || '',
				directions: directions || '',
				mapUrl: mapUrl || '',
				coordinates
			},
			date: date || '',
			providerUrl,
			eventUrl
		});
	});

	return mealEvents;
}

/**
 * Gets coordinates for a location, either from known coordinates or by geocoding
 * @param address The address to get coordinates for
 * @returns Coordinates object with lat and lng properties
 */
function getCoordinates(address: string): Coordinates {
	// Check if we already have coordinates for this address
	if (knownCoordinates[address]) {
		return knownCoordinates[address];
	}

	// In a real application, you would call a geocoding service here
	// For example, using OpenStreetMap's Nominatim API or Google Maps Geocoding API
	// For demonstration purposes, we'll just return a default location
	console.warn(`No coordinates found for address: ${address}`);
	return { lat: 37.8715, lng: -122.273 }; // Center of Berkeley as default
}

/**
 * Extracts coordinates from a Google Maps short URL by following redirects
 * Note: This would be implemented in a real application but isn't included here
 * because it requires making HTTP requests which may be blocked by CORS
 * @param mapUrl The Google Maps URL to extract coordinates from
 * @returns Promise resolving to Coordinates object
 */
async function extractCoordinatesFromMapUrl(mapUrl: string): Promise<Coordinates> {
	// In a real implementation, this would:
	// 1. Follow the redirect to get the full Google Maps URL
	// 2. Parse the coordinates from the URL
	// 3. Return the coordinates

	// This would typically be done server-side to avoid CORS issues

	// For demonstration purposes, return a default location
	return { lat: 37.8715, lng: -122.273 };
}
