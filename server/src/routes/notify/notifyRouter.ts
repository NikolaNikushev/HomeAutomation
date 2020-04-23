import express, { Router } from "express";
import notify from "./notify";
import loadNotificationsForDevice from "./loadNotificationsForDevice";

const router: Router = express.Router();

router.post("/", notify);
router.get("/notifications", loadNotificationsForDevice);

export const NotifyRouter = router;
