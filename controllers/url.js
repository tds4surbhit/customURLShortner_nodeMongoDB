const shortid = require("shortid");
const URL = require("../models/url");

async function generateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }
  const response = await URL.create({
    shortId: shortid.generate(),
    redirectURL: body.url,
    visitHistory: [],
  });
  console.log(" Updating to MongoDB Response", response);
  return res.json({ id: shortid });
}

module.exports = {
  generateNewShortURL,
};
