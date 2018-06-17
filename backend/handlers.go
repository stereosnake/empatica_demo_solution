package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

const (
	userIDKey = "userId"
)

//PingHandler is a simple handler to check API's aliveness
func PingHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("pong"))
}

//LoginHandler is a demo login handler
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var login LoginData
	if err := json.NewDecoder(r.Body).Decode(&login); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("invalid login data"))
		return
	}
	defer r.Body.Close()
	ua, err := getLogin(login.Email, login.Password)
	if ua == nil {
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte(err.Error()))
		return
	}

	json.NewEncoder(w).Encode(ua)
}

//GetUserHandler is a demo handler for retrieving user details
func GetUserHandler(w http.ResponseWriter, r *http.Request) {
	var (
		paramUserID = mux.Vars(r)[userIDKey]
		err         error
		userID      int64
		user        *User
	)

	userID, err = strconv.ParseInt(paramUserID, 10, 64)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Sprintf("user id not valid : %v", err)))
		return
	}

	user = getUser(userID)
	if user == nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("missing user"))
		return
	}

	json.NewEncoder(w).Encode(*user)
}
