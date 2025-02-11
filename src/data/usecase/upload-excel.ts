import { FileStorage } from "../protocols/file-storage";
import { Upload } from "../../domain/usecases/upload";

export class UploadExcelUseCase implements Upload {
  constructor(private readonly fileStorage: FileStorage) {}

  async execute(file: any): Promise<any> {
    if (!file) {
      throw new Error("Nenhum arquivo enviado");
    }

    const filePath = await this.fileStorage.save(file);
    return filePath;
  }
}
