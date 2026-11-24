# Neon Music

Neon Music is a responsive music discovery and player portfolio project. The current phase adds welcome, login, and registration screens to the responsive Neo-Brutalist foundation.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run lint` to check the source and `npm run build` to type-check and build it. The project uses React, TypeScript, Vite, ESLint, and regular CSS with custom properties.

## Current foundation

- Welcome, Log In, Create Account, Home, Discover, Album Details, Now Playing, Library, Playlist Details, and Settings routes.
- Client-side form validation, password visibility toggles, and guest access to Home. Login, registration, and password reset show a notice when an account service is needed.
- Desktop sidebar and mobile bottom navigation with active link styling and keyboard focus on the destination heading.
- Shared layout, page container, and link button components, plus types for songs, albums, artists, and playlists.

Routes use URL fragments, such as `/#/discover`. The browser handles link history and the app reads the current fragment to choose a page. Album and playlist routes use fixed sample paths while the screens are placeholders.

## Source layout

| Folder | Purpose |
| --- | --- |
| `src/app/` | Route definitions and screen selection |
| `src/components/layout/` | Responsive shell, navigation, and page headings |
| `src/components/ui/` | Brand mark and shared link button |
| `src/features/auth/` | Welcome and account pages, form components, validation, and styles |
| `src/styles/` | Design tokens and shared styles |
| `src/types/` | Music data interfaces |

## Planned features

Account authentication, password reset, social sign-in, catalog integration, search and discovery, album pages, library and playlist management, playback, and settings are planned for later phases.
