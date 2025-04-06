const { Socket } = require("dgram");
const express = require("express");
const app = express();
const axios = require("axios").default;
const currentipv6is = { ip: "" };
const dotenv = require("dotenv").config();
async function updateIP() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "http://dynupdate.no-ip.com/nic/update?hostname=+" +
      process.env.hostname +
      "+=" +
      currentipv6is.ip,
    headers: {
      Authorization: "Basic " + btoa(process.env.TOKEN),
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}
function getIP() {
  fetch("http://ip1.dynupdate6.no-ip.com/")
    .then((response) => response.text())
    .then((data) => {
      currentipv6is.ip = data;
      console.log(currentipv6is);
    })
    .catch((error) => {
      console.log(error);
    });
}
setInterval(() => {
  getIP();
  if (currentipv6is.ip === "") {
  } else {
    updateIP();
  }
}, 1800000);
app.listen(3015, () => {
  console.log("Server Started On port 3015........");
});
