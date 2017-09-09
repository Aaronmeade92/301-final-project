'use strict';
const pg = require('pg');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const conString = 'postgres://postgres:Bengals92@localhost:5432/moodring';
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(express.static('public'));

function loadDB(){

client.query(`
  CREATE TABLE IF NOT EXISTS
  users (
    user_id SERIAL PRIMARY KEY,
    user VARCHAR(225) UNIQUE NOT NULL,
  )
  `)
  .then(loadUsers);
  .catch(console.error);

client.query(`
  CREATE TABLE IF NOT EXISTS
  data (
    data_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    name VARCHAR(225) NOT NULL,
    date VARCHAR(225) NOT NULL,
    meals VARCHAR(225) ARRAY[1000] NOT NULL,
    sleep INTEGER(3) NOT NULL,
    meds VARCHAR(225),
    mood INTEGER(1) NOT NULL
  );`
)
.then(loadData)
.catch(console.error);
};

app.post('/', function(request, response){
  client.query('
  INSERT INTO users(name) VALUES($1) ON CONFLICT DO NOTHING',
[request.body.name],
  function(err) {
    if (err) console.error(err)
    queryTwo();
  })
})

function queryTwo() {
  client.query(
    `SELECT user_id FROM users WHERE user=$1`,
    [request.body.name],
    function(err, result) {
      if (err) console.error(err)
      queryThree(result.rows[0].user_id)
    }
  )
}

function queryThree(user_id) {
  client.query(
    `INSERT INTO
    data(user_id, name, date, meals, sleep, meds, mood)
    VALUES($1, $2, $3, $4, $5, $6, $7);`,
    [user_id,
    request.body.date
    request.body.meals
    request.body.sleep
    request.body.meds
    request.body.mood
  ],
  function(err) {
    if(err) console.error(err);
    response.send('insert complete');
  });
}

//get request for user data when we get to it:
// app.get('/articles/user', (request, response) => {
//   let sql = `SELECT * FROM users
//             INNER JOIN data
//             ON data.user_id=users.user_id
//             WHERE ${request.query.field}=$1`
//
//   client.query(sql, [request.query.val])
//   .then(result => response.send(result.rows))
//   .catch(console.error);
// })



app.listen(PORT, function(){
  console.log(`Listeninng on port Number: ${PORT}`);
})
