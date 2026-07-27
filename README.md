# Lowverflow

A community-driven Q&A platform where users can post questions, get answers, and organize discussions with tags and categories.

## Getting Started

### Prerequisites

- Node.js (v4 or higher)
- MySQL server running locally
- npm package manager

### Installation

1. Navigate to the blog directory:
   ```
   cd blog
   ```

2. Install all dependencies:
   ```
   npm install
   ```

3. Set up your MySQL database:
   - Create a database named `lowverflow`
   - Default connection uses `root` user with no password on localhost
   - If your setup differs, update the connection settings in `models/index.js`

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`

The app uses nodemon for auto-restart during development.

## Features

- **Ask Questions** - Post new questions with title and description
- **Answer Questions** - Community members can provide answers
- **Edit Questions** - Authors can modify their questions
- **Tags** - Categorize questions with multiple tags
- **Categories** - Organize discussions into different categories
- **User Accounts** - Register and login with email and password
- **Profiles** - User profiles with Gravatar integration
- **Session Management** - Secure session handling for logged-in users

## Project Structure

```
blog/
├── app.js                 # Express app configuration and middleware
├── package.json           # Project dependencies
├── bin/www                # Server startup script
├── routes/
│   └── index.js          # Main application routes
├── models/
│   ├── index.js          # Sequelize database setup
│   ├── User.js           # User model with bcrypt password hashing
│   ├── Question.js       # Question model
│   ├── Answer.js         # Answer model
│   ├── Tag.js            # Tag model
│   └── Category.js       # Category model
├── views/
│   ├── layouts/          # Header and footer templates
│   ├── question/         # Question-related pages
│   ├── answer/           # Answer creation forms
│   ├── auth/             # Login and registration pages
│   ├── category/         # Category pages
│   ├── tag/              # Tag pages
│   ├── user/             # User profile pages
│   └── error/            # Error pages
└── public/
    └── css/              # Stylesheets
```

## Authentication

New users must register with an email and password. Passwords are hashed with bcrypt (salt rounds: 10) before storage. Login is required to post questions and answers. Sessions are file-based and stored in the sessions directory.

## Database Models

**User** - Stores user accounts with encrypted passwords and email validation
**Question** - Created by users, can have multiple answers and be tagged/categorized
**Answer** - Belongs to a question and user
**Tag** - Used to label and organize questions
**Category** - Classifies different types of questions

## Development

The app runs on port 3000 by default. View templates use EJS syntax. Database models use Sequelize ORM for MySQL interactions.

## Notes

- Session secret is currently hardcoded - change before production use
- File-based session storage is not recommended for production
- Database connection uses root user with no password - update for security
