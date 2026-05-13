# Laravel Vuetify Starter Kit

A Laravel 13 starter kit with Inertia v3, Vue 3, Vuetify 3, Fortify, and Wayfinder.

## What’s included

- Inertia-powered app shell with Vue 3 and Vuetify 3
- Authentication flows for login, registration, password reset, email verification, password confirmation, and two-factor authentication
- Account settings for profile, security, and appearance
- Typed frontend route helpers generated with Wayfinder
- Light/dark theme initialization and flash toast support

## Requirements

- PHP 8.3 or later
- Composer
- Node.js and npm

## Getting started

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
```

You can also run the bundled setup script:

```bash
composer run setup
```

## Development

```bash
composer run dev
```

This starts the Laravel server, queue listener, log viewer, and Vite dev server.

## Useful commands

| Command | Description |
| --- | --- |
| `composer run test` | Run the app test suite |
| `composer run lint` | Fix PHP code style with Pint |
| `composer run lint:check` | Check PHP code style without changing files |
| `composer run ci:check` | Run the full local CI check |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the frontend for production |
| `npm run lint` | Lint and fix frontend files |
| `npm run lint:check` | Check frontend linting |
| `npm run format` | Format frontend files |
| `npm run types:check` | Run TypeScript type checks |

## Project structure

- `app/` - Laravel application code
- `routes/` - Web and settings routes
- `resources/js/pages/` - Inertia pages
- `resources/js/layouts/` - App and auth layouts
- `resources/js/components/` - Shared Vue components
- `resources/js/routes/` - Wayfinder route helpers

## Notes

- The welcome page and dashboard are powered by Inertia.
- Settings pages are grouped under `/settings`.
- Use the generated route helpers in `resources/js/routes/` instead of hardcoded URLs.
