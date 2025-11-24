# User Management Dashboard

A modern, production-ready user management dashboard built with Next.js 16, TypeScript, and TailwindCSS.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete users)
- ✅ Real-time search by name
- ✅ Filter by company
- ✅ Sort by email (A-Z / Z-A)
- ✅ Pagination (5 users per page)
- ✅ Dark mode with localStorage persistence
- ✅ Activity log tracking all changes
- ✅ Optimistic UI updates
- ✅ Responsive design
- ✅ User detail page
- ✅ Comprehensive test coverage

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS v4
- **UI Components**: Radix UI
- **Data Fetching**: TanStack React Query v5
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Testing**: Vitest + React Testing Library
- **API**: JSONPlaceholder (https://jsonplaceholder.typicode.com)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/             # React components
│   ├── layout/            # Layout components (Navbar)
│   ├── providers/         # Context providers
│   ├── ui/                # Reusable UI components
│   └── users/             # User-specific components
├── store/                 # Zustand stores
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
└── __tests__/            # Test files
```

## Key Features Explained

### Optimistic Updates

All mutations (create, update, delete) use optimistic updates for instant UI feedback:
- Changes appear immediately in the UI
- Automatically rolled back if the API request fails
- Provides a smooth, responsive user experience

### Dark Mode

- Toggle switch in the navbar
- Persists preference to localStorage
- Applies throughout the entire application
- Uses Tailwind's `dark:` classes

### Activity Log

- Tracks all user actions (ADD, EDIT, DELETE)
- Displays in a sidebar with color-coded action types
- Automatically generates timestamps
- Limits to 50 most recent entries

### State Management

- **Zustand** for global state (theme, auth, activity log)
- **React Query** for server state (user data, caching, mutations)
- Clean separation of concerns

## Testing

The project includes tests for:
- Zustand stores (theme, auth, activity log)
- UI components (filters, search)
- All tests pass with 100% success rate

## API Integration

Uses JSONPlaceholder API for demonstration:
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch single user
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

Note: JSONPlaceholder is a fake API and doesn't persist changes, but the optimistic updates make it feel real.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |


