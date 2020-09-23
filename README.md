# PostIts

PostIts is a simple application for creating notes. The last 10 notes are displayed at any time and users can add notes using the form input.

# Stack/Source Map
## Backend
`backend/*` contains backend Golang code

`backend/main.go` contains the main file for the server.

`backend/structs.go` contains the tpye structs defined for the server

`backend/db.go` contains relevant MySql DB code for connecting and accessing the DB

`backend/config.json` contains config information for configuring the server

`backend/creds.json` is required for starting the server. it should contain the 
MySql username and password.

`backend/sample_creds.json` is a sample creds file for reference
## Frontend
`frontend/*` contains the frontend code, initially generated using create-react-app

`frontend/package.json` contains the configuration of NPM and the scripts. use npm start when in `frontend` to start the server

`frontend/src/*` contains all the source

`frontend/src/App.js` contains the actuall application code

`frontend/src/App.css` contains styling information for the app


