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
    const foundDevice = await deviceCollection.findOne({
      name: device.name,
      room: device.room,
    });
    if (foundDevice) {
      return foundDevice;
    }
    await deviceCollection.insertOne(device);
    const newDevice = await deviceCollection.findOne(device);

    return res.status(200).send(newDevice);
  } catch (err) {
    if (err instanceof BadInputError) {
      return wrapStatus(res, 400, err.message);
    }
    console.log(err);
    return wrapStatus(res, 500, err.message);
  }
};
