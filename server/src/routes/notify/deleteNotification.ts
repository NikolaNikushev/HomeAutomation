import { Request, Response } from "express";
import wrapStatus from "../../wrapStatus";
import { BadInputError } from "../../models/BadInputError";
import UserNotificationsRepository from "../../database/repository/UserNotificationsRepository";
import { getMongoClient } from "../../database/getMongoClient";

export default async (req: Request, res: Response) => {
  try {
    const mandatoryFields = ["id"];
    const body = req.body;
    if (!body) {
      throw new BadInputError("No body is sent");
    }
    for (const field of mandatoryFields) {
      if (!body[field]) {
        throw new BadInputError(`${field} is missing`);
      }
    }
    const client = await getMongoClient();
    const notificationsRepository = new UserNotificationsRepository(client)
      .collection;
    await notificationsRepository.findOneAndDelete({ $_id: body.id });

    return wrapStatus(res, 200, `Done`);
  } catch (err) {
    if (err instanceof BadInputError) {
      return wrapStatus(res, 400, err.message);
    }
    console.log(err);
    return wrapStatus(res, 500, err.message);
  }
};
