import express, { Router, Request, Response } from "express";
import { XataClient } from "../xata";
import dotenv from "dotenv";

dotenv.config();

const router: Router = express.Router();
const xata = new XataClient();

router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("Trying to get contact records..");
    let query = req.query;

    const rec = await xata.db.contact.filter(query).getMany();
    res.json(rec);

    console.log("..done");
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const recId = req.params.id;
    console.log("Trying to query for", recId);

    if (typeof recId === "undefined") throw new Error("Id is undefined");
    res.json(await xata.db.contact.read(recId));
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Creating contact:", req.body);
    res.json(await xata.db.contact.create(req.body));
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    console.log("Updating contact:", req.body);
    res.json(await xata.db.contact.update(req.params.id, req.body));
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    console.log("Deleting contact:", req.params.id);
    res.json(await xata.db.contact.delete(req.params.id));
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

router.get("/:id/activity", async (req: Request, res: Response) => {
  try {
    const recId = req.params.id;
    console.log("Trying to query for", recId);

    if (typeof recId === "undefined") throw new Error("Id is undefined");

    let query = { contact: { id: recId } };
    const rec = await xata.db.activity.filter(query).getMany();

    res.json(rec);
  } catch (e: any) {
    res.status(500).send(e.toString());
  }
});

export default router;
