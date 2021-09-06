const express = require("express");
const cors = require("cors");

const superAdmin = express();

superAdmin.use(cors({ origin: true }));

superAdmin.get("/", (req, res) => {
    return res.json("superadmin Api is working fine");
  });
  
module.exports = superAdmin;