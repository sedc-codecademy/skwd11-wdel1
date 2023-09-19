import { readFile, writeFile } from "node:fs/promises";

export class DataService {
  // 1. Read json file
  static async readJSONFile(path) {
    const stringData = await readFile(path, { encoding: "utf-8" });

    return JSON.parse(stringData);
  }

  // 2. Save json file
  static async writeJSONFile(path, data) {
    return writeFile(path, JSON.stringify(data, 0, 2));
  }
}
