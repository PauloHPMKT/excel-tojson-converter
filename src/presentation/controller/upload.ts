import { ok } from "../helpers/http-response"
import { Upload } from "../../domain/usecases/upload"
import { serverError } from "../helpers/http-response"
import { Controller } from "../protocols/controller"
import { HttpRequest, HttpResponse } from "../types/http"

export class UploadController implements Controller {
  constructor(private readonly uploadFile: Upload) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { file } = httpRequest
      const filePath = await this.uploadFile.execute(file)

      return ok(filePath);
    } catch (error) {
      return serverError();
    }
  }
}
