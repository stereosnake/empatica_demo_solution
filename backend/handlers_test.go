package main

import (
  "net/http"
  "net/http/httptest"
  "testing"
  "bytes"
  "encoding/json"
  "github.com/gorilla/mux"
  "github.com/stretchr/testify/assert"
  "strconv"
  "io/ioutil"
)

// setting base URL as constant here, which is enough for this task
// but ideally should be env variable
const (
	baseUrl = "http://localhost:9000"
)

// test that ping request can be made to the api
func TestPingHandler(t *testing.T) {
  r, err := http.NewRequest("GET", "/ping", nil)
  if err != nil {
    t.Fatal(err)
  }
  expected := "pong"
  w := httptest.NewRecorder()
  PingHandler(w, r)
  assert.Equal(t, http.StatusOK, w.Code)
  assert.Equal(t, w.Body.String(), expected)
}

// test that user can be requested by its id and has
func TestGetUserHandler(t *testing.T) {
  // converting demoID into string cause mux seem to not accept ints
  // as values for mux.SetURLVars and to pass it to request url
  var demoUserID = strconv.Itoa(demoID)
  r, err := http.NewRequest("GET", "/users/" + demoUserID, nil)
  if err != nil {
    t.Fatalf("could not create request : %v", err)
  }
  w := httptest.NewRecorder()
  userId := map[string]string{
    "userId": demoUserID,
  }
  //settnng mux URL vars since we can't pass them via url itself
  r = mux.SetURLVars(r, userId)
  GetUserHandler(w, r)
  assert.Equal(t, http.StatusOK, w.Code)
  body, _ := ioutil.ReadAll(w.Body)
  bodyObj := map[string]interface{}{}
  if err := json.Unmarshal([]byte(body), &bodyObj); err != nil {
    t.Fatal(err)
  }
  assert.Equal(t, demoEmail, bodyObj["email"])
}

// test that loging in can be done with valid payload
func TestLoginHandler(t *testing.T) {
  userData := map[string]string{
    "email": demoEmail,
    "password": demoPassword,
  }
  login, _ := json.Marshal(userData);
  r, err := http.NewRequest("POST", "/login", bytes.NewBuffer(login))
  if err != nil {
    t.Fatalf("could not create request: %v", err)
  }
  w := httptest.NewRecorder()
  LoginHandler(w, r)
  assert.Equal(t, http.StatusOK, w.Code)
  body, _ := ioutil.ReadAll(w.Body)
  bodyObj := map[string]interface{}{}
  if err := json.Unmarshal([]byte(body), &bodyObj); err != nil {
    t.Fatal(err)
  }
  assert.NotNil(t, bodyObj["token"])
}

// test that login handler returns 400 if payload data is invalid
func TestLoginHandlerErrorForBadRequest(t *testing.T) {
  userData := "user@test.com"
  userDataJson, _ := json.Marshal(userData);
  r, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(userDataJson))
  w := httptest.NewRecorder()
  LoginHandler(w, r)
  assert.Equal(t, http.StatusBadRequest, w.Code)
}

// test that login handler returns 403 if user can't be found with given payload
func TestLoginHandlerErrorForInexistentUser(t *testing.T) {
  userData := map[string]string{
    "email": "illia@empatica.com",
    "password": demoPassword,
  }
  login, _ := json.Marshal(userData);
  r, err := http.NewRequest("POST", "/login", bytes.NewBuffer(login))
  if err != nil {
    t.Fatalf("could not create request: %v", err)
  }
  w := httptest.NewRecorder()
  LoginHandler(w, r)
  assert.Equal(t, http.StatusForbidden, w.Code)
}

// test that /user/{userID} route is only accessible for authenticated users
// requires api server running
func TestGetUserHandlerErrorForAuth(t *testing.T) {
  client := &http.Client{}
  req, _ := http.NewRequest("GET", baseUrl + "/users/1", nil)
  res, _ := client.Do(req)
  assert.Equal(t, http.StatusUnauthorized, res.StatusCode)
}

// test that /user/{userID} route is only accessible for users with valid token
// requires api server running
func TestGetUserHandlerErrorForInvalidToken(t *testing.T) {
  // converting demoID into string cause mux seem to not accept ints
  // as values for mux.SetURLVars and to pass it to request url
  client := &http.Client{}
  var demoUserID = strconv.Itoa(demoID)
  req, err := http.NewRequest("GET", baseUrl + "/users/1", nil)
  if err != nil {
    t.Fatalf("could not create request : %v", err)
  }
  req.Header.Set("Authorization", "Bearer abc123")
  // fmt.Println(req)
  userId := map[string]string{
    "userId": demoUserID,
  }
  //settnng mux URL vars since we can't pass them via url itself
  req = mux.SetURLVars(req, userId)
  res, _ := client.Do(req)
  assert.Equal(t, http.StatusForbidden, res.StatusCode)
}
