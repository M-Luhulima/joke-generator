import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../routes/routes";
import connectDB from "../database/connection";

dotenv.config();
const app = express();
const port: string = process.env.PORT || "5000";

//middleware config
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Load favorite joke routes
app.use("/api/favorite-jokes", router);

app.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
});
