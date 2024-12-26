// // import { useEffect, useState } from "react";
// // import { ITask } from "../models/interface";
// // import TaskItem from "../components/TaskItem";
// // import Dialog from "../components/Dialog";
// // import Search from "../components/Search";
// // import { PlusIcon } from "@heroicons/react/24/solid";
// // import Button from "../components/Button";
// // import { useNavigate } from "react-router-dom";
// // import Select from "../components/Select";
// // import { sortTasksByDueDate, getTasksByUser } from "../utils/db";
// // import { getCurrentUser } from "../auth/auth"; // Import function to get the logged-in user

// // const Task = () => {
// //   const [isViewTask, setIsViewTask] = useState(false);
// //   const [selectedTask, setSelectedTask] = useState<ITask | undefined>(undefined);
// //   const [tasks, setTasks] = useState<ITask[]>([]);
// //   const [tasksError, setTasksError] = useState<string>("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchUserTasks = async () => {
// //       try {
// //         const response = await getCurrentUser();
// //         if (response.success && response.user) {
// //           const user = response.user;
// //           const tasksResponse = await getTasksByUser(user.$id);
// //           if (tasksResponse.success && tasksResponse.tasks) {
// //             const mappedTasks: ITask[] = tasksResponse.tasks.map((task) => ({
// //               $id: task.$id,
// //               $collectionId: task.$collectionId,
// //               $databaseId: task.$databaseId,
// //               $createdAt: task.$createdAt,
// //               $updatedAt: task.$updatedAt,
// //               $permissions: task.$permissions,
// //               title: task.title,
// //               description: task.description,
// //               due_date: new Date(task.due_date),
// //               priority: task.priority,
// //               done: task.done,
// //               userId: task.userId,
// //             }));
// //             setTasks(mappedTasks);
// //           } else {
// //             setTasksError(tasksResponse.message || "Failed to fetch tasks");
// //           }
// //         } else {
// //           setTasksError(response.message || "User not found");
// //         }
// //       } catch (error) {
// //         setTasksError(error instanceof Error ? error.message : "An error occurred");
// //       }
// //     };

// //     fetchUserTasks();
// //   }, []);

// //   const handleViewTask = (e: React.MouseEvent<HTMLDivElement>, activeTask: ITask) => {
// //     e.stopPropagation();
// //     setIsViewTask(true);
// //     setSelectedTask(activeTask);
// //   };

// //   const sortByPriority = (tasksList: ITask[], isAsc: boolean): ITask[] => {
// //     const priorityOrder: { [key: string]: number } = {
// //       low: 1,
// //       medium: 2,
// //       high: 3,
// //     };

// //     return [...tasksList].sort((a, b) => {
// //       const priorityA = priorityOrder[a.priority!.toLowerCase()];
// //       const priorityB = priorityOrder[b.priority!.toLowerCase()];
// //       return isAsc ? priorityA - priorityB : priorityB - priorityA;
// //     });
// //   };

// //   const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const selectedOption = e.target.value;
// //     const doneTasks = tasks.filter((task) => task.done);
// //     switch (selectedOption) {
// //       case "priority - (low - high)":
// //       case "priority - (high - low)": {
// //         const isAsc = selectedOption === "priority - (low - high)";
// //         const sortedTasks = sortByPriority(tasks, isAsc);
// //         setTasks([...doneTasks, ...sortedTasks.filter((task) => !task.done)]);
// //         break;
// //       }
// //       case "due date - (earliest - latest)":
// //       case "due date - (latest - earliest)": {
// //         const isEarliestToLatest = selectedOption === "due date - (earliest - latest)";
// //         const dueDateResult = await sortTasksByDueDate(isEarliestToLatest);
// //         if (dueDateResult.success && dueDateResult.tasks) {
// //           const sortedTasks = dueDateResult.tasks as ITask[];
// //           setTasks([...doneTasks, ...sortedTasks.filter((task) => !task.done)]);
// //         } else {
// //           setTasksError(dueDateResult.message || "Failed to sort tasks by due date");
// //         }
// //         break;
// //       }
// //       default:
// //         break;
// //     }
// //   };

// //   const selectArray = [
// //     "priority - (low - high)",
// //     "priority - (high - low)",
// //     "due date - (earliest - latest)",
// //     "due date - (latest - earliest)",
// //   ];

