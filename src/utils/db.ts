import { ID, databases } from "./appwrite";
import { IPayload } from "../models/interface";
import { Query } from "appwrite";
import conf from "../config/conf";

const dbID:string = conf.appwriteDatabaseId
const taskCollectionID:string  = conf.appwriteCollectionId;
const userCollectionID:string = conf.appwiteUserCollectionId;

// const createDocument = async (payload: IPayload, userId: string) => {
//     const res = await databases.createDocument(dbID, taskCollectionID, ID.unique(), {
//       ...payload,
//       userId, // Add userId to task
//     });
//     return res;
//   };

// const readDocument = async ()=>{
//     const res = await databases.listDocuments(dbID,taskCollectionID)
//     return res;
// }

// const updateDocument = async (payload:IPayload,id:string)=>{
//     const res = await databases.updateDocument(dbID,taskCollectionID,id,{
//         ...payload
//     })
//     return res;
// }

// const deleteDocument = async (id:string)=>{
//     const res = await databases.deleteDocument(dbID,taskCollectionID,id);
//     return res;
    
// }

// const searchTasks = async(searchTerm:string)=>{
//     const resTitle = await databases.listDocuments(dbID,taskCollectionID,[Query.search('title',searchTerm)]);
//     const resDesc = await databases.listDocuments(dbID,taskCollectionID,[Query.search('description',searchTerm)]);
//     const res = [...resTitle.documents,...resDesc.documents];

//      // remove duplicate tasks
//     const uniqueRes = res.filter(
//         (task, index, self) => index === self.findIndex((t) => t.$id === task.$id)
//     );

//     return uniqueRes;
// }

// const sortByDueDate = async (isEarliestToLatest: boolean) => {
//     const orderQuery = isEarliestToLatest
//         ? Query.orderAsc("due_date")
//         : Query.orderDesc("due_date");
//     const res = await databases.listDocuments(dbID, taskCollectionID, [orderQuery]);
//     return res;
// };





// Create a task and associate it with a user
 const createTask = async (payload: IPayload, userId: string) => {
  try {
    const task = await databases.createDocument(dbID, taskCollectionID, ID.unique(), {
      ...payload,
      userId, // Save the userId with the task
    });
    return { success: true, task };
  } catch (error:any) {
    console.error('Create Task Error:', error);
    return { success: false, message: error.message };
  }
};

// Get all tasks for a specific user
 const getTasksByUser = async (userId: string) => {
  try {
    const result = await databases.listDocuments(dbID, taskCollectionID, [
      Query.equal('userId', userId), // Filter tasks by userId
    ]);
    return { success: true, tasks: result.documents };
  } catch (error:any) {
    console.error('Get Tasks Error:', error);
    return { success: false, message: error.message };
  }
};

// Update a task
 const updateTask = async (taskId: string, payload: IPayload) => {
  try {
    const task = await databases.updateDocument(dbID, taskCollectionID, taskId, {
      ...payload,
    });
    return { success: true, task };
  } catch (error:any) {
    console.error('Update Task Error:', error);
    return { success: false, message: error.message };
  }
};

// Delete a task
 const deleteTask = async (taskId: string) => {
  try {
    await databases.deleteDocument(dbID, taskCollectionID, taskId);
    return { success: true, message: 'Task deleted successfully.' };
  } catch (error:any) {
    console.error('Delete Task Error:', error);
    return { success: false, message: error.message };
  }
};

// Search tasks by title or description
 const searchTasks = async (searchTerm: string) => {
  try {
    const resTitle = await databases.listDocuments(dbID, taskCollectionID, [
      Query.search('title', searchTerm),
    ]);
    const resDesc = await databases.listDocuments(dbID, taskCollectionID, [
      Query.search('description', searchTerm),
    ]);
    const result = [...resTitle.documents, ...resDesc.documents];

    // Remove duplicate tasks
    const uniqueRes = result.filter(
      (task, index, self) => index === self.findIndex((t) => t.$id === task.$id)
    );

    return { success: true, tasks: uniqueRes };
  } catch (error:any) {
    console.error('Search Tasks Error:', error);
    return { success: false, message: error.message };
  }
};

// Sort tasks by due date (ascending or descending)
 const sortTasksByDueDate = async (isEarliestToLatest: boolean) => {
  try {
    const orderQuery = isEarliestToLatest ? Query.orderAsc('due_date') : Query.orderDesc('due_date');
    const result = await databases.listDocuments(dbID, taskCollectionID, [orderQuery]);
    return { success: true, tasks: result.documents };
  } catch (error:any) {
    console.error('Sort Tasks Error:', error);
    return { success: false, message: error.message };
  }
};


const getUserDetails = async (userId: string) => {
    const user = await databases.getDocument(dbID, userCollectionID, userId);
    return user;
  };

// export {createDocument,readDocument,updateDocument,deleteDocument,searchTasks,sortByDueDate,getUserDetails}
export {createTask,getTasksByUser,updateTask,deleteTask,searchTasks,sortTasksByDueDate,getUserDetails}