const port = 5000;
const epress = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = epress();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
 console.log();
 const city = req.body.cityName;
  const appid = "5dc1304831657d3d7cc1840c6011e78b";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+units;

  https.get(url, (response) => {
    console.o;
    response.on("data", function (data) {
      const weather = JSON.parse(data);
      const temp = weather.main.temp;
      const name = weather.name;
      const desc = weather.weather[0].description;
      const icon = weather.weather[0].icon;
      console.log(temp);
      console.log(name);
      console.log(desc);
      console.log(icon);
      const imgurl ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write(`<h1>The weather in ${name} is ${desc} and the temperature is ${temp} degrees celcius</h1>`);
    res.write(`<img src="${imgurl}">`);
      res.send();
    });
  });
});
app.listen(port, () => {
  console.log("server is running on port " + port);
});