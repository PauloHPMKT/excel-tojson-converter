import path from "node:path";
import { FileStorage } from "../../data/protocols/file-storage";
import fs from "node:fs";

export class LocalFileStorage implements FileStorage {
  private readonly uploadPath: string;

  constructor() {
    this.uploadPath = path.join(__dirname, "..", "..", "uploads");
  }

  async save(file: Express.Multer.File): Promise<string> {
    const filePath = path.join(this.uploadPath, file.originalname);

    fs.mkdir(this.uploadPath, { recursive: true }, () => {});
    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }
}
