const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const router = express.Router();
app.use(express.json());
const port = process.env.PORT || 3000;

const db = require("../db");

app.use(
  cors({
    origin: "*",
  })
);

app.get("/recom", async (req, res) => {
  try {
    const data = await db.any(
      'select C.name as name, A.name as state, B.name as country \
                                from "City" as C, "Country" as B, "State" as A \
                                where C.s_id = A.id \
                                and B.id = A.c_id'
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/city", async (req, res) => {
  try {
    const city = req.body["cities"];
    let query =
      'select * from "Destination" where city_id in (select id from "City" where name in (';
    for (let i = 0; i < city.length; i++) {
      query += `'${city[i]}'`;
      if (i != city.length - 1) {
        query += ", ";
      }
    }
    query += "));";
    const data = await db.any(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/event", async (req, res) => {
  try {
    const destination = req.body["destinations"];
    let query =
      'select * from "AvailableEvent" as A, "Event" as B where A.event_id = B.id and A.destination_id in (select id from "Destination" where name in (';
    for (let i = 0; i < destination.length; i++) {
      query += `'${destination[i]}'`;
      if (i != destination.length - 1) {
        query += ", ";
      }
    }
    query += "));";
    const data = await db.any(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/activity", async (req, res) => {
  try {
    const destination = req.body["destinations"];
    let query =
      'select * from "AvailableActivity" as A, "Activity" as B where A.activity_id = B.id and A.destination_id in (select id from "Destination" where name in (';
    for (let i = 0; i < destination.length; i++) {
      query += `'${destination[i]}'`;
      if (i != destination.length - 1) {
        query += ", ";
      }
    }
    query += "));";
    const data = await db.any(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/hotel", async (req, res) => {
  try {
    const destination = req.body["destinations"];
    let query =
      'select * from "Hotel" as B where B.id in (select A.hotel_id from "AvailableHotel" as A where A.destination_id in (select id from "Destination" where name in (';
    for (let i = 0; i < destination.length; i++) {
      query += `'${destination[i]}'`;
      if (i != destination.length - 1) {
        query += ", ";
      }
    }
    query += ")));";
    const data = await db.any(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/restaurant", async (req, res) => {
  try {
    const destination = req.body["destinations"];
    let query =
      'select * from "Restaurant" as B where B.id in (select A.restaurant_id from "AvailableRestaurant" as A where A.destination_id in (select id from "Destination" where name in (';
    for (let i = 0; i < destination.length; i++) {
      query += `'${destination[i]}'`;
      if (i != destination.length - 1) {
        query += ", ";
      }
    }
    query += ")));";
    const data = await db.any(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/cityhotel", async (req, res) => {
  try {
    const city = req.body["city_id"];
    const star = req.body["star"];
    const data = await db.any(
      'select * from "Hotel" where city_id = ' + city + " and star = " + star
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/destination", router);

module.exports = app;
