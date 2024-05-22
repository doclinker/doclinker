import express from "express";

import { currentUser } from "../../../common/src";

// Create an Express router
const router = express.Router();

// Route handler for retrieving the current user.
router.get("/currentuser", currentUser, (req, res) => {
  // Send the current user data or null if not authenticated
  res.send({ currentUser: req.currentUser || null });
});

// Export the router
export { router as currentUserRouter };