// //   return (
// //     <main className="container mx-auto">
// //       <section className="max-w-5xl mx-auto m-12 p-16">
// //         {isViewTask && selectedTask && (
// //           <Dialog key={selectedTask.id} setIsViewTask={setIsViewTask}>
// //             <TaskItem
// //               task={selectedTask}
// //               handleViewTask={(e) => handleViewTask(e, selectedTask!)}
// //               isViewTask={isViewTask}
// //             />
// //           </Dialog>
// //         )}
// //         <h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
// //           Your Tasks
// //         </h1>
// //         <div className="m-8 flex flex-col-reverse md:flex-row gap-8 items-start md:items-center md:justify-between">
// //           <Search />
// //           <Button
// //             handleClick={() => navigate("/dashboard/createTask")}
// //             extraBtnClasses="bg-primary text-white font-medium py-2 hover:bg-primaryHover ml-auto"
// //             content={{
// //               text: "Add Task",
// //               icon: PlusIcon,
// //             }}
// //           />
// //         </div>
// //         {tasksError ? (
// //           <span className="m-8 text-error">{tasksError}</span>
// //         ) : (
// //           <div className="flex flex-col md:flex-row justify-between">
// //             <div className="flex-1">
// //               <h3 className="text-2xl font-bold m-8">Pending Tasks</h3>
// //               <div className="m-8 flex items-start lg:items-center gap-1 justify-between flex-col lg:flex-row">
// //                 <span className="font-medium">Sort Tasks by: </span>
// //                 <Select
// //                   defaultSelectValue={selectArray[0]}
// //                   handleSelectChange={handleSelectChange}
// //                   selectOptions={selectArray}
// //                 />
// //               </div>
// //               <div>
// //                 {tasks
// //                   .filter((task) => !task.done)
// //                   .map((task) => (
// //                     <TaskItem
// //                       key={task.$id}
// //                       task={task}
// //                       setTasks={setTasks}
// //                       handleViewTask={(e) => handleViewTask(e, task)}
// //                       isViewTask={isViewTask}
// //                     />
// //                   ))}
// //               </div>
// //             </div>
// //             <div className="flex-1">
// //               <h3 className="text-2xl font-bold m-8">Completed Tasks</h3>
// //               <div>
// //                 {tasks
// //                   .filter((task) => task.done)
// //                   .map((task) => (
// //                     <TaskItem
// //                       key={task.$id}
// //                       task={task}
// //                       setTasks={setTasks}
// //                       handleViewTask={(e) => handleViewTask(e, task)}
// //                       isViewTask={isViewTask}
// //                     />
// //                   ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </section>
// //     </main>
// //   );
// // };

// // export default Task;





// import { useEffect, useState } from "react";
// import { ITask } from "../models/interface";
// import TaskItem from "../components/TaskItem";
// import Dialog from "../components/Dialog";
// import Search from "../components/Search";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import Button from "../components/Button";
// import { useNavigate } from "react-router-dom";
// import Select from "../components/Select";
// import { sortTasksByDueDate, getTasksByUser } from "../utils/db";
// import { getCurrentUser } from "../auth/auth"; // Import function to get the logged-in user

// const Task = () => {
//   const [isViewTask, setIsViewTask] = useState(false);
//   const [selectedTask, setSelectedTask] = useState<ITask | undefined>(undefined);
//   const [tasks, setTasks] = useState<ITask[]>([]);
//   const [tasksError, setTasksError] = useState<string>("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserTasks = async () => {
//       try {
//         const response = await getCurrentUser();
//         if (response.success && response.user) {
//           const user = response.user;
//           const tasksResponse = await getTasksByUser(user.$id);
//           if (tasksResponse.success && tasksResponse.tasks) {
//             const mappedTasks: ITask[] = tasksResponse.tasks.map((task) => ({
//               $id: task.$id,
//               $collectionId: task.$collectionId,
//               $databaseId: task.$databaseId,
//               $createdAt: task.$createdAt,
//               $updatedAt: task.$updatedAt,
//               $permissions: task.$permissions,
//               title: task.title,
//               description: task.description,
//               due_date: new Date(task.due_date),
//               priority: task.priority,
//               done: task.done,
//               userId: task.userId,
//             }));
//             setTasks(mappedTasks);
//           } else {
//             setTasksError(tasksResponse.message || "Failed to fetch tasks");
//           }
//         } else {
//           setTasksError(response.message || "User not found");
//         }
//       } catch (error) {
//         setTasksError(error instanceof Error ? error.message : "An error occurred");
//       }
//     };

