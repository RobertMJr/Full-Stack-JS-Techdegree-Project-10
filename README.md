
# Full Stack App with React and a REST API.
## A React client with a school database REST API.

This full stack application provides a way for users to administer a school database containing information about courses.   
Users can interact with the database by retrieving a list of courses, as well as adding, updating and deleting courses in the database.  
They can only update and delete courses they own.
Users have to create an account and sign-in to make changes to the database.


***
### Getting Started

To get up and running with this project, download the repository and follow the below instructions:


### API:

1. Open a terminal and navigate to the **/api** directory.
2. Install the project's dependencies using `npm`:

   ```
   npm install

   ```

3. Seed the SQLite database:

   ```
   npm run seed
   ```

4. Start the application.

   ```
   npm start
   ```

   The Express server will run at [http://localhost:5000](http://localhost:5000)
5. Open a new terminal window and proceed with the below steps


### React Client:

1. Open a terminal and navigate to the **/client** directory.
2. Install the project's dependencies using `npm`:

   ```
   npm install

   ```
3. Start the application.

   ```
   npm start
   ```
  
   Upon starting the application your browser should automatically open the page at [http://localhost:3000](http://localhost:3000)


### Used:

- JavaScript
- Node.js
- Express
- Sequelize
- React


