# SimpleSuppers

Food delivery application with:
- React Native frontend (Expo)
- Express + TypeScript backend
- PostgreSQL + Prisma ORM
- Dockerized local database with pgAdmin

## Project Setup

### Frontend (React Native)
- Server runs at [http://localhost:8081](http://localhost:8081)
    ```
    cd frontend
    npm install
    npx expo start
    ```

### Database Setup (PostgreSQL + pgAdmin)

```
docker-compose up -d       # Run containers in background
docker-compose logs -f     # View logs if needed
```

- **pgAdmin**: [http://localhost:5050](http://localhost:5050)
- **pgAdmin**:
  - Email: `admin@admin.com`
  - Password: `admin123`
  - Master Password: `admin123`
- **Database**: `simplesuppers`
  - Username: `postgres`
  - Password: `secret123`


### Prisma (ORM)

- Run migration:

    ```
    npx prisma migrate dev --name init
    ```

- Open Prisma Studio (GUI DB explorer):

    ```
    npx prisma studio
    ```

- Access: [http://localhost:5555](http://localhost:5555)


### Backend (Express + TypeScript)

- Server runs at: [http://localhost:3000](http://localhost:3000)

    ```
    cd backend
    npm install
    npm run dev
    ```



## API Documentation

### Swagger UI
- **Swagger/OpenAPI Documentation**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Interactive API testing interface with authentication support

### Authentication
The API uses Firebase Authentication with Bearer tokens. Protected endpoints require an `Authorization` header.

#### Getting Access Token for API Testing

1. **Start the frontend application:**
   ```bash
   cd frontend
   npx expo start
   ```

2. **Login through the app** - The access token will be automatically logged to the console when making authenticated requests.

3. **Copy the token** from the console output that shows:
   ```
   Access Token for Swagger: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Use in Swagger UI:**
   - Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
   - Click the "Authorize" button
   - Enter value in input field: `YOUR_TOKEN_HERE`
   - Click "Authorize"

#### Manual API Requests
For testing with curl or other tools:

```bash
curl --location 'http://localhost:3000/api/endpoint' \
--header 'Authorization: Bearer YOUR_TOKEN_HERE' \
--header 'Content-Type: application/json' \
--data-raw '{
  "your": "data"
}'
```

### Available Endpoints
- **Person Management**: Create, read, update person profiles
- **Profile Completion**: Complete user profiles with additional details
- **Address Management**: Manage user addresses
- **Authentication**: Firebase-based user authentication

See the full API documentation in Swagger UI for detailed endpoint information, request/response schemas, and interactive testing.



