const express = require('express');
const router = express.Router();

const db = require('../db');

router.post('/event', async (req, res) => {
  try {
    const destination = req.body['destinations'];
    let query = 'select * from "AvailableEvent" as A, "Event" as B where A.event_id = B.id and A.destination_id in (select id from "Destination" where name in (';
    for(let i = 0; i < destination.length; i++) {
      query += `'${destination[i]}'`;
      if(i != destination.length - 1) {
        query += ', ';
      }
    }
    query += '));';
    const data = await db.any(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/activity', async (req, res) => {
  try {
    const destination = req.body['destinations'];
    let query = 'select * from "AvailableActivity" as A, "Activity" as B where A.activity_id = B.id and A.destination_id in (select id from "Destination" where name in (';
    for(let i = 0; i < destination.length; i++) {
      query += `'${destination[i]}'`;
      if(i != destination.length - 1) {
        query += ', ';
      }
    }
    query += '));';
    const data = await db.any(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/hotel', async (req, res) => {
  try {
    const destination = req.body['destinations'];
    let query = 'select * from "AvailableHotel" as A, "Hotel" as B where A.hotel_id = B.id and A.destination_id in (select id from "Destination" where name in (';
    for(let i = 0; i < destination.length; i++) {
      query += `'${destination[i]}'`;
      if(i != destination.length - 1) {
        query += ', ';
      }
    }
    query += '));';
    const data = await db.any(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/restaurant', async (req, res) => {
  try {
    const destination = req.body['destinations'];
    let query = 'select * from "AvailableRestaurant" as A, "Restaurant" as B where A.restaurant_id = B.id and A.destination_id in (select id from "Destination" where name in (';
    for(let i = 0; i < destination.length; i++) {
      query += `'${destination[i]}'`;
      if(i != destination.length - 1) {
        query += ', ';
      }
    }
    query += '));';
    const data = await db.any(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;