# Welcome to the Todo_project

The Todo App is a simple and intuitive task management tool designed to help you stay organized and productive.
This is a simple Vite app that uses the AirTable API to store your tasks.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment variables](#environment-variables)
- [Usage](#usage)

## Prerequisites

Before you start, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) - Ensure you have Node.js installed. You can download it from the official website.

## Getting Started
1. Clone this repository to your local machine:

   ```bash
   https://github.com/OGoncharenko/react-todo.git
   ```
2. Navigate to the project directory:
    ```
    cd react-todo
    ```
3. Install dependencies via npm:
    ```
	  npm install
    ```
    This will install Vite locally as a dev dependency for your project.

4. Run:
    ```
    npm run dev
    ```
5. Open your browser and go to http://localhost:5173 to see your Vite app in action.


## Environment Variables
1. Create a .env file in the root of your project to store your API key. You can obtain an API key from the AirTable API.

2. Your .env file should look like this:
```
VITE_AIRTABLE_API_TOKEN = your-api-token-here
VITE_AIRTABLE_BASE_ID = your-airtable-base-id-here
VITE_TABLE_NAME = Default
```

## Usage
To use it, follow these steps:

- Launch the app as explained in the "Getting Started" section.
- Add a new task by typing in the input field and clicking the "Add Task" button.
- Mark a task as completed by clicking on the checkbox next to the task.
- Edit a task by clicking the "Edit" button, modifying the task text, and saving the changes.
- Delete a task by clicking the "Delete" button.

