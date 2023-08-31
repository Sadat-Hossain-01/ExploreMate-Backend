const express = require('express')
require('dotenv').config()
const pgp = require('pg-promise')()

const app = express()
const port = process.env.PORT || 3000

const connection = {
  host: process.env.SUPABASEHOST,
  port: process.env.SUPABASEPORT,
  database: process.env.SUPABASEDATABASE,
  user: process.env.SUPABASEUSER,
  password: process.env.SUPABASEPASSWORD,
  ssl: { rejectUnauthorized: false },
};
const db = pgp(connection);

app.get('/recom', async (req, res) => {
  try {
    const data = await db.any('SELECT * FROM "City"');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})