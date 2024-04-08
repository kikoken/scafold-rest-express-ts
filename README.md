# Boilerplate for Express Project with TypeScript and DDD Architecture

This is a basic boilerplate to start an Express project using TypeScript and following the principles of Domain-Driven Design (DDD). It provides an initial structure that adheres to DDD conventions to organize the application code in a more modular and domain-oriented way.
This project use husky for:
- check commit
- check test
- cgecj linter

## Key Features
- Express.js: Uses Express.js as the framework for building server-side web applications.
- TypeScript: Utilizes TypeScript to add static types to JavaScript, aiding in detecting errors at compile time.
- DDD Architecture: Follows the principles of Domain-Driven Design to organize the code into clearly defined domains, layers, and modules.
- Predefined Endpoints: Includes two predefined endpoints:
    - /user: An endpoint for handling operations related to users.
    - /health: A health check endpoint to monitor the server's status.

## Requirements
- Node.js
- TypeScript

## Installation and Usage

1. Clone the repository:

git clone https://github.com/your-username/your-project.git

2. Install the dependencies:
npm install or pnpm or yarn

3. Run the server in development mode:
npm run dev

4.Access the endpoints from your web browser:
http://localhost:3000/user
http://localhost:3000/health

5. Run test
npm run test
pnpm test

## Project Structure

The project structure follows the principles of Domain-Driven Design (DDD), organizing the code into clearly defined domains, layers, and modules:

- src/: Contains all source files of the project.
    - domain/: Contains domain modules representing entities and business rules of the application.
    - application/: Contains application services that coordinate operations between domain modules and infrastructure layers.
    - infrastructure/: Contains the implementation of infrastructure layers such as controllers, routes, and repositories.
    - config/: Project configurations such as environment variables.

## Contributions
Contributions are welcome. If you find a bug or have a suggestion for improvement, please create an issue or send a pull request.

## License
This project is distributed under the MIT License.