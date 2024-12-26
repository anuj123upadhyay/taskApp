import { getTasksByUser } from "./db";
import { ITask } from "../models/interface";
import { getCurrentUser } from "../auth/auth";

const getTasks = async (): Promise<ITask[]> => {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser.success && currentUser.user) {
      const userId = currentUser.user.$id;
      const tasksResponse = await getTasksByUser(userId);
      if (tasksResponse.success && tasksResponse.tasks) {
        return tasksResponse.tasks as ITask[];
      } else {
        throw new Error(tasksResponse.message || "Failed to fetch tasks");
      }
    } else {
      throw new Error(currentUser.message || "User not found");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export default getTasks;