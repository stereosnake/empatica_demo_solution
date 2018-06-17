package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/ping", PingHandler).Methods("GET")
	r.HandleFunc("/login", LoginHandler).Methods("POST")
	r.Handle("/users/{userId}", tokenValidation(http.HandlerFunc(GetUserHandler))).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:     []string{"*"},
		AllowedMethods:     []string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:     []string{"X-Requested-With", "Content-Type", "content-type", "Origin", "Accept", "Authorization"},
		OptionsPassthrough: false,
	})
	handler := c.Handler(r)
	log.Fatal(http.ListenAndServe(":9000", handler))
}

func tokenValidation(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var token = r.Header.Get("Authorization")
		if token == "" {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode("missing token")
			return
		}

		var paramUserID = mux.Vars(r)[userIDKey]
		userID, err := strconv.ParseInt(paramUserID, 10, 64)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(fmt.Sprintf("user id not valid : %v", err)))
			return
		}
		ua := getUserAccount(userID)
		if ua == nil || ua.Token != token {
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode("invalid token")
			return
		}

		next.ServeHTTP(w, r)
	})
}
