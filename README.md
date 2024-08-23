# School-Location-Search-Algorithm

## Clone the Repository

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/RAUSHANSHARMA74/School-Location-Search-Algorithm.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo-name
   ```

## Backend Setup

1.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure environment variables:

    - Create a `.env` file in the `backend` directory and add the following environment variables:

      ```env
      DB_HOST = localhost # or the hostname of your database server
      DB_USER = root # or your database username
      DB_PASSWORD = replace with your MySQL password
      DB_NAME = replace with your actual database name
      PORT = 3050 # the port your application will run on
      ```

4.  Running the Backend:

    - Start the backend server:

      ```bash
      npm start
      ```

    - The backend server will run on `http://localhost:3050` or the port specified in your `.env` file.

## Additional Notes

- Ensure that Mysql is running and accessible from the backend server.
- Make sure to set up the environment variables correctly to avoid connection issues.

If you encounter any issues, please check the error messages for guidance or consult the documentation for the respective technologies used.
