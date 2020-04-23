import { Request, Response } from "express";
import { Notification } from "../../models/Notification";
import wrapStatus from "../../wrapStatus";
import axios from "axios";
import { BadInputError } from "../../models/BadInputError";
import UserNotificationsRepository from "../../database/repository/UserNotificationsRepository";
import { getMongoClient } from "../../database/getMongoClient";
import UsersRepository from "../../database/repository/UsersRepository";

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
    const client = await getMongoClient();
    const notificationsRepository = new UserNotificationsRepository(client)
      .collection;
    const usersRepository = new UsersRepository(client).collection;
    const usersToNotify = await usersRepository
      .find({ pushToken: { $exists: true, $ne: null } })
      .toArray();
    const notificationIds = [];
    for (const user of usersToNotify) {
      const token = user.pushToken;
      await axios.post(
        "https://exp.host/--/api/v2/push/send",
        notification.prepare(token)
      );

      const insert = await notificationsRepository.insertOne({
        user,
        notification,
      });
      notificationIds.push(insert.insertedId);
    }

    return res.status(200).send(notificationIds);
  } catch (err) {
    if (err instanceof BadInputError) {
      return wrapStatus(res, 400, err.message);
    }
    console.log(err);
    return wrapStatus(res, 500, err.message);
  }
};
