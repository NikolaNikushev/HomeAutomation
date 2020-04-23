import { Request, Response } from "express";
import wrapStatus from "../../wrapStatus";
import { BadInputError } from "../../models/BadInputError";
import UserNotificationsRepository from "../../database/repository/UserNotificationsRepository";
import { getMongoClient } from "../../database/getMongoClient";

export default async (req: Request, res: Response) => {
  try {
    const mandatoryFields = ["deviceId", "deviceName"];
    const input = req.query;
    if (!input) {
      throw new BadInputError("No body is sent");
    }
    for (const field of mandatoryFields) {
      if (!input[field]) {
        throw new BadInputError(`${field} is missing`);
      }
    }
    const client = await getMongoClient();
    const notificationsRepository = new UserNotificationsRepository(client)
      .collection;
    const notifications = await notificationsRepository
      .find({
        user: {
          deviceId: input.deviceId as string,
          deviceName: input.deviceName as string,
        },
      })
      .toArray();
    return res.status(200).send(notifications);
  } catch (err) {
    if (err instanceof BadInputError) {
      return wrapStatus(res, 400, err.message);
    }
    console.log(err);
    return wrapStatus(res, 500, err.message);
  }
};
