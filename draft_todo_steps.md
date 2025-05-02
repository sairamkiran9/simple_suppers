### Tech Stack Overview

* PostgreSQL: Open-source SQL database with optional NoSQL features like JSONB.
* Docker Compose: Used to orchestrate services:

  * PostgreSQL
  * Backend service
  * Frontend (React)
  * Optional: API gateway or reverse proxy

---

### Initial Implementation Plan

1. Project Setup

   * Create base folder structure as mentioned template in the draft_plan or some other that might fit the project

2. Authentication

   * Implement OAuth2.0 with OpenID Connect using Google login.
   * Use JWT-based stateless authentication.

3. Frontend Planning

   * List the pages required in the web application:

     * Home
     * Login
     * Meals
     * Cart
     * Subscriptions
     * Profile
     * Other
   * Develop the UI using React.
   * Research React Native for future mobile development.

     * Evaluate compatibility, limitations, and transition difficulties.

4. UI Development with Mock Data

   * Populate UI with mock data to enable early design validation.
   * Add a demo mode toggle that injects fake data for showcasing functionality.
   * Enables UI to function independently from the backend during initial stages.

5. Backend Integration

   * Define API contracts and schema.
   * Integrate with PostgreSQL.
   * Develop RESTful APIs that match the frontend's mock data structure.
   * Once the schema and API responses align with mock data, connect frontend to live APIs.
