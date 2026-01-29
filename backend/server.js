import express from "express";
import cors from "cors";
import { trends } from "./trends.js";
import { analyzeMood } from "./ai.js";

const app = express();
app.use(cors());

app.get("/mood", async (req, res) => {
  try {
    const mood = await analyzeMood(trends);
    res.json(mood);
  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(3000, () =>
  console.log("🔥 Backend running on http://localhost:3000")
);
