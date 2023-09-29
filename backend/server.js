import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 5000;

connectDB(); // connect to MongoDB

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// anytime we hit the route ""/api/products"", we will go to productRoutes
app.use("/api/products", productRoutes);

// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
