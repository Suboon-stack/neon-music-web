# Neon Music

Neon Music is a responsive music discovery and simulated player portfolio project built with React, TypeScript, Vite, and CSS custom properties.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run lint` to check the source and `npm run build` to type-check and build it.

## Current features

- Welcome, login, and registration screens with client-side validation and guest access.
- Home dashboard and Discover browse and search views. Discover searches the local catalog, groups results by type, and combines text search with genre filters.
- Album and playlist details with track lists, collection queues, and shared favorites.
- Desktop sidebar, mobile navigation, and a shared mini-player. Playback and volume controls only change the simulation. Player and favorite state live in memory during app navigation.
- Hash routes such as `/#/discover`, `/#/albums/after-hours`, and `/#/playlists/focus-flow`. Album and playlist paths come from catalog IDs.

## Demo catalog

The catalog in `src/data/` contains a subset of tracks and uses typography-based artwork. Album track counts describe the tracks available in the demo. The Discover genre assignments are sample filter labels for the local tracks. Trending, playlists, and editorial picks are curated demo content.

## Source layout

| Folder | Purpose |
| --- | --- |
| `src/app/` | Route definitions, screen selection, and shared player and favorite state |
| `src/components/` | Responsive shell, navigation, page headings, and shared UI |
| `src/data/` | Catalog metadata and discovery filters |
| `src/features/auth/` | Welcome and account pages |
| `src/features/home/` | Dashboard, shared artwork and controls, and preview player |
| `src/features/discover/` | Browse and search views |
| `src/features/collections/` | Album and playlist details and reusable track list |
| `src/types/` | Music data interfaces |

Account services, catalog integration, library management, and settings remain planned.
