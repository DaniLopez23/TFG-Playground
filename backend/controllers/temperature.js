const temperatureRouter = require("express").Router();
const { InfluxDB, Point } = require("@influxdata/influxdb-client");
const config = require("../utils/config");

const token = config.INFLUX_TOKEN;
const url = config.INFLUX_URL;
const org = config.INFLUX_ORG;

const client = new InfluxDB({ url, token });

temperatureRouter.get("/", (req, res) => {
  let queryClient = client.getQueryApi(org);
  let fluxQuery = `from(bucket: "farm-01")
    |> range(start: -24h)  // Define el rango de tiempo explícitamente
    |> filter(fn: (r) => r["_measurement"] == "temperature_probe")
    |> aggregateWindow(every: 10m, fn: mean, createEmpty: false)  // Define el período de ventana explícitamente
    |> yield(name: "mean")`;

    const results = [];

    queryClient.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row);
        results.push(tableObject);
      },
      error: (error) => {
        console.error(error);
        if (!res.headersSent) {
          res.status(500).send(error.message);
        }
      },
      complete: () => {
        if (!res.headersSent) {
          res.status(200).json(results);
        }
      }
    });
  
});

module.exports = temperatureRouter;
