const express = require("express");
const router = express.Router();
const { generateNewShortURL } = require("../controllers/url");

router.route("/").get(generateNewShortURL);

module.exports = {
  router,
};
