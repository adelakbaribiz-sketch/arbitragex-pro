# Deployment

This is a standard Next.js application with no external runtime
dependencies (no database, no queue, no third-party API keys), so it deploys
anywhere Next.js does.

## Vercel (recommended for a portfolio demo)

1. Push this repository to GitHub
2. Import it in Vercel — it auto-detects Next.js, no configuration needed
3. No environment variables are required (see `.env.example`)
4. Deploy

## Self-hosted (Node.js)

```bash
npm install
npm run build
npm run start   # serves on :3000
```

## Docker

No Dockerfile is included — this app has no infrastructure dependencies
that would benefit from containerization at this stage (see ARCHITECTURE.md
for why a full backend wasn't built for this deliverable). A minimal
multi-stage Dockerfile would look like:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
```

This is provided as reference only and has not been built or tested as part
of this deliverable — see [TESTING.md](TESTING.md) for what was actually
verified.

## Environment variables

None required. See [`.env.example`](../.env.example).
