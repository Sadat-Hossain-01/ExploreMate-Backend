const express = require('express');
const router = express.Router();

const db = require('../db');

router.post('/event', async (req, res) => {
  try {
    const city = req.body['destination'];
    const data = await db.any('select * \
                              from "AvailableEvent" as A, "Event" as B \
                              where A.event_id = B.id \
                              and destination_id = (select id from "Destination" \
                              where name = $1)', [city]);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/activity', async (req, res) => {
  try {
    const city = req.body['destination'];
    const data = await db.any('select * \
                              from "AvailableActivity" as A, "Activity" as B \
                              where A.activity_id = B.id \
                              and destination_id = (select id from "Destination" \
                              where name = $1)', [city]);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/hotel', async (req, res) => {
  try {
    const city = req.body['destination'];
    const data = await db.any('select * \
                              from "AvailableHotel" as A, "Hotel" as B \
                              where A.hotel_id = B.id \
                              and destination_id = (select id from "Destination" \
                              where name = $1)', [city]);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/restaurant', async (req, res) => {
  try {
    const city = req.body['destination'];
    const data = await db.any('select * \
                              from "AvailableRestaurant" as A, "Restaurant" as B \
                              where A.restaurant_id = B.id \
                              and destination_id = (select id from "Destination" \
                              where name = $1)', [city]);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;