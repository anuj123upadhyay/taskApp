import { readDocument } from "./db";
import { ITask } from "../models/interface";


const getTasks = async () => {
    const {documents} = await readDocument();
  return documents as ITask[];
}

export default getTasks