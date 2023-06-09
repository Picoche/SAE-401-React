import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());

app.get("/boutiques/places", async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=geometry,place_id&key=AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY&libraries=places&input=${req.query.input}${req.query.name}&language=fr`;
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  console.log(url);
  console.log(req.query.input);
  res.json(json);
});

app.get("/boutiques/places/details", async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.place_id}&fields=formatted_address,address_components,name,rating,user_ratings_total,reviews,opening_hours,name,geometry,photos,formatted_phone_number&key=AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY&language=fr`;
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  console.log(url);
  console.log(req.query.input);
  res.json(json);
});

app.get("/boutiques/places/photo", async (req, res) => {
  const { photoreference } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoreference}&key=AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY
  `;
  try {
    const response = await fetch(url);
    res.send(response.body);
    console.log(url);
  } catch (error) {
    console.log(url);
    console.error(error);
  }
});

app.listen(4000, () => {
  console.log("Proxy server listening on port 4000");
});
