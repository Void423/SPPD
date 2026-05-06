import { NextFunction, Request, Response } from "express";
import { SppdServices } from "../services/sppd.services";
import { sppdInsertSchema } from "../db/schema/sppd.schema";

export class SppdController {
  constructor(private readonly sppdServices: SppdServices) {
    this.getAllSppd = this.getAllSppd.bind(this);
  }

  /**
   * @GET
   */
  async getAllSppd(_req: Request, res: Response, next: NextFunction) {
    try {
      const sppd = await this.sppdServices.getAllSppd();
      res.status(200).json({
        message: "Sppd retrieve successfully",
        data: sppd,
      });
    } catch (error) {
      console.error("Detail error:", error); // log full error object
      throw error;
      // res.status(500).json({
      //   message: "Internal server error",
      // });
    }
  }
}
