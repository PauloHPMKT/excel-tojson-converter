import { Upload } from "../domain/usecases/upload"

export class UploadController {
  constructor(private readonly uploadFile: Upload) {}

  async handle(httpRequest: any): Promise<any> {
    try {
      const { file } = httpRequest
      const filePath = await this.uploadFile.execute(file)

      return {
        statusCode: 200,
        body: filePath
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Server error')
      }
    }
  }
}
