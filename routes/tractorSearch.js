var express = require('express');
var router = express.Router();


const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');


const db = connect();

async function prepare() {
  // console.log("preparing table")
  await db.query(sql`
    CREATE TABLE tractors (
      vin VARCHAR NOT NULL PRIMARY KEY,
      title VARCHAR NOT NULL,
      price VARCHAR NOT NULL,
      image VARCHAR NOT NULL,
      description VARCHAR,
      notes VARCHAR

    );
  `);
  
  // console.log("setting values")
  await set("TRACP0K99DR122370", 
  "JD 2020 - Like New", 
  "$6,999.99", 
  "/JD-realistic-1.jpg", 
  "Like new John Deer. Used for 2 years but looks brand new. <a target='_blank' href='https://www.youtube.com/watch?v=z2_TLz9TpwY'>DOOM supported</a>.", 
  "Makes a ticking sound that should be looked at. Sold as is.")

  await set("TRACPA502070012501", 
  "Fendt 514", 
  "$45,000", 
  "/f514.jpg", 
  "You'll love how high tech this is.", 
  "Comes with advanced GPS tracking.")

  await set("TRACX35G0SEA85001", 
  "MF 3140", 
  "$25,000", 
  "mf3140.jpg", 
  "Like they say, straightforward and dependable.", 
  "Extra accessories available for purchase.")

  await set("TRACP39S0LB220229", 
  "Kids Toy Mini Tractor", 
  "$13.37", 
  "toy-tractor.jpg", 
  "Got to get them started early.", 
  "FLAG-INJECTIONCONFIRMED-FLAG")
  // console.log("values set.")
}


const prepared = prepare();

async function set(vin, title, price, image, description, notes) {
  await db.query(sql`
    INSERT INTO tractors (vin, title, price, image, description, notes)
      VALUES (${vin}, ${title}, ${price}, ${image}, ${description}, ${notes})
  `);
}

async function get(id) {
  const results = await db.query(sql("SELECT * FROM tractors WHERE vin='" + id + "';"));
  if (results.length) {
    return results;
  } else {
    return undefined;
  }
}
/* GET tractorSearch page. */
router.get('/', async function(req, res, next) {
// console.log("/tractorBYVIn...")
// console.log("req query params: ", req.query)
const vin = req.query.vin;
var results;
try{
  results = await get(vin)
} catch(error){
  results = [{}]
  results[0].title = "ERROR"
  results[0].title = error 
}
// console.log("results = ", results)
  res.render('tractorSearch', { title: 'Trackslist', tractorData: (results), search:vin });
});

module.exports = router;
