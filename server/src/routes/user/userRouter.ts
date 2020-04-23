import express, { Router } from "express";
import register from "./register";
import getUser from "./getUser";
import update from "./update";
const router: Router = express.Router();

router.post("/register", register);
router.post("/update", update);
router.get("/", getUser);

export const UserRouter = router;
