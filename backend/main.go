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
	f, err := ioutil.ReadFile("config.json")
	if err != nil {
		panic(err)
	}

	_ = json.Unmarshal([]byte(f), &Config)

	f, err = ioutil.ReadFile("creds.json")
	if err != nil {
		panic(err)
	}

	_ = json.Unmarshal([]byte(f), &Creds)
}

func insertHandler(w http.ResponseWriter, r *http.Request) {
	author := r.Form["author"][0]
	content := r.Form["content"][0]

	InsertPostIt(author, content)
}

func selectHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("start select")
	posts := SelectFrontPagePostIts()
	fmt.Println("end select")
	js, err := json.Marshal(posts)
	if err != nil {
		panic(err.Error())
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(js)
}

func main() {
	ReadConfigFiles()
	Init(Creds.DBUser, Creds.DBPass, Config.DBHost, Config.DBPort, Config.DBName)
	CreateTable()
	http.HandleFunc("/insert", insertHandler)
	http.HandleFunc("/latest", selectHandler)
	http.ListenAndServe(":7000", nil)
}
