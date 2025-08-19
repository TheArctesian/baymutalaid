import { readFileSync } from 'fs';
import { join } from 'path';
import type { PageServerLoad } from './$types';

export interface AboutContent {
	header: {
		title: string;
		subtitle: string;
	};
	organizations: {
		title: string;
		cards: Array<{
			title: string;
			description: string;
			items: string[];
		}>;
	};
	history: {
		title: string;
		sections: Array<{
			title: string;
			content: string[];
			principles?: Array<{
				name: string;
				description: string;
			}>;
		}>;
	};
	help: {
		title: string;
		cards: Array<{
			title: string;
			description: string;
			items: string[];
			contact: string;
		}>;
	};
	quote: {
		text: string;
		author: string;
	};
}

export const load: PageServerLoad = async (): Promise<{ content: AboutContent }> => {
	try {
		const contentPath = join(process.cwd(), 'static', 'about-content.json');
		const contentFile = readFileSync(contentPath, 'utf-8');
		const content: AboutContent = JSON.parse(contentFile);

		return {
			content
		};
	} catch (error) {
		console.error('Error loading about content:', error);

		// Fallback content in case JSON file is missing or invalid
		return {
			content: {
				header: {
					title: 'MUTUAL AID',
					subtitle: 'SOLIDARITY NOT CHARITY'
				},
				organizations: {
					title: 'BAY AREA ORGANIZATIONS',
					cards: []
				},
				history: {
					title: 'HISTORY & PRACTICE',
					sections: []
				},
				help: {
					title: 'GET HELP',
					cards: []
				},
				quote: {
					text: 'Mutual aid is about building community power through direct action and solidarity.',
					author: 'Bay Mutual Aid'
				}
			}
		};
	}
};
