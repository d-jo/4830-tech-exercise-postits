package main

// PostIt Struct for post data. Contains:
//		ID: numeric ID
//		Author: Who wrote it
//		Content: What is it
type PostIt struct {
	ID      int
	Author  string `json:"Author"`
	Content string `json:"Content"`
}

// ConfigStruct has the config and sql values for the application
type ConfigStruct struct {
	Host   string            `json:"host"`
	Port   string            `json:"port"`
	DBHost string            `json:"db_host"`
	DBPort string            `json:"db_port"`
	DBName string            `json:"db_name"`
	SQL    map[string]string `json:"sql"`
}

// CredsStruct holds the credentials for database
type CredsStruct struct {
	DBUser string `json:"db_user"`
	DBPass string `json:"db_pass"`
}
