import { UploadExcelUseCase } from "../../data/usecase/upload-excel";
import { LocalFileStorage } from "../../infra/storage/upload-doc";
import { UploadController } from "../../presentation/controller/upload";

export const makeUploadController = (): any => {
  const localFileStorage = new LocalFileStorage();
  const uploadExcelService = new LocalFileStorage();
  const uploadExcelUseCase = new UploadExcelUseCase(localFileStorage, uploadExcelService);
  return new UploadController(uploadExcelUseCase);
}
