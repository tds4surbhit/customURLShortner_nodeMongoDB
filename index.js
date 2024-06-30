const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const port = 8001;
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
// INDEX JS --> ROUTER --> CONTROLLER --> IMPORT MODEL INTO CONTROLLER AND DO OPERATIONS

app.listen(port, () => console.log(`Server Started on the port ${port}`));
app.use("/url", urlRoute);

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
app.use(express.json());
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Successfully connected to DB"))
  .catch(() => console.log("DB connection unsuccessful"));
