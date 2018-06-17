package main

//LoginData represents the accepted payload for login
type LoginData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

//User is the model for a user
type User struct {
	ID        int64  `json:"id"`
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Age       int    `json:"age"`
}

//UserAccount represents a user account
type UserAccount struct {
	UserID   int64  `json:"-"`
	Password string `json:"-"`
	Token    string `json:"token"`
}
