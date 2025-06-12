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
  - Username: `kiran`
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



## API Usage

### \[POST] `/person` — Create a person

```
curl --location 'http://localhost:3000/person' \
--header 'Content-Type: application/json' \
--data-raw '{
  "firstname": "John",
  "lastname": "Mark",
  "email": "kjmn@example.com",
  "phone": "1234567890"
}'
```

Returns: JSON of the created person



## 📚 API Documentation (OpenAPI Support)

- Access to Swagger/OpenAPI at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)



