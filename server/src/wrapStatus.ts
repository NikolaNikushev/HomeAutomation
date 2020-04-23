import { Response } from "express";

export default (res: Response, status: number, message?: string) => {
  return res.status(status).send({ message, status });
};
