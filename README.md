# PostIts

PostIts is a simple application for creating notes. The last 10 notes are displayed at any time and users can add notes using the form input.

# How to run/build
`go run *.go`
`go build`


# Stack/Source Map
## Backend
`./*` contains  Golang code

`./main.go` contains the main file for the server.

`./structs.go` contains the type structs defined for the server

`./db.go` contains relevant MySql DB code for connecting and accessing the DB

`./config.json` contains config information for configuring the server

`./creds.json` is required for starting the server. it should contain the 
MySql username and password.

`./sample_creds.json` is a sample creds file for reference

`./index.html` contains the index that loads the style and javascript

`./static/css/*` contains the CSS styling information

`./static/js/*` contains the JS code for the index and other code for bootstrap

`./static/js/postits.js` contains the code for loading and displaying postits