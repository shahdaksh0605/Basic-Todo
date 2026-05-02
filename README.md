# Simple To-Do App

## Structure
- `app.js`: Main server file using Express.
- `models/Task.js`: MongoDB schema for tasks.
- `views/index.ejs`: The user interface.

## How to Run
1. Ensure MongoDB is running on your machine.
2. Run `npm install` to install dependencies.
3. Run `node app.js`.
4. Open `http://localhost:3000` in your browser.

## Key Decisions
- **EJS**: Used for simplicity so we don't need a separate React/Vue frontend.
- **Mongoose Validation**: Used the built-in `required` field to prevent empty titles.
- **Server-side Logic**: Handling "Already Completed" checks on the server to ensure data integrity.
