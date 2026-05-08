import { NextFunction, Request, Response } from "express";
import { SppdFollowerServices } from "../services/sppdFollower.services";
import {
  sppdFollowerInsertSchema,
  sppdFollowerUpdateSchema,
} from "../db/schema/sppdFollower.schema";

export class SppdFollowerController {
  constructor(
    private readonly sppdFollowerServices: SppdFollowerServices,
  ) {
    this.getAllSppdFollower = this.getAllSppdFollower.bind(this);
    this.getSppdFollowerById = this.getSppdFollowerById.bind(this);
    this.getSppdFollowerBySppdId = this.getSppdFollowerBySppdId.bind(this);
    this.createSppdFollower = this.createSppdFollower.bind(this);
    this.updateSppdFollower = this.updateSppdFollower.bind(this);
    this.deleteSppdFollower = this.deleteSppdFollower.bind(this);
  }

  /**
   * @GET /sppd-follower
   * @description Mengambil seluruh data SPPD Follower dari database.
   * @returns {200} Array of SppdFollower objects
   */
  async getAllSppdFollower(_req: Request, res: Response, next: NextFunction) {
    try {
      const followers = await this.sppdFollowerServices.getAllSppdFollower();
      res.status(200).json({
        message: "Sppd Follower retrieved successfully",
        data: followers,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @GET /sppd-follower/:id
   * @description Mengambil satu data SPPD Follower berdasarkan ID.
   * @param {number} req.params.id - ID dari SPPD Follower yang ingin diambil
   * @returns {200} SppdFollower object yang ditemukan
   * @returns {404} Jika SPPD Follower dengan ID tersebut tidak ditemukan
   */
  async getSppdFollowerById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const follower =
        await this.sppdFollowerServices.getSppdFollowerById(id);

      if (!follower || follower.length === 0) {
        res.status(404).json({
          message: `Sppd Follower with id ${id} not found`,
        });
        return;
      }

      res.status(200).json({
        message: "Sppd Follower retrieved successfully",
        data: follower[0],
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @GET /sppd-follower/sppd/:sppdId
   * @description Mengambil semua follower yang terdaftar pada satu SPPD tertentu.
   * @param {number} req.params.sppdId - ID dari SPPD
   * @returns {200} Array of SppdFollower berdasarkan sppdId
   */
  async getSppdFollowerBySppdId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sppdId = Number(req.params.sppdId);

      const followers =
        await this.sppdFollowerServices.getSppdFollowerBySppdId(sppdId);

      res.status(200).json({
        message: "Sppd Followers retrieved successfully",
        data: followers,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @POST /sppd-follower
   * @description Membuat data SPPD Follower baru. Request body divalidasi menggunakan Zod schema
   *              sebelum diteruskan ke layer service.
   * @param {sppdFollowerInput} req.body - Payload berisi sppdId dan employeeId
   * @returns {201} SppdFollower object yang berhasil dibuat
   * @returns {400} Jika validasi body gagal
   */
  async createSppdFollower(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = sppdFollowerInsertSchema.safeParse(req.body);

      if (!parsed.success) {
        res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.issues[0],
        });
        return;
      }

      const follower =
        await this.sppdFollowerServices.createSppdFollower(parsed.data);

      res.status(201).json({
        message: "Sppd Follower created successfully",
        data: follower[0],
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @PUT /sppd-follower/:id
   * @description Memperbarui data SPPD Follower berdasarkan ID.
   * @param {number} req.params.id - ID dari SPPD Follower yang ingin diperbarui
   * @param {sppdFollowerUpdate} req.body - Payload berisi field yang akan diperbarui
   * @returns {200} Konfirmasi bahwa data berhasil diperbarui
   * @returns {400} Jika validasi body gagal
   * @returns {404} Jika SPPD Follower dengan ID tersebut tidak ditemukan
   */
  async updateSppdFollower(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      // Pastikan data yang akan diupdate ada terlebih dahulu
      const existing =
        await this.sppdFollowerServices.getSppdFollowerById(id);
      if (!existing || existing.length === 0) {
        res.status(404).json({
          message: `Sppd Follower with id ${id} not found`,
        });
        return;
      }

      const parsed = sppdFollowerUpdateSchema.safeParse(req.body);

      if (!parsed.success) {
        res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        });
        return;
      }

      await this.sppdFollowerServices.updateSppdFollower(id, parsed.data);

      res.status(200).json({
        message: "Sppd Follower updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @DELETE /sppd-follower/:id
   * @description Menghapus data SPPD Follower berdasarkan ID.
   * @param {number} req.params.id - ID dari SPPD Follower yang ingin dihapus
   * @returns {200} Konfirmasi bahwa data berhasil dihapus
   * @returns {404} Jika SPPD Follower dengan ID tersebut tidak ditemukan
   */
  async deleteSppdFollower(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      // Pastikan data yang akan dihapus ada terlebih dahulu
      const existing =
        await this.sppdFollowerServices.getSppdFollowerById(id);
      if (!existing || existing.length === 0) {
        res.status(404).json({
          message: `Sppd Follower with id ${id} not found`,
        });
        return;
      }

      await this.sppdFollowerServices.deleteSppdFollower(id);

      res.status(200).json({
        message: "Sppd Follower deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
