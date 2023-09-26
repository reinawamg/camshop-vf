import express from "express";
import dotenv from "dotenv";
dotenv.config();
import products from "./data/products.js";
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// route for all products - fetch data from front end
app.get("/api/products", (req, res) => {
  res.json(products);
});

// route for a single product
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id); // return the product whose _id match the id in URL
  res.json(product);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
