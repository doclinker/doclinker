// Import dependencies
import "express-async-errors";

import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import morgan from "morgan";

import { currentUser, errorHandler, NotFoundError } from "../../common/src";

// Import routes
import doctorDetails  from "./routes/doctor-details";


// Initialize the express app
const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(morgan("dev"));
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// Health check route
app.get("/v1/health", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

app.use(currentUser)

// Mount routes
app.use("/v1/doctor-details", doctorDetails );


// Define 404 Not Found handler
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

// Export the app
export { app };
