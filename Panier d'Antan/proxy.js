import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());

app.get("/boutiques/places", async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=formatted_address,name,rating,place_id,business_status,opening_hours,type,geometry&key=AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY&libraries=places&input=${req.query.input}${req.query.name}&language=fr&types=store|establishment`;
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  console.log(url);
  console.log(req.query.input);
  res.json(json);
});

app.get("/boutiques/places/details", async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.place_id}&fields=formatted_address,address_components,name,rating,user_ratings_total,reviews,opening_hours,name,geometry&key=AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY&language=fr&types=establishment`;
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  console.log(url);
  console.log(req.query.input);
  res.json(json);
});

app.listen(4000, () => {
  console.log("Proxy server listening on port 4000");
});
