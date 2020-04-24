import { Request, Response } from "express";
import wrapStatus from "../../wrapStatus";
import { BadInputError } from "../../BadInputError";
import UsersRepository from "../../database/repository/UsersRepository";
import { getMongoClient } from "../../database/getMongoClient";
import { User } from "../../models/User";

export default async (req: Request, res: Response) => {
  try {
    const mongoClient = await getMongoClient();
    const usersRepository = new UsersRepository(mongoClient).collection;
    const user = User.fromJson(req.body);
    user.validate();
    let userDB = await usersRepository.findOne({ deviceId: user.deviceId });
    if (!userDB) {
      await usersRepository.insertOne(user);
      userDB = await usersRepository.findOne(user);
    }
    return res.status(200).send(userDB);
  } catch (err) {
    if (err instanceof BadInputError) {
      return wrapStatus(res, 400, err.message);
    }
    console.log(err);
    return wrapStatus(res, 500, err.message);
  }
};
