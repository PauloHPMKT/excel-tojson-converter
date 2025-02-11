import { Router } from "express";
import { expressAdapter } from "../adapter/express-adapter";
import { makeUploadController } from "../factories/upload";
import { multerAdapter } from "../adapter/multer-adapter";

export class RouterGroup {
  public readonly router: Router
  constructor() {
    this.router = Router()
  }

  initRouter() {
    this.router.post('/upload', multerAdapter, expressAdapter(makeUploadController()))
  }
}