//     fetchUserTasks();
//   }, []);

//   const handleViewTask = (e: React.MouseEvent<HTMLDivElement>, activeTask: ITask) => {
//     e.stopPropagation();
//     setIsViewTask(true);
//     setSelectedTask(activeTask);
//   };

//   const sortByPriority = (tasksList: ITask[], isAsc: boolean): ITask[] => {
//     const priorityOrder: { [key: string]: number } = {
//       low: 1,
//       medium: 2,
//       high: 3,
//     };

//     return [...tasksList].sort((a, b) => {
//       const priorityA = priorityOrder[a.priority!.toLowerCase()];
//       const priorityB = priorityOrder[b.priority!.toLowerCase()];
//       return isAsc ? priorityA - priorityB : priorityB - priorityA;
//     });
//   };

//   const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedOption = e.target.value;
//     const doneTasks = tasks.filter((task) => task.done);
//     switch (selectedOption) {
//       case "priority - (low - high)":
//       case "priority - (high - low)": {
//         const isAsc = selectedOption === "priority - (low - high)";
//         const sortedTasks = sortByPriority(tasks, isAsc);
//         setTasks([...doneTasks, ...sortedTasks.filter((task) => !task.done)]);
//         break;
//       }
//       case "due date - (earliest - latest)":
//       case "due date - (latest - earliest)": {
//         const isEarliestToLatest = selectedOption === "due date - (earliest - latest)";
//         const dueDateResult = await sortTasksByDueDate(isEarliestToLatest);
//         if (dueDateResult.success && dueDateResult.tasks) {
//           const sortedTasks = dueDateResult.tasks as ITask[];
//           setTasks([...doneTasks, ...sortedTasks.filter((task) => !task.done)]);
//         } else {
//           setTasksError(dueDateResult.message || "Failed to sort tasks by due date");
//         }
//         break;
//       }
//       default:
//         break;
//     }
//   };

//   const selectArray = [
//     "priority - (low - high)",
//     "priority - (high - low)",
//     "due date - (earliest - latest)",
//     "due date - (latest - earliest)",
//   ];

//   return (
//     <main className="container mx-auto">
//       <section className="max-w-5xl mx-auto m-12 p-16">
//         {isViewTask && selectedTask && (
//           <Dialog key={selectedTask.$id} setIsViewTask={setIsViewTask}>
//             <TaskItem
//               task={selectedTask}
//               handleViewTask={(e) => handleViewTask(e, selectedTask!)}
//               isViewTask={isViewTask}
//             />
//           </Dialog>
//         )}
//         <h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
//           Your Tasks
//         </h1>
//         <div className="m-8 flex flex-col-reverse md:flex-row gap-8 items-start md:items-center md:justify-between">
//           <Search />
//           <Button
//             handleClick={() => navigate("/dashboard/createTask")}
//             extraBtnClasses="bg-primary text-white font-medium py-2 hover:bg-primaryHover ml-auto"
//             content={{
//               text: "Add Task",
//               icon: PlusIcon,
//             }}
//           />
//         </div>
//         {tasksError ? (
//           <span className="m-8 text-error">{tasksError}</span>
//         ) : (
//           <div className="flex flex-col md:flex-row justify-between">
//             <div className="flex-1">
//               <h3 className="text-2xl font-bold m-8">Pending Tasks</h3>
//               <div className="m-8 flex items-start lg:items-center gap-1 justify-between flex-col lg:flex-row">
//                 <span className="font-medium">Sort Tasks by: </span>
//                 <Select
//                   defaultSelectValue={selectArray[0]}
//                   handleSelectChange={handleSelectChange}
//                   selectOptions={selectArray}
//                 />
//               </div>
//               <div>
//                 {tasks
//                   .filter((task) => !task.done)
//                   .map((task) => (
//                     <TaskItem
//                       key={task.$id}  
//                       task={task}
//                       setTasks={setTasks}
//                       handleViewTask={(e) => handleViewTask(e, task)}
//                       isViewTask={isViewTask}
//                     />
//                   ))}
//               </div>
//             </div>
//             <div className="flex-1">
//               <h3 className="text-2xl font-bold m-8">Completed Tasks</h3>
//               <div>
//                 {tasks
//                   .filter((task) => task.done)
//                   .map((task) => (
//                     <TaskItem
//                       key={task.$id}  
//                       task={task}
//                       setTasks={setTasks}
//                       handleViewTask={(e) => handleViewTask(e, task)}
//                       isViewTask={isViewTask}
//                     />
//                   ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// };

