# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Baymutalaid is a SvelteKit application that helps users find free meals in Berkeley/Oakland by scraping assistlist.org and displaying events on an interactive map.

## Development Commands

```bash
# Install dependencies (uses yarn)
yarn

# Run development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Type checking
yarn check

# Linting and formatting
yarn lint          # Check formatting
yarn format        # Auto-format code

# Database operations
yarn db:push       # Push schema to database
yarn db:generate   # Generate migrations
yarn db:migrate    # Run migrations
yarn db:studio     # Open Drizzle Studio
```

## Architecture Overview

### Core Data Flow

1. **Scraping**: `src/lib/scrapers/assistlistScraper.ts` fetches meal data from assistlist.org
2. **Server Loading**: `src/routes/+page.server.ts` calls scraper with date parameters
3. **Display**: `src/routes/+page.svelte` renders map (Leaflet) and list views
4. **Date Navigation**: `src/lib/components/DatePicker.svelte` handles date selection via URL params

### Authentication System

- Session-based auth in `src/lib/server/auth.ts`
- Cookie management in `src/hooks.server.ts`
- 30-day sessions with automatic renewal
- Uses @oslojs/crypto for secure token generation

### Database

- PostgreSQL via Neon with Drizzle ORM
- Schema in `src/lib/server/db/schema.ts`
- Tables: `user` (authentication), `session` (tokens)
- Connection via `DATABASE_URL` environment variable

### Key Technologies

- **Frontend**: Svelte 5 + SvelteKit 2
- **Styling**: TailwindCSS v4
- **Maps**: Leaflet.js with OpenStreetMap
- **Scraping**: JSDOM for HTML parsing
- **Database**: Drizzle ORM + PostgreSQL
- **Deployment**: Vercel adapter

## Important Files

- `src/lib/scrapers/assistlistScraper.ts` - Main scraping logic with pre-mapped coordinates
- `src/routes/+page.server.ts` - Server-side data loading
- `src/routes/+page.svelte` - Main UI with map and list
- `src/lib/server/auth.ts` - Authentication utilities
- `drizzle.config.ts` - Database configuration

## Code Style

- Prettier configured with tabs, single quotes, 100-char width
- TypeScript strict mode enabled
- Svelte 5 runes syntax
- TailwindCSS for styling

## Testing Approach

No test framework currently configured. When adding tests, check for appropriate framework installation first.

## Environment Setup

Create `.env` file with:

```
DATABASE_URL=postgresql://...
```

## Common Tasks

### Adding New Meal Locations

Update coordinate mappings in `src/lib/scrapers/assistlistScraper.ts:8-50`

### Modifying Map Display

Edit Leaflet configuration in `src/routes/+page.svelte:65-125`

### Database Schema Changes

1. Modify `src/lib/server/db/schema.ts`
2. Run `yarn db:generate` then `yarn db:push`
