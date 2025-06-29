# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SimpleSuppers is a food delivery application with a React Native frontend (Expo), Express + TypeScript backend, and PostgreSQL database using Prisma ORM. The app connects home producers with consumers in a local food marketplace.

## Architecture

### Database Schema
The Prisma schema defines a multi-role user system:
- **Person**: Base entity for all users (firstname, lastname, email, phone)
- **Producer**: Licensed food producers who create menu items 
- **Consumer**: Users who place food orders
- **Address**: Location data linked to persons
- **MenuItem**: Food items created by producers
- **FoodOrder**: Orders with status tracking (PENDING, IN_PROGRESS, DELIVERED, CANCELLED)
- **OrderItem**: Junction table linking orders to menu items with quantities

### Backend Structure
- **Controllers**: Handle HTTP requests and responses (`backend/controllers/`)
- **Services**: Business logic layer (`backend/services/`)
- **Repositories**: Data access layer (`backend/repositories/`)
- **Routes**: API endpoint definitions (`backend/routes/`)
- **Validators**: Request validation using Zod (`backend/validators/`)
- **Middleware**: Custom middleware functions (`backend/middleware/`)

### Frontend Structure
- **Navigation**: React Navigation stack-based routing (`frontend/navigation/`)
- **Screens**: Main app screens (Login, Register, Home, etc.) (`frontend/screens/`)
- **Redux**: State management with Redux Toolkit (`frontend/redux/`)
- **API**: Authentication and HTTP clients (`frontend/api/`)
- **Components**: Reusable UI components (`frontend/components/`)

## Development Commands

### Database Setup
```bash
# Start PostgreSQL and pgAdmin containers
docker-compose up -d

# Run Prisma migrations
cd backend
npx prisma migrate dev --name <migration_name>

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Backend Development
```bash
cd backend
npm install
npm run dev        # Development server with hot reload
npm run build      # TypeScript compilation
npm start          # Production server
```

### Frontend Development
```bash
cd frontend
npm install
npx expo start     # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
```

## Database Connections

- **PostgreSQL**: `localhost:5432`
  - Database: `simplesuppers`
  - User: `postgres`
  - Password: `secret123`

- **pgAdmin**: `http://localhost:5050`
  - Email: `admin@admin.com`
  - Password: `admin123`

- **Prisma Studio**: `http://localhost:5555`

## API Documentation

- **Swagger UI**: `http://localhost:3000/api-docs`
- **Backend Server**: `http://localhost:3000`
- **Frontend Server**: `http://localhost:8081`

## Key Technologies

- **Backend**: Express.js, TypeScript, Prisma ORM, Zod validation, Swagger/OpenAPI
- **Frontend**: React Native, Expo, Redux Toolkit, React Navigation, Firebase Auth
- **Database**: PostgreSQL with Docker
- **Authentication**: Firebase Authentication with Google OAuth support
- **Styling**: TailwindCSS configuration for React Native

## Current Implementation Status

- Person entity CRUD operations are implemented
- Basic authentication flow with Firebase
- Database schema is established with migrations
- API documentation is configured with Swagger
- Frontend has basic navigation between Login, Register, and Home screens

Note: Some frontend screens (PlannerProfile, CreatePlan, ShoppingList) are commented out in navigation and not fully implemented yet.

## Code Style Rules

- NEVER use emojis or icons in code, console logs, or any output unless explicitly requested by the user