// export default Task;


// import { useEffect, useState } from "react";
// import { ITask } from "../models/interface";
// import TaskItem from "../components/TaskItem";
// import Dialog from "../components/Dialog";
// import Search from "../components/Search";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import Button from "../components/Button";
// import { useNavigate } from "react-router-dom";
// import Select from "../components/Select";
// import { sortTasksByDueDate, getTasksByUser } from "../utils/db";
// import { getCurrentUser } from "../auth/auth"; // Import function to get the logged-in user

// const Task = () => {
//   const [isViewTask, setIsViewTask] = useState(false);
//   const [selectedTask, setSelectedTask] = useState<ITask | undefined>(undefined);
//   const [tasks, setTasks] = useState<ITask[]>([]);
//   const [tasksError, setTasksError] = useState<string>("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserTasks = async () => {
//       try {
//         const response = await getCurrentUser();
//         if (response.success && response.user) {
//           const user = response.user;
//           const tasksResponse = await getTasksByUser(user.$id);
//           if (tasksResponse.success && tasksResponse.tasks) {
//             const mappedTasks: ITask[] = tasksResponse.tasks.map((task) => ({
//               $id: task.$id,
//               $collectionId: task.$collectionId,
//               $databaseId: task.$databaseId,
//               $createdAt: task.$createdAt,
//               $updatedAt: task.$updatedAt,
//               $permissions: task.$permissions,
//               title: task.title,
//               description: task.description,
//               due_date: new Date(task.due_date),
//               priority: task.priority,
//               done: task.done,
//               userId: task.userId,
//             }));
//             setTasks(mappedTasks);
//           } else {
//             setTasksError(tasksResponse.message || "Failed to fetch tasks");
//           }
//         } else {
//           setTasksError(response.message || "User not found");
//         }
//       } catch (error) {
//         setTasksError(error instanceof Error ? error.message : "An error occurred");
//       }
//     };

//     fetchUserTasks();
//   }, []);

//   const handleViewTask = (e: React.MouseEvent<HTMLDivElement>, activeTask: ITask) => {
//     e.stopPropagation();
//     setIsViewTask(true);
//     setSelectedTask(activeTask);
//   };

//   const sortByPriority = (tasksList: ITask[], isAsc: boolean): ITask[] => {
//     const priorityOrder: { [key: string]: number } = {
//       low: 1,
//       medium: 2,
//       high: 3,
//     };

//     return [...tasksList].sort((a, b) => {
//       const priorityA = priorityOrder[a.priority!.toLowerCase()];
//       const priorityB = priorityOrder[b.priority!.toLowerCase()];
//       return isAsc ? priorityA - priorityB : priorityB - priorityA;
//     });
//   };

//   const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedOption = e.target.value;
//     const doneTasks = tasks.filter((task) => task.done);
//     switch (selectedOption) {
//       case "priority - (low - high)":
//       case "priority - (high - low)": {
//         const isAsc = selectedOption === "priority - (low - high)";
//         const sortedTasks = sortByPriority(tasks, isAsc);
//         setTasks([...doneTasks, ...sortedTasks.filter((task) => !task.done)]);
//         break;
//       }
//       case "due date - (earliest - latest)":
//       case "due date - (latest - earliest)": {
//         const isEarliestToLatest = selectedOption === "due date - (earliest - latest)";
//         const dueDateResult = await sortTasksByDueDate(isEarliestToLatest);
//         if (dueDateResult.success && dueDateResult.tasks) {
//           const sortedTasks = dueDateResult.tasks as ITask[];
//           setTasks([...doneTasks, ...sortedTasks.filter((task) => !task.done)]);
//         } else {
//           setTasksError(dueDateResult.message || "Failed to sort tasks by due date");
//         }
//         break;
//       }
//       default:
//         break;
//     }
//   };

