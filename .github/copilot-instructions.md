# Copilot Instructions for ProjectOverflow Angular Codebase

## Project Overview
- This is a modern Angular (v19+) single-page application, generated with Angular CLI.
- The app is structured around a root `AppComponent` with a home page composed of feature sections (Hero, Services, Portfolio, About, Contact), and shared Core components (Header, Footer).
- All major UI sections are implemented as **standalone Angular components** (see `src/app/pages/home/`).
- Routing is set up but currently empty (`src/app/app.routes.ts`).

## Key Architectural Patterns
- **Standalone Components:** All feature and shared components use Angular's `standalone: true` pattern. Import dependencies via the `imports` array in the `@Component` decorator.
- **SCSS Styling:** All components use SCSS for styles. Global styles and third-party CSS (FontAwesome) are included in `src/styles.scss` and configured in `angular.json`.
- **No Services/State Management:** There are currently no Angular services, NgRx, or global state management. Data is local to each component.
- **No Backend/API Integration:** All data (e.g., portfolio projects, contact form) is static or handled in-memory.
- **Testing:** Each component has a corresponding `.spec.ts` file using Angular's default testing setup (Jasmine + TestBed).

## Developer Workflows
- **Start Dev Server:** `npm start` or `ng serve` (see `package.json` scripts). App runs at `http://localhost:4200/`.
- **Build for Production:** `npm run build` or `ng build`. Output in `dist/project/`.
- **Run Unit Tests:** `npm test` or `ng test` (Karma runner).
- **Scaffold Components:** Use Angular CLI: `ng generate component <name> --standalone` (SCSS is default).
- **Debugging:** VS Code launch configs are provided for serving and testing (`.vscode/launch.json`).

## Project-Specific Conventions
- **Component Organization:**
  - Shared layout: `src/app/core/` (Header, Footer)
  - Feature sections: `src/app/pages/home/` (Hero, Services, Portfolio, About, Contact)
- **Assets:** Place images and icons in `src/assets/` (referenced as `assets/...` in templates).
- **FontAwesome:** Included via npm and configured in `angular.json` styles.
- **Routing:** Use `routerLink` in templates for navigation, even if routes are not yet implemented.
- **Forms:** Use Angular's `FormsModule` for template-driven forms (see ContactComponent).
- **Responsiveness:** SCSS uses media queries for mobile support in all major sections.

## Examples
- **Standalone Component Import:**
  ```ts
  @Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    ...
  })
  ```
- **Adding a New Section:**
  1. Generate with `ng generate component pages/home/new-section --standalone`
  2. Add to `HomeComponent`'s `imports` and template.

## External References
- [Angular CLI Docs](https://angular.dev/tools/cli)
- [Standalone Components](https://angular.dev/guide/standalone-components)

---

**If updating this file, preserve these conventions and update examples as the codebase evolves.**
