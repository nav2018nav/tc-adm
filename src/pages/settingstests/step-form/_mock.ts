// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from "express";

export default {
  "POST  /api/forms": (_: Request, res: Response) => {
    res.send({ message: "Ok" });
  },
};