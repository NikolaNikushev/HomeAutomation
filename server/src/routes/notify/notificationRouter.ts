import express, { Router } from "express";
import notify from "./notify";
import loadNotificationsForDevice from "./loadNotificationsForDevice";
import deleteNotification from "./deleteNotification";

const router: Router = express.Router();

router.post("/", notify);
router.delete("/", deleteNotification);
router.get("/", loadNotificationsForDevice);

export const NotificationRouter = router;
