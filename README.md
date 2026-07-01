A starting point for full-stack web apps. Express + React + MUI with shared TypeScript types.

After creating a repo from this template:

1. Edit `name` and `productName` in `package.json`
2. `npm install` (regenerates the lock file)
3. `sh .github/bootstrap.sh` (applies branch protection and merge settings via `gh`)

## What's included

- **Server**: Express 5, zod-validated env, JSON error middleware, graceful SIGTERM shutdown
- **Client**: React 19, MUI 9, React Router 7, TanStack Query, `apiClient` wrapper
- **Shared**: API contract + entities + app branding derived from `package.json`
- **Build**: Vite (client) + tsc (server), both output to `dist/`
- **Test**: Vitest + supertest + React Testing Library + MSW, v8 coverage
- **Lint**: Biome (format + lint in one tool)
- **CI**: GitHub Actions with PR coverage diff
- **Hooks**: simple-git-hooks (biome + typecheck on pre-push)
- **Deploy**: Multi-stage `Dockerfile` (tsc + vite build, used by container platforms)

## Structure

```
src/
  server/   Express API
  client/   React + Vite + MUI (layout/ + pages/)
  shared/   API contract + entities + branding
```

## Dev

```
npm install
npm run dev
```

- Client on http://localhost:5173 (Vite; proxies `/api` to server)
- Server on http://localhost:3001

## Build & start (prod)

```
npm run build
npm start
```

## Test

```
npm test              # single run
npm run test:watch    # watch mode
npm run test:coverage # text + HTML report
```

## Env

Copy `.env.example` to `.env`. Vars are validated on boot in `src/server/env.ts`.
