# Quizziz

Welcome to the Documentation page of the Quizziz Assignment API.

Hopefully, you have Node installed on your OS, the only requirement for the API to run locally.

#### Step 1: Check if the API is working.
The API runs on port 3000. So fire up POSTMan, and make a GET Request to **localhost:3000**.
(You will need POSTMan for further POST requests in the API)

#### Step 2: Sign Up & Login

```js
const user = new User({
        name: req.body.name,
        date_of_birth: req.body.dob,
        occupation: req.body.occupation,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    })
```
This is the User schema. 
Thus, for signing up, make sure that the fields are properly filled in your POST request.
You will only need username and password credentials to login

**/user/signup** - for SIGN UP
**/user/login** - for LOGIN

#### Step 3: List all Available Quizzes

Once you have logged in, a unique string would be returned to you. Use that token string for all further requests in the API.
In the headers, copy the unique string as a value for the key - token. 
{**token**: **unique-string**}

/quiz - to display all available games

#### Step 4: Select any quiz, copy the quiz Id, to get into the quiz

To see the questions of a particular quiz, copy the quiz Id of that quiz, and paste it as:

/quiz/:quizId

#### Step 5: Provide answers to the questions

Select any question, then copy the questionId, quizId and then write the answer of that question in the BODY of the POST request.

This would send a 200 response, updating the score of the user and the leaderboard of the game. Every answer to every question would update both collections.

Your POST request should look like this:

```json
{
	"quizId": "5ce2bad976e990d4d524828f",
	"questionId": "5ce2e95076e990d4d5248a3a",
	"answer": 1
}
```

Keep in mind that req.headers.token should still contain the user unique string which you had received on login.
