# Hangman (backend)


----

**What is this?** 

This is my Hangman app. Request by Mavrck.<br>
-Thanks for the chance Brian.<br>

Check out the front end code at https://github.com/willshepp28/hangman_frontend

---


## Technologies Used

```js
 Express
 Angular 6
 Knex/ PostgreSQL
 AWS - for deployment

 
```


## Api Used

```
    random-words - to generate random words
```


  ## Requirements

  - [X] When the game is started, the player is represented with an empty field for each letter in the word.
  - [X] When the player guesses a letter correctly, each field that represents that letter is filled with the letter
  - [] When the player guesses a letter incorrectly, a piece of a gallows with a hanging man is drawn
  - [X] After 10 incorrect guesses, the game is over and the player lost.
  - [] Thus, there should be 10 different states of the gallows to be drawn.
  - [X] If all fields are filled with their letter before 10 incorrect guesses, the player has won the game.


## Lesson Learned

- DEPLOY FROM THE START
- Test every freaking maor feature , route, function, and api call. So much time wasted. TDD is a major key alert.
- Functionality first, design last....
- make sure your exporting you modules with the right spelling " module.exports not module.export"
- clean up your routes by putting queries in a query folder.
- KISS. Keep it simple