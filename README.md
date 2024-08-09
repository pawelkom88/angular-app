# Angular Games App

This is a simple Angular-based application created primarily as a learning project. The main focus is on understanding and practicing Angular concepts, so the design and CSS are not a priority (the app is pretty basic in appearance). The application simulates an authentication process and requires a JSON server to run the database (`db.json`).

## Features

- Basic Angular application structure
- JSON server to mock backend API
- Simulated authentication process
- Simple CRUD operations

## Prerequisites

To run this project, you'll need to have the following installed:

- [Node.js](https://nodejs.org/) (with npm)
- [Angular CLI](https://angular.io/cli)
- [JSON Server](https://github.com/typicode/json-server)

## Getting Started

### 1. Clone the repository

git clone https://github.com/pawelkom88/Angular-games-app.git
cd Angular-games-app

### 2. Install dependencies

npm install

### 3.Run the JSON server 

json-server ./src/data/db.json

### 4. Run the application

ng serve