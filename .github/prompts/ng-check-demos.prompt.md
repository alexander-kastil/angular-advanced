---
name: check-ng-demos
description: Audit demo guides and components in any demos/ module, update outdated patterns to Angular v20+ best practices, and suggest new demos.
agent: Angular Expert
model: Claude Haiku 4.5 (copilot)
---

## Goal

Audit a demo module for outdated patterns, update markdown guides to match current code, and suggest new demos that would improve the teaching narrative.

## Instructions

### 1. Identify the module

If the user has not specified which module, ask or infer from the active file. Each module lives under `demos/<N>-<name>/<app-folder>/`.

### 2. Audit existing demos

For each entry in `db.json → demos`:

- Confirm the route exists in `demo.routes.ts`
- Confirm the markdown file exists in `public/markdown/<url>.md`
- Read the component `.ts` and `.html` and the markdown guide
- Flag any mismatches between the guide and the actual implementation

Common outdated patterns to look for and fix:

| Anti-pattern | Modern replacement |
|---|---|
| `@Input()` / `@Output()` decorators | `input()` / `output()` signal functions |
| `*ngIf` / `*ngFor` / `*ngSwitch` | `@if` / `@for` / `@switch` control flow |
| `async` pipe + `Observable` for HTTP | `httpResource()` |
| `toSignal(http.get(...))` | `httpResource()` |
| `effect()` + `.subscribe()` for data loading | `httpResource()` with reactive request fn |
| `BehaviorSubject` for local state | `signal()` |
| Constructor injection | `inject()` function |
| `standalone: true` in decorator | Remove — default in Angular v20+ |
| `CommonModule` import | Remove — use standalone imports |
| `ngClass` / `ngStyle` | `[class]` / `[style]` bindings |
| `ChangeDetectionStrategy.Default` | `ChangeDetectionStrategy.OnPush` |

### 3. Update markdown guides

For each guide that is out of date:

- Reflect the current component code accurately
- Show before/after code blocks when a migration is the story of the demo
- Keep guides short and focused — bullet points + fenced code blocks
- Do not add prose that restates what the code already shows

### 4. Categorize Demos by scanning components in samples and update db.json

Scan all component files in the demo folder:

- For each component directory that does NOT have a corresponding `db.json` entry, generate:
  - A short `url` slug (kebab-case, e.g., `standalone`, `control-flow`)
  - A clear `title` that describes the demo focus
  - A `teaches` description (1-2 sentences explaining what concept is demonstrated)
  - A `topic` category (e.g., "Component Fundamentals", "Component Composition", "Advanced Patterns", etc.)
  - A `sortOrder` number for logical progression
- Update `db.json → demos` to include all discovered components
- Ensure every component has a matching db.json entry with complete metadata

Example entry:
```json
{
  "url": "standalone",
  "title": "Standalone Component",
  "teaches": "Create standalone components without NgModule. Declare dependencies directly in the component decorator with imports, providers, and styles.",
  "sortOrder": 1,
  "topic": "Component Fundamentals"
}
```

### 5. Suggest new demos

After auditing, propose at least 2 new demos that would strengthen the module's teaching narrative. For each suggestion:

- Give it a short `url` slug and `title`
- Write one sentence describing what concept it teaches
- If unsure whether the concept is well-documented, ask: **"Search Microsoft Learn for Angular `<concept>` to confirm the recommended pattern before implementing"**

Use this syntax to trigger a Copilot web search:
```
@github What is the recommended Angular v20+ pattern for <concept>? Search learn.microsoft.com.
```

### 6. Clean orphan artifacts

- Markdown files in `public/markdown/` that are not referenced by any component → delete
- Routes in `demo.routes.ts` that have no matching `db.json` entry → flag for review
- `db.json` entries with no route → add the route or remove the entry
