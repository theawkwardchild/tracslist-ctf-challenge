var express = require('express');
var router = express.Router();

const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');

const db = connect();

async function prepare() {
  await db.query(sql`
    CREATE TABLE users (
      username VARCHAR NOT NULL PRIMARY KEY,
      password VARCHAR NOT NULL
    );
  `);
  
  await set("user1", "password1")
  await set("user2", "password2")
  await set("user3", "passsword3")
}

const prepared = prepare();

async function set(id, value) {
  // await prepare();
  await db.query(sql`
    INSERT INTO users (username, password)
      VALUES (${id}, ${value})
  `);
}

async function get(id) {
  // await prepare();
  const results = await db.query(sql("SELECT * FROM users WHERE username='" + id + "';"));
//   // console.log("results: ", results)
  if (results.length) {
    return results;
  } else {
    return undefined;
  }
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // console.log("/users...")
var results = await get('user1\' or \'1\'=\'1')
// console.log(results)
// db.close();
  res.send('respond with a resource: '+ JSON.stringify(results));
});

module.exports = router;
