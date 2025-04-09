# eBuddy Technical Test Monorepo (Turbo)

## Setup

1. Clone repository
2. Install dependencies: `pnpm install`
3. Environment setup:
- Backend: Copy `.env.example` to `.env`
- Frontend: Copy `.env.local.example` to `.env.local`

## Commands

```bash
# Development
pnpm dev            # All services
pnpm frontend:dev   # Frontend only
pnpm backend:dev    # Backend only

# Build
pnpm build          # All services
pnpm frontend:build # Frontend only
pnpm backend:build  # Backend only

# Other
pnpm format         # Format code
pnpm lint           # Lint code
pnpm start          # Start production