//   const selectArray = [
//     "priority - (low - high)",
//     "priority - (high - low)",
//     "due date - (earliest - latest)",
//     "due date - (latest - earliest)",
//   ];

//   return (
//     <main className="container mx-auto">
//       <section className="max-w-5xl mx-auto m-12 p-16">
//         {isViewTask && selectedTask && (
//           <Dialog key={selectedTask.id} setIsViewTask={setIsViewTask}>
//             <TaskItem
//               task={selectedTask}
//               handleViewTask={(e) => handleViewTask(e, selectedTask!)}
//               isViewTask={isViewTask}
//             />
//           </Dialog>
//         )}
//         <h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
//           Your Tasks
//         </h1>
//         <div className="m-8 flex flex-col-reverse md:flex-row gap-8 items-start md:items-center md:justify-between">
//           <Search />
//           <Button
//             handleClick={() => navigate("/dashboard/createTask")}
//             extraBtnClasses="bg-primary text-white font-medium py-2 hover:bg-primaryHover ml-auto"
//             content={{
//               text: "Add Task",
//               icon: PlusIcon,
//             }}
//           />
//         </div>
//         {tasksError ? (
//           <span className="m-8 text-error">{tasksError}</span>
//         ) : (
//           <div className="flex flex-col md:flex-row justify-between">
//             <div className="flex-1">
//               <h3 className="text-2xl font-bold m-8">Pending Tasks</h3>
//               <div className="m-8 flex items-start lg:items-center gap-1 justify-between flex-col lg:flex-row">
//                 <span className="font-medium">Sort Tasks by: </span>
//                 <Select
//                   defaultSelectValue={selectArray[0]}
//                   handleSelectChange={handleSelectChange}
//                   selectOptions={selectArray}
//                 />
//               </div>
//               <div>
//                 {tasks
//                   .filter((task) => !task.done)
//                   .map((task) => (
//                     <TaskItem
//                       key={task.$id}
//                       task={task}
//                       setTasks={setTasks}
//                       handleViewTask={(e) => handleViewTask(e, task)}
//                       isViewTask={isViewTask}
//                     />
//                   ))}
//               </div>
//             </div>
//             <div className="flex-1">
//               <h3 className="text-2xl font-bold m-8">Completed Tasks</h3>
//               <div>
//                 {tasks
//                   .filter((task) => task.done) 
//                   // Ensure you're filtering based on the `done` field
//                   .map((task) => (
//                     <TaskItem
//                       key={task.$id}
//                       task={task}
//                       setTasks={setTasks}
//                       handleViewTask={(e) => handleViewTask(e, task)}
//                       isViewTask={isViewTask}
//                     />
                    
//                   ))}
                  
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// };

// export default Task;



////////////////////////////
import { useEffect, useState } from "react";
import { ITask } from "../models/interface";
import TaskItem from "../components/TaskItem";
import Dialog from "../components/Dialog";
import Search from "../components/Search";
import { PlusIcon } from "@heroicons/react/24/solid";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import { sortTasksByDueDate, getTasksByUser } from "../utils/db";
import { getCurrentUser } from "../auth/auth"; // Import function to get the logged-in user

