import { NextFunction, Request, Response } from "express";
import { SppdServices } from "../services/sppd.services";
import { sppdInsertSchema, sppdUpdateSchema } from "../db/schema/sppd.schema";

export class SppdController {
  constructor(private readonly sppdServices: SppdServices) {
    this.getAllSppd = this.getAllSppd.bind(this);
    this.getSppdById = this.getSppdById.bind(this);
    this.createSppd = this.createSppd.bind(this);
    this.updateSppd = this.updateSppd.bind(this);
    this.deleteSppd = this.deleteSppd.bind(this);
  }

  /**
   * @GET /sppd
   * @description Mengambil seluruh data SPPD dari database.
   * @returns {200} Array of SPPD objects
   */
  async getAllSppd(_req: Request, res: Response, next: NextFunction) {
    try {
      const sppd = await this.sppdServices.getAllSppd();
      res.status(200).json({
        message: "Sppd retrieved successfully",
        data: sppd,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @GET /sppd/:id
   * @description Mengambil satu data SPPD berdasarkan ID yang diberikan melalui route param.
   * @param {number} req.params.id - ID dari SPPD yang ingin diambil
   * @returns {200} SPPD object yang ditemukan
   * @returns {404} Jika SPPD dengan ID tersebut tidak ditemukan
   */
  async getSppdById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const sppd = await this.sppdServices.getSppdById(id);

      if (!sppd || sppd.length === 0) {
        res.status(404).json({
          message: `Sppd with id ${id} not found`,
        });
        return;
      }

      res.status(200).json({
        message: "Sppd retrieved successfully",
        data: sppd,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @POST /sppd
   * @description Membuat data SPPD baru. Request body divalidasi menggunakan Zod schema
   *              sebelum diteruskan ke layer service.
   * @param {sppdInput} req.body - Payload berisi data SPPD yang akan dibuat
   * @returns {201} SPPD object yang berhasil dibuat
   * @returns {400} Jika validasi body gagal
   */
  async createSppd(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = sppdInsertSchema.safeParse(req.body);

      if (!parsed.success) {
        res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.issues[0],
        });
        return;
      }

      const sppd = await this.sppdServices.createSppd(parsed.data);

      res.status(201).json({
        message: "Sppd created successfully",
        data: sppd[0],
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @PUT /sppd/:id
   * @description Memperbarui data SPPD berdasarkan ID. Request body divalidasi menggunakan
   *              Zod update schema (semua field bersifat opsional).
   * @param {number} req.params.id - ID dari SPPD yang ingin diperbarui
   * @param {sppdUpdate} req.body - Payload berisi field yang akan diperbarui
   * @returns {200} Konfirmasi bahwa data berhasil diperbarui
   * @returns {400} Jika validasi body gagal
   * @returns {404} Jika SPPD dengan ID tersebut tidak ditemukan
   */
  async updateSppd(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      // Pastikan data yang akan diupdate ada terlebih dahulu
      const existing = await this.sppdServices.getSppdById(id);
      if (!existing || existing.length === 0) {
        res.status(404).json({
          message: `Sppd with id ${id} not found`,
        });
        return;
      }

      const parsed = sppdUpdateSchema.safeParse(req.body);

      if (!parsed.success) {
        res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        });
        return;
      }

      await this.sppdServices.updateSppd(id, parsed.data);

      res.status(200).json({
        message: "Sppd updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @DELETE /sppd/:id
   * @description Menghapus data SPPD berdasarkan ID yang diberikan melalui route param.
   * @param {number} req.params.id - ID dari SPPD yang ingin dihapus
   * @returns {200} Konfirmasi bahwa data berhasil dihapus
   * @returns {404} Jika SPPD dengan ID tersebut tidak ditemukan
   */
  async deleteSppd(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      // Pastikan data yang akan dihapus ada terlebih dahulu
      const existing = await this.sppdServices.getSppdById(id);
      if (!existing || existing.length === 0) {
        res.status(404).json({
          message: `Sppd with id ${id} not found`,
        });
        return;
      }

      await this.sppdServices.deleteSppd(id);

      res.status(200).json({
        message: "Sppd deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
