import express from "express";
import {Request, Response} from "express";
const app = express();
const port = process.env.PORT || "8000";
app.get("/", (req: Request, res: Response) => {
	res.status(200).send("WHATABYTE: Food For Devs");
});

app.listen(port, () => {
	console.log(`Listening to requests on http://localhost:${port}`);
});

