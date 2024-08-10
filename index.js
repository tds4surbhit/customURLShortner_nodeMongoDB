const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/url");
const port = 8001;
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

// INDEX JS --> ROUTER --> CONTROLLER --> IMPORT MODEL INTO CONTROLLER AND DO OPERATIONS
app.use(express.json());
app.listen(port, () => console.log(`Server Started on the port ${port}`));
// app.use("/url", router);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now,
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Successfully connected to DB"))
  .catch(() => console.log("DB connection unsuccessful"));
