🪙 Crypto Mini Tracker

Crypto Mini Tracker is a full-stack web application demonstrating real-time data fetching and state management. It provides a clean, elegant, and responsive interface for tracking the prices and 24-hour changes of popular cryptocurrencies like Bitcoin (BTC), Ethereum (ETH), and Ripple (XRP).

(Screenshot path to be confirmed)

🚀 Live Demo

You can view the deployed application on Render:

https://crypto-mini-tracker.onrender.com

✨ Features

Real-time price tracking via a custom Node.js backend proxy for the CoinGecko API.

Displays the 24-hour percentage change with positive/negative color indicators.

Global state management with Redux Toolkit to handle API loading, success, and error states.

Clean, modern, and elegant user interface with CSS.

Fully responsive design for desktop and mobile.

🛠️ Technology Stack

Frontend

React: Used for building the user interface (with Hooks and Functional Components).

Vite: Frontend tooling for a fast development environment and optimized builds.

TypeScript: For static typing, improving code quality and maintainability.

Redux Toolkit: For efficient and predictable global state management (handling API data, loading states, and errors).

CSS: Custom-styled components for an elegant and responsive design.

Backend

Node.js: JavaScript runtime for the server.

Express.js: Minimalist web framework used to create the REST API proxy.

TypeScript: For static typing on the server.

Axios: Promise-based HTTP client for fetching data from the external CoinGecko API.

CORS: Middleware for enabling cross-origin resource sharing between the frontend and backend.

Deployment

Render: Deployed as two separate services (Static Site for frontend, Web Service for backend) from a single monorepo.

💻 Getting Started: How to Run Locally

Follow these instructions to get a copy of the project running on your local machine for development and testing.

Prerequisites

You must have the following software installed:

Node.js (LTS) (which includes npm)

1. Clone the Repository

git clone [https://github.com/vanos0600/crypto-mini-tracker-.git](https://github.com/vanos0600/crypto-mini-tracker-.git)
cd crypto-mini-tracker-


2. Configure Environment Variables

This project requires environment variables for both the frontend and backend to communicate.

Backend (backend/):
Create a file named .env in the backend/ directory. The backend server uses this for the port.

PORT=3001


Frontend (frontend/):
Create a file named .env in the frontend/ directory. This tells the React app where to find the backend API.

VITE_API_BASE_URL=http://localhost:3001


3. Install & Run Backend

(In one terminal window)

cd backend
npm install
npm run dev 
# The backend server will start on http://localhost:3001 (or the port you set in .env)


4. Install & Run Frontend

(In a second terminal window)

# From the root directory
cd frontend
npm install
npm run dev
# The React app will open at http://localhost:5173 (or the port Vite indicates)


📁 Project Structure

crypto-mini-tracker-/
├── backend/
│   ├── src/
│   │   └── server.ts   # Main server logic & API proxy
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   │   └── logos/      # Coin images
│   ├── src/
│   │   ├── store/      # Redux setup (slice, store)
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md


⚖️ License

This project is licensed under the MIT License.

✉️ Contact

Oskar Vanegas

GitHub: github.com/vanos0600

Email: vanegaso045@gmail.com
