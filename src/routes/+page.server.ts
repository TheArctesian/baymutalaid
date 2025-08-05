// src/routes/meals/+page.server.ts
import { fetchMealEvents } from '$lib/scrapers/assistlistScraper';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const dateParam = url.searchParams.get('date');
  const meals = await fetchMealEvents(dateParam || undefined);

  return {
    meals
  };
};
