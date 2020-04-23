import { Request, Response } from "express";
import { Notification } from "./models/Notification";
import wrapStatus from "./wrapStatus";
import axios from "axios";
import { BadInputError } from "./models/BadInputError";

export default async (req: Request, res: Response) => {
  try {
    const mandatoryFields = ["title", "data"];
    if (!req.body) {
      throw new BadInputError("No body is sent");
    }
    for (const field of mandatoryFields) {
      if (!req.body[field]) {
        throw new BadInputError(`${field} is missing`);
      }
    }
    const notification = Notification.fromJson(req.body);
    await notification.validate();
    const token = "ExponentPushToken[cq8kBCKmxIcbbpgjNduoUJ]";
    await axios.post(
      "https://exp.host/--/api/v2/push/send",
      notification.prepare(token)
    );
    return wrapStatus(res, 200);
  } catch (err) {
    if (err instanceof BadInputError) {
      return wrapStatus(res, 400, err.message);
    }
    console.log(err);
    return wrapStatus(res, 500, err.message);
  }
};
