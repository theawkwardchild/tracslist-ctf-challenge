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
  // 2FMDA502070012501
  // 1FTDF15YXPKA24180
  // 1FTJX35G0SEA85001
  // 2FAPP39S0LB220229
  // console.log("setting values")
  await set("TRACP0K99DR122370", 
  "JD 2020 - Like New", 
  "$6,999.99", 
  "https://i.pinimg.com/736x/9c/b8/a3/9cb8a379e9526161c5bbec24b7529867.jpg", 
  "Like new John Deer. Used for 2 years but looks brand new. <a target='_blank' href='https://www.youtube.com/watch?v=z2_TLz9TpwY'>DOOM supported</a>.", 
  "Makes a ticking sound that should be looked at. Sold as is.")
  // await set("1FTDF15YXPKA24180", "JD 2020 - Like New", "$40,000", "Description: Like new John Deer. Used for 2 years but looks brand new.", "Makes a ticking sound that should be looked at. Sold as is.")
  // await set("1FTJX35G0SEA85001", "JD 2020 - Like New", "$40,000", "Description: Like new John Deer. Used for 2 years but looks brand new.", "Makes a ticking sound that should be looked at. Sold as is.")
  // await set("2FAPP39S0LB220229", "JD 2020 - Like New", "$40,000", "Description: Like new John Deer. Used for 2 years but looks brand new.", "Makes a ticking sound that should be looked at. Sold as is.")
  
  // console.log("values set.")
}


const prepared = prepare();

async function set(vin, title, price, image, description, notes) {
  // await prepare();
  await db.query(sql`
    INSERT INTO tractors (vin, title, price, image, description, notes)
      VALUES (${vin}, ${title}, ${price}, ${image}, ${description}, ${notes})
  `);
}

async function get(id) {
  // await prepare();
  const results = await db.query(sql("SELECT * FROM tractors WHERE vin='" + id + "';"));
//   // console.log("results: ", results)
  if (results.length) {
    return results;
  } else {
    return undefined;
  }
}

