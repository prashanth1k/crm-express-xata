import express, { Router, Request, Response } from "express";
import { XataClient } from "../xata";
import dotenv from "dotenv";

dotenv.config();

const router: Router = express.Router();
const xata = new XataClient();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const recId = req.params.id;
    console.log("Trying to query for", recId);

    if (typeof recId === "undefined") throw new Error("Id is undefined");
    res.json(await xata.db.activity.read(recId));
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Creating activity:", req.body);
    res.json(await xata.db.activity.create(req.body));
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    console.log("Updating activity:", req.body);
    res.json(await xata.db.activity.update(req.params.id, req.body));
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    console.log("Deleting activity:", req.params.id);
    res.json(await xata.db.activity.delete(req.params.id));
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

export default router;
