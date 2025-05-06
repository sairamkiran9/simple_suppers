# Simple Suppers

A meal planning subscription platform connecting users with meal planning experts.

## Project Overview

Simple Suppers is a web-based platform designed to bridge the gap between meal planning challenges and those with the experience and desire to help. The marketplace empowers everyday experts—chefs, parents, dietitians, and community cooks—to earn passive income by sharing meal plans through a subscription model.

### Key Features (MVP)

- User authentication and profile management
- Meal planner registration and onboarding
- Meal plan creation and management
- Shopping list generation
- Dietary preference filtering
- Subscription system
- Mobile-responsive design

## Tech Stack

### Frontend
- **React.js**: Component-based UI library
- **Redux**: State management
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime for server-side code
- **Express.js**: Web framework for Node.js
- **PostgreSQL**: Relational database for data persistence
- **Sequelize**: ORM for PostgreSQL
- **JWT**: Authentication and authorization

### DevOps
- **Git/GitHub**: Version control
- **Docker**: Containerization
- **Heroku**: Deployment platform

## Development Timeline

### Phase 1: Core Platform (Weeks 1-2)
- [ ] Set up project structure and development environment
- [ ] Implement user authentication system
- [ ] Create meal planner registration and profile pages (for producers)
- [ ] Develop meal plan creation interface (for consumers)
- [ ] Set up payment processing integration
- [ ] Create shopping list generator
- [ ] Implement basic subscription management

### Phase 2: User Experience & Features (Weeks 3-4)
- [ ] Implement meal plan browsing with filters
- [ ] Create planner profiles with ratings
- [ ] Develop add-on functionality (school lunch planning)
- [ ] Ensure mobile-responsive design
- [ ] Build user dashboard for subscription management

### Phase 3: Monetization & Community (Weeks 5-6)
- [ ] Enhance payment system with subscription tiers
- [ ] Implement planner commission structure
- [ ] Add tipping functionality
- [ ] Develop fundraising feature
- [ ] Create referral program

### Phase 4: Testing & Refinement (Week 7)
- [ ] Conduct user testing
- [ ] Optimize performance
- [ ] Fix bugs and refine features
- [ ] Prepare investor pitch materials
- [ ] Launch beta version

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- PostgreSQL (v14 or higher)
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/simple-suppers.git
cd simple-suppers
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Set up environment variables
Create `.env` files in both the server and client directories based on the provided `.env.example` files.

5. Set up the database
```bash
cd ../server
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

6. Start the development servers
```bash
# In the server directory
npm run dev

# In the client directory (in another terminal)
npm start
```

## Database Schema

- Users
- Planners
- MealPlans
- Subscriptions
- Payments

## **API Endpoints**

### Authentication

* `POST /api/auth/register` – Register new user
* `POST /api/auth/login` – Authenticate user
* `POST /api/auth/logout` – Log out user (optional)
* `GET /api/users/me` – Get profile of currently authenticated user

### Users

* `GET /api/users/:id` – Get user by ID
* `PUT /api/users/:id` – Update user info
* `DELETE /api/users/:id` – Delete user
* `GET /api/users/:id/subscriptions` – Get a user's subscriptions
* `GET /api/users/:id/payments` – Get payment history for a user

### Planners

* `GET /api/planners` – List all planners
* `GET /api/planners/:id` – Get planner by ID
* `POST /api/planners` – Create a planner
* `PUT /api/planners/:id` – Update planner

### Meal Plans

* `GET /api/meal-plans` – List all meal plans
* `GET /api/meal-plans/:id` – Get meal plan by ID
* `POST /api/meal-plans` – Create a meal plan
* `PUT /api/meal-plans/:id` – Update meal plan
* `DELETE /api/meal-plans/:id` – Delete meal plan
* `POST /api/meal-plans/:id/subscribe` – Subscribe to a meal plan

### Subscriptions

* `GET /api/subscriptions` – List all subscriptions (admin/internal use)
* `POST /api/subscriptions` – Create a new subscription
* `PUT /api/subscriptions/:id` – Update subscription (e.g., status, plan)
* `DELETE /api/subscriptions/:id` – Cancel subscription

### Payments

* `POST /api/payments` – Make a payment
* `GET /api/payments/:id` – Get payment detail by ID
* `GET /api/users/:id/payments` – Get user's payment history


## Directory Structure

```
simple-suppers/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── assets/          # Static assets
│       ├── components/      # React components
│       ├── context/         # React context providers
│       ├── hooks/           # Custom hooks
│       ├── pages/           # Page components
│       ├── services/        # API services
│       ├── store/           # Redux store
│       ├── utils/           # Utility functions
│       ├── App.js
│       └── index.js
├── server/                  # Node.js backend
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Sequelize models
│   ├── routes/              # Express routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   └── server.js            # Entry point
├── .gitignore
├── README.md
└── package.json
```

## Deployment - [Redesign it later, not for time being]

The application can be deployed to Heroku:

1. Create a new Heroku application
```bash
heroku create simple-suppers
```

2. Add PostgreSQL addon
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

3. Set environment variables
```bash
heroku config:set NODE_ENV=production
# Add other environment variables
```

4. Deploy the application
```bash
git push heroku main
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgements

- Inspired by the Mumbai Dabbawala system's efficiency and community-based structure
- Built to address meal planning challenges for various demographics
- Designed to create passive income opportunities for cooking experts
