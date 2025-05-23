# IndieRadio

A web application for streaming indie radio shows with DJ management capabilities.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MySQL

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a .env file based on .env.example:
```bash
cp .env.example .env
```

5. Update the .env file with your configuration:
- Set your database credentials
- Set a secure JWT secret key
- Configure email settings if needed
- Set Icecast streaming credentials

6. Initialize the database:
```bash
python init_mysql.py
python init_db.py
```

7. Start the backend server:
```bash
python app.py
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application should now be running at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## Features

- Live radio streaming
- DJ dashboard for managing shows
- User authentication
- Show scheduling
- Volume control with persistence
- Error handling and loading states

## Development

- Backend: Flask with SQLAlchemy
- Frontend: React with Context API for state management
- Authentication: JWT-based
- Database: MySQL
- Streaming: Icecast

## Environment Variables

### Backend (.env)
```
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_NAME=indieradio
JWT_SECRET_KEY=your_secure_jwt_secret_key
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_email_password
ICECAST_URL=http://localhost:8000
ICECAST_ADMIN=admin
ICECAST_PASSWORD=your_icecast_password
```

## Error Handling

The application includes comprehensive error handling for:
- Audio stream failures
- Network connectivity issues
- Authentication errors
- Database connection issues

## Security

- All sensitive credentials are stored in environment variables
- Passwords are hashed using secure algorithms
- JWT tokens for authentication
- CORS protection
- Input validation and sanitization
