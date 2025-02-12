import { FileStorage } from "../protocols/file-storage";
import { Upload } from "../../domain/usecases/upload";
import { FileToJson } from "../protocols/file-to-json";

export class UploadExcelUseCase implements Upload {
  constructor(
    private readonly fileStorage: FileStorage,
    private readonly readFileToJson: FileToJson,
  ) {}

  async execute(file: any): Promise<any> {
    if (!file) {
      throw new Error("Nenhum arquivo enviado");
    }

    const toJson = await this.readFileToJson.read(file);
    console.log(toJson)
    const filePath = await this.fileStorage.save(file);
    return filePath;
  }
}
