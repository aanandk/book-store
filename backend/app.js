const cors = require("cors");
const express = require("express");
const app = express();
const books = require("./routes/books");

// Connect DB
require("./startup/db")(); // Dont forget the braces at the end - Immediately Invoke Function

app.use(cors());
app.use(express.json());
app.use("/api/books", books);

app.get("/", (req, res) => res.send("Hello..."));

const port = process.env.PORT || 3036;

app.listen(port, () => console.log(`Server is running on port ${port}`));
