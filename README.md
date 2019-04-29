# in-chat-nito

## React base built according to this tutorial.
[Create React App Express Backend](https://daveceddia.com/create-react-app-express-backend/)



## Run Program
In the root directory run  

`npm install`

`npm start`

In another terminal go to _client_ folder and run 

`npm install`

`npm start` 

You should be able to access the front-end in `http://localhost:3000`


## API Calls

`/signup/<username>`  - Will create user in database and set it a userID

`/login/<username>`  - Will set cookies for user if found in database.

`/courses`  - Will return courses assigned to the user currently logged in. 

`/logout`  - Will clear cookies for currect user