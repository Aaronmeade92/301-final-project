'use strict';
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
// const Chart = require('chart.js');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


//get request for user data when we get to it:
app.get('/articles/user', (request, response) => {
  let sql = `SELECT * FROM users
            INNER JOIN data
            ON data.user_id=users.user_id
            WHERE ${request.query.field}=$1`

  client.query(sql, [request.query.val])
  .then(result => response.send(result.rows))
  .catch(console.error);
})



app.listen(PORT, function(){
  console.log(`Listeninng on port Number: ${PORT}`);
})
