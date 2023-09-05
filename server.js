const express = require('express')
require('dotenv').config()
const cors = require('cors')

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

const db = require('./db');
const destination_route = require('./routes/destination');

app.use(cors({
  origin: "*",
}))

app.get('/recom', async (req, res) => {
  try {
    const data = await db.any('select C.name as name, A.name as state, B.name as country \
                                from "City" as C, "Country" as B, "State" as A \
                                where C.s_id = A.id \
                                and B.id = A.c_id');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/city', async (req, res) => {
  try {
    const city = req.body['city'];
    const data = await db.any('select * from "Destination" \
                                where city_id = (select id from "City" \
                                where name = $1);', [city]);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/destination', destination_route);
