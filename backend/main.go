package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

// Config for getting configuration values
var Config = ConfigStruct{}

// Creds for storing credentials
var Creds = CredsStruct{}

// ReadConfigFiles reads and parses the config.json and creds.json files and stores them in state
func ReadConfigFiles() {
	// Read config file
	f, err := ioutil.ReadFile("config.json")
	if err != nil {
		panic(err)
	}

	// json Unmarshal loads a byte sequence into a struct
	// using the json indications in the definition
	_ = json.Unmarshal([]byte(f), &Config)

	f, err = ioutil.ReadFile("creds.json")
	if err != nil {
		panic(err)
	}

	_ = json.Unmarshal([]byte(f), &Creds)
}

// handles requests to the /insert endpoint.
// reads the form values and calls InsertPostIt to
// add it to the database
func insertHandler(w http.ResponseWriter, r *http.Request) {
	// Check if post
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == "POST" {
		fmt.Println("posting")
		// Parse the form
		postit := PostIt{}
		err := json.NewDecoder(r.Body).Decode(&postit)
		if err != nil {
			fmt.Println(err)
		}
		// get the author and content
		//json.Unmarshal([]byte(json_str), &postit)

		// call insert in db.go
		InsertPostIt(postit.Author, postit.Content)
	}
}

// selectHandler handles the /latest endpoint
func selectHandler(w http.ResponseWriter, r *http.Request) {
	// call the method in db.go to select
	// the latest postits
	posts := SelectFrontPagePostIts()
	// convert the results to a json string
	js, err := json.Marshal(posts)
	if err != nil {
		panic(err.Error())
	}
	// set the content type to json so the client
	// knows what to expect
	w.Header().Set("Content-Type", "application/json")
	// this is needed for development because requests
	// are crossorigin between frontend and backend,
	// this should be removed/disabled in production
	w.Header().Set("Access-Control-Allow-Origin", "*")
	// write the json to the response writer
	w.Write(js)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	d, err := ioutil.ReadFile("./index.html")
	if err != nil {
		http.Error(w, "no index file", 418)
	}
	w.Write(d)
}

func main() {
	// read the config files
	ReadConfigFiles()
	// initialize the database
	Init(Creds.DBUser, Creds.DBPass, Config.DBHost, Config.DBPort, Config.DBName)
	// create the table if not exists
	CreateTable()
	// set handlers for insert and latest
	http.HandleFunc("/insert", insertHandler)
	http.HandleFunc("/latest", selectHandler)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	http.HandleFunc("/", indexHandler)
	// listen on port 7000
	http.ListenAndServe(":7000", nil)
}
