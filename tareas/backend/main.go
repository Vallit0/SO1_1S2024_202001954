package main

import (
	"encoding/json"
	"net/http"
)

type Data struct {
	CARNET string `json:"carnet"`
	Name   string `json:"name"`
}

func setCORS(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*") // Adjust the allowed origin as needed for security
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
}

func dataHandler(w http.ResponseWriter, r *http.Request) {
	setCORS(&w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	data := Data{
		CARNET: "202001954",
		Name:   "Estuardo Sebastian Valle Bances",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func main() {
	http.HandleFunc("/data", dataHandler)
	http.ListenAndServe(":8080", nil)
}
