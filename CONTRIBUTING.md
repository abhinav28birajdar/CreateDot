# Contributing to CreateDOT

Thank you for contributing to **CreateDOT**! Follow these guidelines to submit high-quality code.

## Development Workflow

1. **Fork & Clone**: Clone the repository locally.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**: Copy `.env.example` to `.env.local` and populate necessary API keys.
   ```bash
   cp .env.example .env.local
   ```
4. **Development Server**:
   ```bash
   npm run dev
   ```
5. **Code Checks**:
   Always run linting and type checking before committing:
   ```bash
   npm run lint
   npx tsc --noEmit
   npm run build
   ```

## Coding Conventions
- **TypeScript**: Strict type checking is enabled. Avoid `any` types. Use explicit return types on async utilities.
- **Styling**: Tailwind CSS with CSS variables in `app/globals.css`.
- **Components**: Reusable Shadcn UI components under `components/ui/`.
- **Commits**: Clear, imperative commit messages (e.g. `feat: add AI prompt enhancer`, `fix: resolve auth type error`).
