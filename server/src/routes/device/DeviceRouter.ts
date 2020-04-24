import express, { Router } from "express";
import listAllDevices from "./listAllDevices";
import registerDevice from "./registerDevice";
import updateDeviceStatus from "./updateDeviceStatus";

const router: Router = express.Router();

router.get("/", listAllDevices);
router.post("/", registerDevice);
router.post("/update", updateDeviceStatus);

export const DeviceRouter = router;
