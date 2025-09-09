# User Hierarchy - Organization Structure

A React application built with TypeScript and Vite for displaying and managing organizational hierarchy structures.

## Features

- User hierarchy visualization
- Login authentication

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Icons** - Icon library
- **JSON Server** - Mock API server
- **ESLint** - Code linting

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd OrgStruct
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### 4. Build for production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### 5. Preview production build

```bash
npm run preview
```

### 6. Run tests

```bash
# Run tests in watch mode (recommended for development)
npm run test

# Run tests once
npm run test:run

# Run tests with UI interface
npm run test:ui
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI interface

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (loading spinner, etc.)
│   ├── hierarchy/      # Hierarchy-specific components
│   └── login/          # Login-related components
├── constants/          # Application constants
├── context/            # React context providers
├── hooks/              # React custom hooks
├── services/           # API and data services
├── types/              # Shared typescript types
├── utils/              # Utility functions
└── views/              # Page components
```