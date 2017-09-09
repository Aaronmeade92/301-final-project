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

function loadUsers (){
  fs.readFile('./public/data/users.json', (err, fd) => { JSON.parse(fs.toString()).forEach(ele => {
    client.query(
      'INSERT INTO users(user) VALUES($1) ON CONFLICT DO NOTHING',
      [ele.user]
      )
      .catch(console.error);
    })
  })
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
