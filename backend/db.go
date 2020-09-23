package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

// DB global object for accessing the DB
var DB *sql.DB

// Init initializes the database
// 	username - db username
// 	password - password to the db
//	dbhost - host location (typically localhost)
// 	dbport - port for the db
// 	dbname - database postit
func Init(username, password, dbhost, dbport, dbname string) {
	connectString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true&loc=Local", username, password, dbhost, dbport, dbname)
	fmt.Println(connectString)
	driver, err := sql.Open("mysql", connectString)
	if err != nil {
		panic(err)
	} else {
		DB = driver
	}
}

// CreateTable creates the postit table for data storage
func CreateTable() error {
	_, err := DB.Exec(Config.SQL["create_postit_table"])
	return err
}

// SelectFrontPagePostIts selects the latest 10 postits
func SelectFrontPagePostIts() []PostIt {
	fmt.Println("Start select postit")
	// DB.Query is used when the query will return rows
	// use DB.Exec if you do not expect any return values
	results, err := DB.Query(Config.SQL["select_latest_postits"])
	fmt.Println("After query")
	if err != nil {
		panic(err.Error())
	}

	// Create a slice to hold the results
	fmt.Println("Creating slice")
	var resultsSlice []PostIt

	// while there are new rows, load them into objects
	for results.Next() {
		var postit PostIt

		// Scan takes the memory locations of variables and
		// puts the column values into the memory
		// the order depends on the query, see config "select_latest_postits"
		err = results.Scan(&postit.ID, &postit.Author, &postit.Content)
		if err != nil {
			panic(err.Error())
		}

		// append to the slice the postit we just loaded
		// from the row
		resultsSlice = append(resultsSlice, postit)
	}

	return resultsSlice
}

// InsertPostIt inserts a PostIt with the given author and content
func InsertPostIt(author, content string) {
	// DB.Query is used when the query will return rows
	// use DB.Exec if you do not expect any return values
	_, err := DB.Exec(Config.SQL["insert_postit"], author, content)
	if err != nil {
		panic(err)
	}
}
