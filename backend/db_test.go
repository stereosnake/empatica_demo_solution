package main

import (
  "github.com/stretchr/testify/assert"
  "testing"
)

//test that last name is hidden if age < 18
func TestUserSanitizing(t *testing.T) {
  var user = getUser(demoID)
  assert.Equal(t, user.LastName, "")
}
