// import exp from "constants";
// import { write } from "fs";
import jsonfile from "jsonfile";

export function readJsonfile<T>(filepath: string) {
  return jsonfile.readFile(filepath) as Promise<Array<T>>;
}

export function writeJsonFile(filepath: string, data: any) {
  return jsonfile.writeFile(filepath, data, { spaces: 2 });
}
