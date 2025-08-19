import type { Coordinates } from 'leaflet';
import type { ParsedEvent } from './htmlParser';
import { getCoordinates } from './coordinates';

export interface MealEvent {
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
	isPast?: boolean;
}

export function transformToMealEvent(
	parsedEvent: ParsedEvent,
	index: number,
	date: string
): MealEvent {
	const id = generateEventId(date, parsedEvent.provider, index);
	const coordinates = getCoordinates(parsedEvent.address);

	return {
		id,
		time: parsedEvent.time,
		provider: parsedEvent.provider,
		event: parsedEvent.event,
		location: {
			address: parsedEvent.address,
			directions: parsedEvent.directions,
			mapUrl: parsedEvent.mapUrl,
			coordinates
		},
		date,
		providerUrl: parsedEvent.providerUrl,
		eventUrl: parsedEvent.eventUrl
	};
}

function generateEventId(date: string, provider: string, index: number): string {
	const dateId = date.replace(/[^0-9]/g, '');
	const providerId = provider.replace(/\s+/g, '_');
	return `${dateId}-${providerId}-${index}`;
}

export function markPastEvents(events: MealEvent[], currentTime: string): MealEvent[] {
	return events.map((event) => ({
		...event,
		isPast: isEventPast(event.time, currentTime)
	}));
}

function isEventPast(eventTime: string, currentTime: string): boolean {
	const eventMinutes = timeToMinutes(eventTime);
	const currentMinutes = timeToMinutes(currentTime);
	return eventMinutes < currentMinutes;
}

function timeToMinutes(timeStr: string): number {
	const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
	if (!match) return 0;

	let hours = parseInt(match[1]);
	const minutes = parseInt(match[2]);
	const period = match[3]?.toUpperCase();

	if (period === 'PM' && hours !== 12) hours += 12;
	if (period === 'AM' && hours === 12) hours = 0;

	return hours * 60 + minutes;
}
