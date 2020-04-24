import { Request, Response } from "express";
import { BadInputError } from "../../BadInputError";
import wrapStatus from "../../wrapStatus";
import DeviceRepository from "../../database/repository/DeviceRepository";
import { getMongoClient } from "../../database/getMongoClient";
import { Device } from "../../models/Device";

export default async (req: Request, res: Response) => {
  try {
    const client = await getMongoClient();
    const deviceCollection = new DeviceRepository(client).collection;
    const device = Device.fromJson(req.body);
    device.validate();
    const updatedDevice = await deviceCollection.findOneAndUpdate(
      {
        name: { $eq: device.name },
        "room.name": device.room.name,
      },
      device
    );
    if (!updatedDevice || !updatedDevice.value) {
      throw new BadInputError("Device not found.");
    }
    return res.status(200).send(updatedDevice.value);
  } catch (err) {
    if (err instanceof BadInputError) {
      return wrapStatus(res, 200, err.message);
    }
    console.log(err);
    return wrapStatus(res, 500, err.message);
  }
};
