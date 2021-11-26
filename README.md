# INTRODUCTION

- The Trivia question was made using Node.js and express using mysql as the database. 
- The video demonstrating the project can be found in this url : https://www.youtube.com/watch?v=mZ7DX2Vn2MU&feature=youtu.be

# GETTING STARTED

- After clone the project, head to `apps/api/src/main.ts`, make sure to change the credential according to your local mysql credential

  ![image](https://user-images.githubusercontent.com/60194292/143549112-0c6cde86-f641-41f1-8b7b-9c2c250a644a.png)

- After running the server, for making things easy, I made a route `http://localhost:3333/createposttable` which will handle the table implementation for your database.

# Node JS implementation


### Endpoint to store (=login) the user

- This is a post route to `/api/login`
- This route expect a body of username and it will search if the user already exist, if not it will register the user to the database and masked the user's id using JWT which is then be stored in the local storage for the usage of updating score.

### Endpoint to get the quiz questions

- This is a get route to `/api/question`
- The user will be serve with questions with default options (following the url that you provide in the question earlier)

### Endpoint to update user's score

- This is a put request to `/api/score`
- This route will be accepting a headers (JWT token stored in local storage) and a body (updated score)
- user's credential will then be verify via JWT

### Additional feature to front end

![image](https://user-images.githubusercontent.com/60194292/143551115-28efc0cf-86cb-4842-94c9-71f3105f358d.png)


- Timer of 10 seconds, the question will move to next question if the time exceed 10 seconds
- Bar progress indicating questions answered progress
- Disable `ENTER GAME` Button if user did not provide any value in the form
