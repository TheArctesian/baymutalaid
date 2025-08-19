import { extractDate, extractEvents } from '$lib/utils/htmlParser';
import { transformToMealEvent, type MealEvent } from '$lib/utils/mealTransformer';

export type { MealEvent };

export async function fetchMealEvents(date?: string): Promise<MealEvent[]> {
	const targetDate = date || new Date().toISOString().split('T')[0];
	const url = buildUrl(targetDate);
	const html = await fetchHtml(url);
	return parseHtml(html);
}

function buildUrl(date: string): string {
	return `https://assistlist.org/days/${date}.html`;
}

async function fetchHtml(url: string): Promise<string> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
	}
	return response.text();
}

function parseHtml(html: string): MealEvent[] {
	const date = extractDate(html);
	const events = extractEvents(html);
	return events.map((event, index) => transformToMealEvent(event, index, date));
}
