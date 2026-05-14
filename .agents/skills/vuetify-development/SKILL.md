---
name: vuetify-development
description: "Develop Vuetify 4 UI in this Laravel Inertia Vue application. Use when creating or modifying Vuetify components, layouts, themes, icons, forms, validation, navigation drawers, app bars, dialogs, menus, overlays, data tables, responsive behavior, accessibility, CSS layers, or Vuetify plugin configuration. Always use Vuetify MCP documentation or API tools before changing Vuetify component props, events, slots, feature configuration, or framework setup."
---

# Vuetify Development

## Project Context

- Target Vuetify 4. Do not use Vuetify 2 or Vuetify 3-only APIs unless explicitly maintaining legacy code during a migration.
- This app uses Vue 3, Inertia v3, Vite, `vite-plugin-vuetify`, `@mdi/font`, and `vuetify`.
- Vue pages live under `resources/js/pages`; shared layouts and components should follow existing project structure.
- Activate `inertia-vue-development` when the work touches Inertia pages, forms, links, visits, or page props.
- Activate `wayfinder-development` when frontend code calls Laravel routes or controller actions.
- The project currently uses pnpm for frontend dependency changes and verification.

## Required Workflow

1. Inspect nearby Vue components, layouts, `resources/js/app.*`, Vuetify plugin files, and `vite.config.*` before editing.
2. Use Vuetify MCP before implementation:
   - Use `get_component_api_by_version` with `version: "latest"` for component props, events, slots, and `v-model` details.
   - Use `get_feature_guide` for `theme`, `accessibility`, `application-layout`, `display-and-platform`, `icon-fonts`, `internationalization`, `global-configuration`, and `sass-variables`.
   - Use `get_installation_guide` only for setup, plugin, Vite, SSR, or import changes.
   - Use `get_v4_breaking_changes`, `get_upgrade_guide`, or release notes for migration work or when touching APIs changed in v4.
3. Prefer existing Vuetify and project conventions over introducing new abstractions.
4. After frontend changes, run the smallest relevant checks: `pnpm run types:check`, `pnpm run lint:check`, or the affected test/build command if available.
5. If a local app URL is known or obvious, verify the changed UI in the browser and check recent browser logs.

## Implementation Rules

- Use Vuetify components and props first; add custom CSS only when Vuetify props, theme tokens, utility classes, or layout primitives cannot express the design.
- Keep Vue SFCs single-root and follow the existing `<script setup>` and TypeScript style in sibling files.
- Use Vuetify template component names consistently with the existing codebase, typically kebab-case such as `<v-btn>`, `<v-card>`, and `<v-text-field>`.
- Rely on `vite-plugin-vuetify` auto-imports when the project is configured for them; do not add broad `vuetify/components` imports unless existing setup requires it.
- Use `v-model` and `model-value` according to the component API returned by Vuetify MCP.
- Avoid Vuetify 2 and stale Vuetify 3 patterns such as old `value` assumptions, deprecated theme mutation, and removed component props.
- When changing selects, autocompletes, or comboboxes, confirm slot props because Vuetify 4 renamed the `item` slot prop to `internalItem`.

## Forms

- Use Inertia `<Form>` or `useForm` for server submission, processing state, redirects, and Laravel validation errors.
- Use Vuetify `v-form` for client-side validity only; do not make it the source of server submission state.
- Treat Vuetify 4 `v-form` slot props as unreffed values.
- Map Laravel field errors to Vuetify inputs with `:error-messages`.
- Disable or load submit controls with Inertia `processing`, for example `:loading="processing"` and `:disabled="processing"`.
- Prefer Vuetify `rules` for immediate client hints; keep authoritative validation in Laravel.

## Navigation

- Use Wayfinder route/controller helpers instead of hardcoded backend URLs.
- Use Inertia `<Link>` for SPA navigation. When using Vuetify components as clickable navigation controls, bind the generated URL/action through the project's established Inertia pattern.
- Do not switch to Vue Router unless the project already uses it for that surface.

## Layout And Responsive Behavior

- Wrap the application shell with `v-app` and page content with `v-main` where the existing layout expects Vuetify layout coordination.
- Use Vuetify layout components for app shells: `v-app-bar`, `v-navigation-drawer`, `v-footer`, and `v-bottom-navigation`.
- Use `useDisplay` for breakpoint-driven logic that cannot be handled with Vuetify responsive props or utility classes.
- Check v4 breakpoint behavior before relying on previous v3 visual thresholds; default breakpoint sizes changed in Vuetify 4.
- Keep mobile behavior explicit for drawers, dialogs, data-heavy cards, and tables.

## Theme, Icons, And Styling

- Configure colors, defaults, icons, display thresholds, locale, and aliases in the Vuetify plugin rather than scattering global overrides.
- Prefer theme colors and CSS variables such as `rgb(var(--v-theme-primary))` over hardcoded repeated colors.
- Vuetify 4 supports the built-in `system` theme; use `theme.change(...)`, `theme.toggle(...)`, or `theme.cycle(...)` instead of assigning `theme.global.name.value`.
- Vuetify 4 styles use CSS layers. Put application overrides in an explicit app layer after Vuetify layers, or use Vuetify props/theme tokens instead of specificity fights.
- Use MDI icon names with the installed `@mdi/font` setup unless the project already configures another icon set.
- Use `<v-icon icon="...">` and button icon props such as `prepend-icon`, `append-icon`, or `icon` instead of relying on icon text slots.
- Do not add new dependencies for fonts, icon sets, or styling without explicit approval.

## Accessibility

- Preserve Vuetify activator slot props: bind `v-bind="props"` for menus, dialogs, tooltips, and other overlays so ARIA and keyboard behavior remain intact.
- Use semantic labels on icon-only buttons with `aria-label` or accessible text.
- Keep focus management predictable for dialogs, menus, drawers, steppers, and forms.
- Check keyboard paths for interactive flows, especially open, close, submit, escape, tab, and arrow-key behavior.

## Common Pitfalls

- Do not use Vuetify 3 docs or examples without confirming they still apply to Vuetify 4.
- Do not assign `theme.global.name.value`; use `theme.change(...)`.
- Do not use the removed `v-snackbar` `multi-line` prop.
- Do not assume v3 CSS overrides still win; account for Vuetify 4 CSS layers.
- Do not bypass Inertia form state with standalone fetch/XHR for normal Laravel form submissions.
- Do not use arbitrary CSS to fight Vuetify density, variant, elevation, rounded, color, or layout props.
- Do not drop activator slot props from overlays.
- Do not assume a prop exists; confirm with Vuetify MCP component API first.
