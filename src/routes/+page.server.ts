// src/routes/meals/+page.server.ts
import { fetchMealEvents } from '$lib/scrapers/assistlistScraper';
import type { PageServerLoad } from './$types';

function parseTimeString(timeStr: string): number {
	// Handle various time formats like "12:00 PM", "2:30 PM", "12 PM", etc.
	const cleanTime = timeStr.replace(/\s+/g, ' ').trim().toUpperCase();

	// Match time patterns
	const timeMatch = cleanTime.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/);
	if (!timeMatch) {
		// If no AM/PM, assume 24-hour format or return high value to sort last
		const numMatch = cleanTime.match(/(\d{1,2})(?::(\d{2}))?/);
		if (numMatch) {
			const hours = parseInt(numMatch[1], 10);
			const minutes = parseInt(numMatch[2] || '0', 10);
			return hours * 60 + minutes;
		}
		return 9999; // Sort unparseable times last
	}

	let hours = parseInt(timeMatch[1], 10);
	const minutes = parseInt(timeMatch[2] || '0', 10);
	const period = timeMatch[3];

	// Convert to 24-hour format
	if (period === 'AM' && hours === 12) {
		hours = 0;
	} else if (period === 'PM' && hours !== 12) {
		hours += 12;
	}

	return hours * 60 + minutes; // Return minutes since midnight
}

function getCurrentLATime(): Date {
	// Get current time in California (Pacific Time)
	const now = new Date();
	const laTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
	return laTime;
}

function isEventPast(timeStr: string, eventDate: string): boolean {
	const currentLA = getCurrentLATime();
	const currentDateStr = currentLA.toISOString().split('T')[0];

	// If event is on a different date, compare dates
	if (eventDate && eventDate !== currentDateStr) {
		const eventDateObj = new Date(eventDate + 'T00:00:00');
		const currentDateObj = new Date(currentDateStr + 'T00:00:00');
		return eventDateObj < currentDateObj;
	}

	// If event is today, compare times
	const eventMinutes = parseTimeString(timeStr);
	const currentMinutes = currentLA.getHours() * 60 + currentLA.getMinutes();

	return eventMinutes < currentMinutes;
}

export const load: PageServerLoad = async ({ url }) => {
	const dateParam = url.searchParams.get('date');
	const meals = await fetchMealEvents(dateParam || undefined);

	// Sort meals by time and add isPast property
	const sortedMeals = meals
		.map((meal) => ({
			...meal,
			timeValue: parseTimeString(meal.time),
			isPast: isEventPast(meal.time, dateParam || new Date().toISOString().split('T')[0])
		}))
		.sort((a, b) => a.timeValue - b.timeValue);

	return {
		meals: sortedMeals,
		currentLATime: getCurrentLATime().toLocaleTimeString('en-US', {
			timeZone: 'America/Los_Angeles',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		})
	};
};
