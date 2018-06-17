# Empatica Web Demo solution
This code represents my solution to empatica web demo assignment.
It consists out of two parts: backend and frontend.

## Backend

Please note: Golang 1.9 or above required (https://golang.org/doc/install).

### Build

```
cd ./backend
go build -o api
```

### Missing packages
In case you get any packages missing, e.g. "cannot find package "github.com/rs/cors"",
use ```go get $package``` where $package is the name of the package your system missing

### Run

```
./api
```

APIs will then be served on

```
localhost:9000
```

### Testing tasks and my solution

For testing API I decided to test handlers hitting them directly using http and httptest packages.
Unfortunately, I did not manage to hit route for negative testing of ```/users/{userID}``` route,
hence I had to mock external request to the api, so ```TestGetUserHandlerErrorForInvalidToken```and  ```TestGetUserHandlerErrorForAuth``` require actual api server running to pass.

All the tests for handlers are stored in handlers_test.go.
The test for sanitizing user lastname, is stored in db_test.go

### Run tests

```
go test
```


## Frontend

Please note: Node 8.9 or above required (https://nodejs.org/en/download/).

(Want to run multiple node versions? Please take a look at https://github.com/tj/n)

### Build

```
cd ./frontend
npm install
```

### Live development

```
./node_modules/.bin/ng serve --open
```

Frontend will then be served on
```
localhost:4200
```

### Run tests

Unit and integration tests

```
ng test
```

e2e tests

```
ng e2e
```


### Testing tasks and my solution
For testing existing login functionality, I had to write unit, integration and e2e tests.

The main portion of unit tests fallen for the ```login.component.ts``` which are stored in ```login.component.spec.ts```.
Unit tests checking that component can be created and that the main prerequisites for e2e testing are met (e.g. input fields and the basic layout are in place).

Integration test for api and auth services are stored in their respected spec files.
I did not write the full coverage for those in the frontend directory, since it would be slight overhead,
since they are covered in backend testing and in e2e testing.

Although, there were slight limitations for backend and frontend unit testing and would require additional development time,
the e2e testing covers the login functionality almost fully.
They cover the logging in itself, the payload validation and logging out.

Although, some may think that e2e tests may be slow, unreliable and break a lot, I tend to disagree.
The end user of any software is the customer, hence it should be tested the way it's going to be used.

Their speed execution might be slower, but they tend to test lots of services combined at once, they can be run in parallel,
they can provide valuable feedback using screenshot on failure and readable exception throwing.
Also, they can provide valuable metrics on testing coverage (e.g. Allure reporting tool).
Furthermore, if QA and developers share responsibility on maintaining tests, they won't be broken.

In e2e directory I've set up initial structure for test framework separating pages into page objects.
This way we can easily describe page, its elements and logic in a single place.
I also created abstract page for storing methods that are common for most of the pages.

Unlike unit and integration tests, e2e tests run on an actual browser(s)
which allows us to do cross-browsing testing more efficient if business requires so.
There are lots of efficient ways of running e2e testing on different browsers in parallel like selenium grid or selenium grid in docker containers.

### What is left for manual testing
Seeing all the automated testing coverage, I would recommend to do some exploratory testing on login functionality,
check if inputs are sanitized, check for basic web application vulnerabilities like SQL injection or XSS.

I'd also recommend doing some mobile testing on actual devices to see if layout is as per design.
Layout testing is also can be automated with screenshot comparison tools,
but my main concern here is that sometimes browsers do not render web layout as actual mobile devices do,
so even if we have some kind of layout testing, I'd still rather have a round of exploratory testing on an actual devices,
that are represented in great portion in statistics (e.g. Google Analytics data about sessions)
