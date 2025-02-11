import { Request, Response, NextFunction } from "express";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const multerAdapter = upload.single('file')

export const multerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  multerAdapter(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    req.body.file = req.file
    next()
  })
}
