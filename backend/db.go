package main

import (
	"errors"

	_ "github.com/mattn/go-sqlite3"
)

//Database represents a demo database
type Database struct {
	Users        map[int64]*User
	UserAccounts map[int64]*UserAccount
}

const (
	demoID       = 1
	demoEmail    = "demo@empatica.com"
	demoPassword = "passw0rd"
	demoToken    = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9"
	demoAge      = 13
)

var (
	demoUser        = User{ID: demoID, Email: demoEmail, FirstName: "John", LastName: "Doe", Age: demoAge}
	demoUserAccount = UserAccount{UserID: demoID, Password: demoPassword, Token: demoToken}
	db              = Database{
		Users: map[int64]*User{
			demoID: &demoUser,
		},
		UserAccounts: map[int64]*UserAccount{
			demoID: &demoUserAccount,
		},
	}
)

//getUser returns a user
func getUser(userID int64) *User {
	var u = db.Users[userID]
	u.Sanitize()
	return u
}

//Sanitize performs some sanitization over the user data
func (u *User) Sanitize() {
	if u.Age < 18 {
		u.LastName = ""
	}
}

//getUserAccount returns a user account
func getUserAccount(userID int64) *UserAccount {
	return db.UserAccounts[userID]
}

//getLogin returns a user account checking for email and password
func getLogin(email, password string) (*UserAccount, error) {
	for userID, user := range db.Users {
		if user.Email == email {
			if db.UserAccounts[userID] != nil && db.UserAccounts[userID].Password == password {
				return db.UserAccounts[userID], nil
			}
			return nil, errors.New("invalid password")
		}
	}
	return nil, errors.New("invalid user")
}