const Task = () => {
  const [isViewTask, setIsViewTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>(undefined);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksError, setTasksError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success && response.user) {
          const user = response.user;
          const tasksResponse = await getTasksByUser(user.$id);
          if (tasksResponse.success && tasksResponse.tasks) {
            const mappedTasks: ITask[] = tasksResponse.tasks.map((task) => ({
              $id: task.$id,
              $collectionId: task.$collectionId,
              $databaseId: task.$databaseId,
              $createdAt: task.$createdAt,
              $updatedAt: task.$updatedAt,
              $permissions: task.$permissions,
              title: task.title,
              description: task.description,
              due_date: new Date(task.due_date),
              priority: task.priority,
              done: task.done, // Ensure done field is being set
              userId: task.userId,
            }));
            setTasks(mappedTasks);
          } else {
            setTasksError(tasksResponse.message || "Failed to fetch tasks");
          }
        } else {
          setTasksError(response.message || "User not found");
        }
      } catch (error) {
        setTasksError(error instanceof Error ? error.message : "An error occurred");
      }
    };

    fetchUserTasks();
  }, []);

  const handleViewTask = (e: React.MouseEvent<HTMLDivElement>, activeTask: ITask) => {
    e.stopPropagation();
    setIsViewTask(true);
    setSelectedTask(activeTask);
  };

  const sortByPriority = (tasksList: ITask[], isAsc: boolean): ITask[] => {
    const priorityOrder: { [key: string]: number } = {
      low: 1,
      medium: 2,
      high: 3,
    };

    return [...tasksList].sort((a, b) => {
      const priorityA = priorityOrder[a.priority!.toLowerCase()];
      const priorityB = priorityOrder[b.priority!.toLowerCase()];
      return isAsc ? priorityA - priorityB : priorityB - priorityA;
    });
  };

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    const doneTasks = tasks.filter((task) => task.done);
    switch (selectedOption) {
      case "priority - (low - high)":
      case "priority - (high - low)":
        const isAsc = selectedOption === "priority - (low - high)";
        const sortedTasks = sortByPriority(tasks, isAsc);
        setTasks([...doneTasks, ...sortedTasks.filter((task) => !task.done)]);
        break;
      case "due date - (earliest - latest)":
      case "due date - (latest - earliest)":
        const isEarliestToLatest = selectedOption === "due date - (earliest - latest)";
        const dueDateResult = await sortTasksByDueDate(isEarliestToLatest);
        if (dueDateResult.success && dueDateResult.tasks) {
          const sortedTasks = dueDateResult.tasks as ITask[];
          setTasks([...doneTasks, ...sortedTasks.filter((task) => !task.done)]);
        } else {
          setTasksError(dueDateResult.message || "Failed to sort tasks by due date");
        }
        break;
      default:
        break;
    }
  };

  const selectArray = [
    "priority - (low - high)",
    "priority - (high - low)",
    "due date - (earliest - latest)",
    "due date - (latest - earliest)",
  ];

  return (
    <main className="container mx-auto">
      <section className="max-w-5xl mx-auto m-12 p-16">
        {isViewTask && selectedTask && (
          <Dialog key={selectedTask.id} setIsViewTask={setIsViewTask}>
            <TaskItem
              task={selectedTask}
              handleViewTask={(e) => handleViewTask(e, selectedTask!)}
              isViewTask={isViewTask}
            />
          </Dialog>
        )}
        <h1 className="text-4xl md:text-7xl font-bold text-center py-3 mb-16">
          Your Tasks
        </h1>
        <div className="m-8 flex flex-col-reverse md:flex-row gap-8 items-start md:items-center md:justify-between">
          <Search />
          <Button
            handleClick={() => navigate("/dashboard/createTask")}
            extraBtnClasses="bg-primary text-white font-medium py-2 hover:bg-primaryHover ml-auto"
            content={{
              text: "Add Task",
              icon: PlusIcon,
            }}
          />
        </div>
        {tasksError ? (
          <span className="m-8 text-error">{tasksError}</span>
        ) : (
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold m-8">Pending Tasks</h3>
              <div className="m-8 flex items-start lg:items-center gap-1 justify-between flex-col lg:flex-row">
                <span className="font-medium">Sort Tasks by: </span>
                <Select
                  defaultSelectValue={selectArray[0]}
                  handleSelectChange={handleSelectChange}
                  selectOptions={selectArray}
                />
              </div>
              <div>
                {tasks
                  .filter((task) => !task.done) // Ensure we're correctly filtering for pending tasks
                  .map((task) => (
                    <TaskItem
                      key={task.$id}
                      task={task}
                      setTasks={setTasks}
                      handleViewTask={(e) => handleViewTask(e, task)}
                      isViewTask={isViewTask}
                    />
                  ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold m-8">Completed Tasks</h3>
              <div>
                {tasks
                  .filter((task) => task.done) // Ensure we're correctly filtering for completed tasks
                  .map((task) => (
                    <TaskItem
                      key={task.$id}
                      task={task}
                      setTasks={setTasks}
                      handleViewTask={(e) => handleViewTask(e, task)}
                      isViewTask={isViewTask}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Task;
