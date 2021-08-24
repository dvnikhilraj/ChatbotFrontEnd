# Getting Started with Chatbot

1. Open the frontend project directory and run `npm install` to download the required npm packages

2. Run `npm install` in the backend project directory as well.

3. Create an agent in Google dialogflow console 
    `https://dialogflow.cloud.google.com/`

4. Create google credentials (`Service Accounts`) for the project created in dialogflow.
    Once credentials are created download the JSON file and place the file in the backend project directory and update the path in .env file.
    `https://console.cloud.google.com/`.

5. In backend project, update the following constants in the environment file 
    i.  `GOOGLE_APPLICATION_CREDENTIALS` - Provide the Google credentials JSON file path.
    ii. `GOOGLE_PROJECTID` - Provide the project Id of the agent created in the Google dialogflow console.
    iii. `DB_CONNECTION` - Provide the mongoDB connection string as well

6. Upload the intents in Google dialogflow console.

7. Update the mongo db with sample data.

6. Run the backend project using the following command 
   `npm start`

7. Run the front end using the following command
    `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!