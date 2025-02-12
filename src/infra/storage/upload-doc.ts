import * as XLSX from "xlsx";
import fs from "node:fs";
import path from "node:path";
import { FileStorage } from "../../data/protocols/file-storage";
import { FileToJson } from "../../data/protocols/file-to-json";

export class LocalFileStorage implements FileStorage, FileToJson {
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

  async read(file: any): Promise<any> {
    const fileName = file.originalname
    const workbookPath = path.join(__dirname, '../../uploads', fileName)

    const workbook = XLSX.readFile(workbookPath)

    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const converteed = XLSX.utils.sheet_to_json(sheet)

    const toJson = converteed.map(this.covertKeysToLowerCase)

    fs.mkdirSync(path.join(__dirname, '../../json'), { recursive: true });
    const jsonFileName = fileName.split('.').slice(0, -1).join('.');
    const jsonPath = path.join(__dirname, '../../json', `${jsonFileName}.json`);
    return fs.writeFileSync(jsonPath, JSON.stringify(toJson));
  }

  private covertKeysToLowerCase = (obj: any) => {
    const newObj: { [key: string]: any } = {}
    Object.keys(obj).forEach(key => {
        newObj[key.toLowerCase()] = obj[key]
    })
    return newObj
}
}
