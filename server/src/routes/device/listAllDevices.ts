import { Request, Response } from "express";
import { BadInputError } from "../../BadInputError";
import wrapStatus from "../../wrapStatus";
import DeviceRepository from "../../database/repository/DeviceRepository";
import { getMongoClient } from "../../database/getMongoClient";

export default async (req: Request, res: Response) => {
  try {
    const client = await getMongoClient();
    const deviceCollection = new DeviceRepository(client).collection;
    const devices = await deviceCollection.find().toArray();
    return res.status(200).send(devices);
  } catch (err) {
    if (err instanceof BadInputError) {
      return wrapStatus(res, 200, err.message);
    }
    console.log(err);
    return wrapStatus(res, 500, err.message);
  }
};
