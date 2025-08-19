import { JSDOM } from 'jsdom';

export interface ParsedEvent {
	time: string;
	provider: string;
	providerUrl: string;
	event: string;
	eventUrl: string;
	address: string;
	mapUrl: string;
	directions: string;
}

export function extractDate(html: string): string {
	const dom = new JSDOM(html);
	const dateElement = dom.window.document.querySelector('.date_container');
	return dateElement?.textContent?.trim() || '';
}

export function extractEvents(html: string): ParsedEvent[] {
	const dom = new JSDOM(html);
	const document = dom.window.document;
	const eventContainers = document.querySelectorAll('.event_container');
	const events: ParsedEvent[] = [];

	eventContainers.forEach((container) => {
		const event = extractEventFromContainer(container, document);
		if (event) {
			events.push(event);
		}
	});

	return events;
}

function extractEventFromContainer(container: Element, document: Document): ParsedEvent | null {
	const time = extractText(container, '.event_time');
	const provider = extractText(container, '.event_provider a');
	const providerUrl = extractUrl(container, '.event_provider a', 'https://assistlist.org');
	const event = extractText(container, '.event_name a');
	const eventUrl = extractUrl(container, '.event_name a', 'https://assistlist.org');
	const address = extractText(container, '.event_location a');
	const mapUrl = extractAttribute(container, '.event_location a', 'href');
	const directions = extractDirections(container, document);

	if (!time || !event) return null;

	return {
		time,
		provider,
		providerUrl,
		event,
		eventUrl,
		address,
		mapUrl,
		directions
	};
}

function extractText(container: Element, selector: string): string {
	const element = container.querySelector(selector);
	return element?.textContent?.trim() || '';
}

function extractUrl(container: Element, selector: string, baseUrl: string): string {
	const element = container.querySelector(selector);
	const path = element?.getAttribute('href');
	return path ? `${baseUrl}${path}` : '';
}

function extractAttribute(container: Element, selector: string, attribute: string): string {
	const element = container.querySelector(selector);
	return element?.getAttribute(attribute) || '';
}

function extractDirections(container: Element, document: Document): string {
	const locationElement = container.querySelector('.event_location');
	if (!locationElement) return '';

	const html = locationElement.innerHTML;
	const parts = html.split('<br>');
	if (parts.length <= 1) return '';

	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = parts[1];
	return tempDiv.textContent?.trim() || '';
}
