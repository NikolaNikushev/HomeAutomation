import { Request, Response } from "express";
import wrapStatus from "../../wrapStatus";
import { BadInputError } from "../../models/BadInputError";
import UserNotificationsRepository from "../../database/repository/UserNotificationsRepository";
import { getMongoClient } from "../../database/getMongoClient";
import { ObjectId } from "mongodb";

export default async (req: Request, res: Response) => {
  try {
    const mandatoryFields = ["id"];
    const params = req.params;
    if (!params) {
      throw new BadInputError("No body is sent");
    }
    for (const field of mandatoryFields) {
      if (!params[field]) {
        throw new BadInputError(`${field} is missing`);
      }
    }
    const client = await getMongoClient();
    const notificationsRepository = new UserNotificationsRepository(client)
      .collection;
    const resp = await notificationsRepository.findOneAndDelete({
      _id: new ObjectId(params.id),
    });
    return wrapStatus(res, 200, resp.value ? "Done" : "Nothing deleted");
  } catch (err) {
    if (err instanceof BadInputError) {
      return wrapStatus(res, 400, err.message);
    }
    console.log(err);
    return wrapStatus(res, 500, err.message);
  }
};
