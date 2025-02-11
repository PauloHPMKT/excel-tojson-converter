export interface FileStorage {
  save(excel: any): Promise<string>;
}
