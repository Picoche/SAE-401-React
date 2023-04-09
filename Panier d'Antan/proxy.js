import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());

app.get("/boutiques/places", async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=formatted_address,name,rating,place_id,geometry&key=AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY&libraries=places&input=${req.query.input}&language=fr`;
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
