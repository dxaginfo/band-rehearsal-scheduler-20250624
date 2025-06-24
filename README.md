# Band Rehearsal Scheduler

A comprehensive web application that helps bands schedule rehearsals, track attendance, and optimize rehearsal times based on members' availability.

## Features

- **User Registration & Authentication**: Secure authentication for band members and managers
- **Band Management**: Create and manage bands with multiple members
- **Availability Tracking**: Members can set their weekly availability
- **Smart Scheduling**: Automatically suggests optimal rehearsal times based on member availability
- **Rehearsal Management**: Schedule, track, and manage rehearsals
- **Attendance Tracking**: Track member attendance and follow up with absentees
- **Notifications**: Email and in-app notifications for upcoming rehearsals and schedule changes
- **Mobile Responsive**: Works on all devices from desktops to smartphones

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux Toolkit for state management
- Material UI for component library
- Axios for API communication
- React Router for navigation
- Formik & Yup for form validation

### Backend
- Node.js with Express
- TypeScript for type safety
- PostgreSQL database
- Prisma ORM for database interaction
- JWT for authentication
- Express Validator for input validation

### DevOps
- Docker & Docker Compose for containerization
- GitHub Actions for CI/CD
- Jest for testing

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (if running locally without Docker)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=rehearsal_scheduler

# JWT
JWT_SECRET=your-secret-key

# App
NODE_ENV=development
```

### Installation

#### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/band-rehearsal-scheduler.git
cd band-rehearsal-scheduler
```

2. Start the application using Docker Compose:
```bash
docker-compose up -d
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

#### Manual Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/band-rehearsal-scheduler.git
cd band-rehearsal-scheduler
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

4. Start the backend:
```bash
npm run dev
```

5. In a new terminal, install frontend dependencies:
```bash
cd frontend
npm install
```

6. Start the frontend:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Documentation

The API documentation is available at `/api-docs` when running the backend server.

### Main API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/bands` - List bands
- `POST /api/bands` - Create a new band
- `GET /api/rehearsals` - List rehearsals
- `POST /api/rehearsals` - Create a new rehearsal
- `GET /api/availability` - Get user availability
- `POST /api/availability` - Set user availability

## Project Structure

```
.
├── backend                 # Backend Node.js/Express API
│   ├── prisma              # Prisma schema and migrations
│   ├── src                 # Source code
│   │   ├── controllers     # API controllers
│   │   ├── middleware      # Express middleware
│   │   ├── routes          # API routes
│   │   ├── utils           # Utility functions
│   │   └── server.ts       # Express server setup
│   └── tests               # Backend tests
│
├── frontend                # Frontend React application
│   ├── public              # Public assets
│   ├── src                 # Source code
│   │   ├── components      # React components
│   │   ├── pages           # Page components
│   │   ├── store           # Redux store and slices
│   │   ├── services        # API services
│   │   ├── utils           # Utility functions
│   │   └── App.tsx         # Main App component
│   └── tests               # Frontend tests
│
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Thanks to all the open source libraries that made this project possible
- Icons provided by Material Design Icons