NC Journal

Overview

NC Journal is a responsive, React-based news application that provides a seamless user experience for reading and interacting with articles. Built with a modern tech stack, this application connects to a custom API to display news articles with features like user authentication, comments, and voting.
Features

Responsive Design: Optimized for all device sizes
User Authentication: Create an account, log in, and personalize your experience
Article Browsing: View all articles with pagination support
Topic Filtering: Filter articles by topics
Article Interaction: Read, comment on, and vote on articles
User Profiles: View user information and their submitted content
Comment Management: Post, delete, and vote on comments

Tech Stack

Frontend: React, React Router v7
State Management: React Context API
Styling: CSS with responsive design principles
Backend Connection: Axios for API requests
Authentication: Supabase Auth
Deployment: Netlify with CI/CD

Getting Started
Prerequisites

Node.js (v18.20.7 or higher)
npm (v10.8.2 or higher)

Installation

Clone the repository

git clone https://github.com/yourusername/nc-journal.git
cd nc-journal

Install dependencies

npm install

Create a .env file in the root directory with the following variables:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=https://your-api-url.com/api

Start the development server

npm run dev

Open your browser and navigate to http://localhost:5173

API Integration
NC Journal connects to a RESTful API with the following endpoints:
Available Endpoints
GET /api

Description: Serves up a JSON representation of all the available endpoints of the API

GET /api/topics

Description: Serves an array of all topics
Example Response:

json{
"topics": [
{
"slug": "football",
"description": "Footie!"
}
]
}
GET /api/articles

Description: Serves an array of all articles
Queries: author, topic, sort_by, order
Example Response:

json{
"articles": [
{
"title": "Seafood substitutions are increasing",
"topic": "cooking",
"author": "weegembump",
"body": "Text from the article..",
"created_at": "2018-05-30T15:59:13.341Z",
"votes": 0,
"comment_count": 6
}
]
}
GET /api/articles/:article_id

Description: Serves a single article by its ID
Example Response:

jsonC{
"article": {
"article_id": 1,
"title": "Living in the shadow of a great man",
"topic": "mitch",
"author": "butter_bridge",
"body": "I find this existence challenging",
"created_at": "2020-07-09T20:11:00.000Z",
"votes": 100,
"comment_count": 11
}
}
GET /api/articles/:article_id/comments

Description: Serves all comments for a specific article
Example Response:

json{
"comments": [
{
"comment_id": 1,
"body": "Oh, I've got compassion running out of my nose, pal!",
"article_id": 1,
"author": "butter_bridge",
"votes": 16,
"created_at": "2020-04-06T12:17:00.000Z"
}
]
}
POST /api/articles/:article_id/comments

Description: Adds a comment to a specific article
Request Body:

json{
"username": "butter_bridge",
"body": "This article is great!"
}

Example Response:

json{
"comment": {
"comment_id": 19,
"body": "This article is great!",
"article_id": 1,
"author": "butter_bridge",
"votes": 0,
"created_at": "2024-01-31T12:00:00.000Z"
}
}
PATCH /api/articles/:article_id

Description: Updates the votes on an article
Request Body:

json {
"votes": 1
}

Example Response:

json{
"article": {
"article_id": 1,
"title": "Living in the shadow of a great man",
"topic": "mitch",
"author": "butter_bridge",
"body": "I find this existence challenging",
"created_at": "2020-07-09T20:11:00.000Z",
"votes": 101
}
}
DELETE /api/comments/:comment_id

Description: Deletes a comment by its ID

GET /api/users

Description: Serves an array of all users
Example Response:

json{
"users": [
{
"username": "butter_bridge",
"name": "jonny",
"avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
}
]
}
Project Structure

nc-journal/
├── public/
│ ├── news icon.jpg
│ └── other assets...
├── src/
│ ├── components/
│ │ ├── Article/
│ │ ├── ArticleList/
│ │ ├── Auth/
│ │ ├── Comments/
│ │ ├── Header/
│ │ ├── Nav/
│ │ ├── Topics/
│ │ ├── Users/
│ │ └── UI/
│ ├── contexts/
│ │ ├── AuthContext.jsx
│ │ └── ArticleContext.jsx
│ ├── utils/
│ │ ├── api.js
│ │ └── helpers.js
│ ├── App.jsx
│ ├── index.css
│ ├── main.jsx
│ └── supabaseClient.js
├── .env
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js

Deployment

The application is deployed on Netlify with continuous deployment from the main branch. Any push to the main branch will trigger a new build and deployment.
Environment Variables for Production
Make sure to set the following environment variables in your Netlify dashboard:

VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_API_URL

Future Enhancements

Article search functionality
User profile customization
Responsive image optimization
Article bookmarking
Social media sharing

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

Northcoders for providing the bootcamp experience
All the open-source libraries that made this project possible
