import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.json({ msg: "hello world" });
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

export default router;
