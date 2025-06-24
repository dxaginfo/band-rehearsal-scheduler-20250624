# Band Rehearsal Scheduler

A web application designed to help bands and musical groups schedule rehearsals efficiently, track attendance, and find optimal meeting times based on member availability.

## Features

- **User Authentication & Profiles** - Secure login and customizable user profiles for musicians
- **Band Management** - Create and manage band groups with role-based permissions
- **Availability Tracking** - Set recurring availability and exceptions
- **Smart Scheduling** - Automatically suggests optimal rehearsal times based on member availability
- **Attendance Tracking** - Record and monitor attendance for better planning
- **Notifications** - Automated reminders for upcoming rehearsals
- **Calendar Integration** - Sync with Google Calendar and other calendar platforms
- **Rehearsal Notes** - Document goals and notes for each session

## Technology Stack

- **Frontend**: React.js with TypeScript, Material UI, Redux Toolkit
- **Backend**: Node.js with Express, RESTful API
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with OAuth 2.0 support
- **Deployment**: Docker, AWS, GitHub Actions CI/CD

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL
- Docker (optional for containerized deployment)

### Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/band-rehearsal-scheduler-20250624.git
cd band-rehearsal-scheduler-20250624
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables
```bash
# Create .env files based on the example files
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Edit the .env files with your local configuration
```

4. Set up the database
```bash
cd backend
npm run db:setup
```

5. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# In a separate terminal, start frontend server
cd frontend
npm start
```

6. Access the application at `http://localhost:3000`

## Project Structure

```
band-rehearsal-scheduler/
├── frontend/                # React frontend
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Main application pages
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── store/           # Redux state management
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx          # Main application component
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Node.js backend
│   ├── src/                 # Source code
│   │   ├── controllers/     # API route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── app.js           # Express application setup
│   ├── prisma/              # Prisma ORM schema and migrations
│   └── package.json         # Backend dependencies
│
├── docker/                  # Docker configuration
├── .github/                 # GitHub Actions CI/CD workflows
└── README.md                # Project documentation
```

## Deployment

The application can be deployed using Docker and AWS:

```bash
# Build Docker images
docker-compose build

# Deploy with Docker Compose
docker-compose up -d
```

For production deployment, the project includes GitHub Actions workflows to automatically deploy to AWS Elastic Beanstalk.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.