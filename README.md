
# Hero Vault

**Hero Vault** is the frontend part of a project designed to manage superheroes. It allows users to create, view, and edit information about heroes. This project is built with **React** and **Node.js**, with **MongoDB** as the database.

## Prerequisites

-   **Node.js** v14 or newer
-   **npm** or **yarn** as a package manager

## Getting Started

The project consists of two parts: backend (server) and frontend (interface).

### 1. Clone and Run the Backend

To set up the backend:

1.  Clone the backend repository:
    
    `git clone https://github.com/coldshein/hero-vault_backend.git` 
    
2.  Open the backend folder in your IDE (e.g., VS Code).
    
3.  Install dependencies and start the server:
    
    `npm install` `npm start` 
    
    This connects the server to the database and starts the API.
    

> **Note:** Ensure MongoDB is running locally.

### 2. Clone and Run the Frontend

Next, clone and start the frontend:

1.  Clone the frontend repository:
    
    `git clone https://github.com/coldshein/hero-vault.git` 
    
3.  Open the frontend folder in your IDE.
    
4.  Install dependencies and run the project:

    `npm install` `npm run dev` 
    
    This starts the local development server for the frontend.
    

## Project Structure

-   **backend/** - Backend API and database connection to MongoDB.
-   **frontend/** - Frontend interface, built with React and Next.js.

## Technologies Used

-   **Frontend:** React.js, Redux Toolkit, TypeScript, Material-UI, TailwindCSS, Vite.
-   **Backend:** Node.js, Express.js, MongoDB, Mongoose, UUID, Multer.
-   **Other tools:** Axios.

## Key Features

-   **Create and edit hero profiles**
-   **Upload and display images**
-   **Data storage in MongoDB**
