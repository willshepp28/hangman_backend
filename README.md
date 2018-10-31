# Hangman (backend)


----

**What is this?** 

This is my Hangman app. Request by Mavrck.<br>
-Thanks for the chance Brian.<br>

Check out the front end code at https://github.com/willshepp28/hangman_frontend

---


## Services

* [Heroku][]: Hosting


## Software

* [Node.js][]: server-side javascript
* [npm][]: Package management for Node.js packages
* [PostgreSQL][]: a object-relational database management system 
* [Express][]: web application framework
* [Knex][]: SQL query builder
* [Angular 6][]: client-side framework


## Node Packages (Backend)

* [cors][]: middleware that can be used to enable CORS with various options.
* [jsonwebtoken][]: allow claims, such as user data, to be represented in a secure manner.
* [random-words][]: generates random words for use as simple text.
* [pg][]: Postgres driver for Node.js
* [compression][]: ompression middleware.


[Heroku]: http://heroku.com/

[Node.js]: http://nodejs.org/
[npm]: https://npmjs.org/
[PostgreSQL]: http://www.postgresql.org/
[Express]: http://expressjs.com/
[Knex]: https://knexjs.org/
[Angular 6]: https://angular.io/

[cors]:
[jsonwebtoken]: https://jwt.io/
[compression]: https://github.com/expressjs/compression
[random-word][]: https://github.com/punkave/random-words#readme
[pg]: https://github.com/brianc/node-postgres

## Database Design


![](https://s3.amazonaws.com/hangman-app/database-mockup/hangman-databasedesign.png)


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


## Resources 

- How to change variables in angular based on the enviroment https://alligator.io/angular/environment-variables
- Optimizing your app https://www.youtube.com/watch?v=FOdetrZCsmU