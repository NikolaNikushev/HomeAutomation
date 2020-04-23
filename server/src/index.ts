import express from "express";
import { Request, Response } from "express";
import wrapStatus from "./wrapStatus";
import bodyParser from "body-parser";
import { UserRouter } from "./routes/user/userRouter";
import { NotificationRouter } from "./routes/notify/notificationRouter";

const app = express();
const port = process.env.PORT || "8000";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  return wrapStatus(res, 200, "You made it");
});
app.use("/user", UserRouter);
app.use("/notification", NotificationRouter);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
