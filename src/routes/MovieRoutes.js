import express from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import { movieSchema } from "../validators/movieValitators.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ httpMethod: "get" });
});

router.post("/",validateRequest(movieSchema), (req, res) => {
    const {title,releaseYear,genres,runtime,posterUrl} =req.body;
  res.json({ httpMethod: "post" });
});

router.put("/",validateRequest(movieSchema), (req, res) => {
     const {title,releaseYear,genres,runtime,posterUrl} =req.body;
  res.json({ httpMethod: "put" });
});

router.delete("/", (req, res) => {
  res.json({ httpMethod: "delete" });
});

export default router;