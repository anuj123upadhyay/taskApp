// import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
// import { IPayload, ITask } from "../models/interface";
// import Button from "./Button";
// import { useState } from "react";
// import { deleteTask, updateTask } from "../utils/db";
// import getTasks from "../utils/shared";
// import { useNavigate } from "react-router-dom";


// interface TaskItemProps {
//     task: ITask;
//     setTasks?:(tasks:ITask[])=> void;
//     isViewTask:boolean;
//     handleViewTask?:(e:React.MouseEvent<HTMLDivElement>, activeTask:ITask)=> void;
// }


// const TaskItem = ({task, setTasks, isViewTask= false, handleViewTask} : TaskItemProps) => {
//     const [isDone, setIsDone] = useState(false);
//     const navigate = useNavigate();
// const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>,currentTaskId : string)=>{
//     e.stopPropagation();
//     try {
//         await deleteTask(currentTaskId);
//         if(isViewTask){
//             navigate(0);
//         }else{

//             updateTask();
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

// const handleCheckbox = async (
//     currentTask:IPayload,
//     id:string,
//     e:React.ChangeEvent<HTMLInputElement>
// )=>{
//     const checkedVal = e.target.checked;
//     if(!checkedVal) return;
//     const payload:IPayload={
//         title:currentTask.title,
//         description:currentTask.description,
//         due_date:currentTask.due_date,
//         priority:currentTask.priority,
//         done:checkedVal,
//     };
//     try {
//         await updateTask(payload,id);
//         updateTask();
//     } catch (error) {
//         console.error(error);
        
//     }
// };

// const updateTask = async ()=>{
//     try {
//         const allTasks = await getTasks();
//         if(setTasks){
//             setTasks(allTasks.reverse());
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

// const handleEdit = async (currentTask : ITask)=>{
//     navigate("/", { state : {task: currentTask}})
// }

//   return (
//     <>
//        <div
//   className="m-8 cursor-pointer border border-container rounded-md p-4 hover:shadow-lg transition duration-300 ease-in-out max-h-96"
//   onClick={(e) => handleViewTask &&  handleViewTask(e, task)}
// >
//             <section
//             key={task.$id}
//             className="flex flex-col justify-between gap-2 my-4 h-full"
//             >
//             <section className="flex gap-4 items-center justify-between flex-wrap">
//                 {task.priority && (
//                 <span>
//                     <span className="font-medium">Priority: </span>
//                         <span
//                             className={`${
//                             task.priority === "low"
//                             ? "bg-lowPriority text-iconColor"
//                             : task.priority === "medium"
//                             ? "bg-mediumPriority text-iconColor"
//                             : "bg-highPriority text-iconColor"
//                             } py-1 px-2 rounded-md`}
//                         >
//                             {task.priority}
//                         </span>
//                 </span>
//                 )}
//                 <div className="flex gap-2 py-1 ml-auto">
//                     {!task.done && (<Button
//                         handleClick={() => handleEdit(task)}
//                         extraBtnClasses="bg-ok"
//                         content={{
//                             text:"Edit",
//                             icon:PencilSquareIcon,
//                         }}
//                     >
//                         {/* <span className="font-medium">Edit</span>
//                         <PencilSquareIcon height={25} className="hidden lg:flex" /> */}
//                     </Button>)}
                    
//                     <Button
//                         handleClick={(e) => handleDelete(e,task.$id)}
//                         extraBtnClasses="bg-highPriority"
//                         content={{
//                             text:"Delete",
//                             icon:TrashIcon
//                         }}
//                     >
//                         {/* <span className="font-medium">Delete</span>
//                         <TrashIcon height={25} className="hidden lg:flex" /> */}
//                     </Button>
//                 </div>
//             </section>
//             <section className="">
//                 <h2 className="text-xl font-medium py-2 break-words">
//                     {task.title}
//                 </h2>
//                 <p className="py-1 mb-4 min-h-16 break-words">
//                     {task.description.length > 70 && !isViewTask
//                         ? task.description.substring(0, 70) + "..."
//                         : task.description}
//                 </p>
//                 <span className="font-extralight mt-2">
//                     <span className="font-medium">Due on: </span>
//                         <span className="underline">{`${new Date(
//                             task.due_date
//                         ).toLocaleDateString()}`}
//                     </span>
//                 </span>
//                 </section>
//                 <section className="flex justify-between">
//                     {task.done ? (
//                         <span className="items-center text-ok font-bol ml-auto">
//                             Completed
//                         </span>
//                     ) : (
//                     <div className="flex items-center ml-auto hover:scale-105 transition duration-300 ease-in-out">
//                         <label htmlFor="done" className="mr-2 font-light">
//                             Mark as complete
//                         </label>
//                         <input
//                             type="checkbox"
//                             checked={isDone}
//                             onClick={(e) => e.stopPropagation()}
//                             onChange={(e) => {
//                             setIsDone(e.target.checked);
//                             handleCheckbox(task, task.$id, e);
//                         }}
//                             className="size-5 accent-pink-600 rounded-sm"
//                     />
//                 </div>
//                 )}
//                 </section>
//             </section>
//         </div>
//     </>
//   )
// }

// export default TaskItem


import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IPayload, ITask } from "../models/interface";
import Button from "./Button";
import { useState } from "react";
import { deleteTask, updateTask } from "../utils/db";
import getTasks from "../utils/shared";
import { useNavigate } from "react-router-dom";

interface TaskItemProps {
  task: ITask;
  setTasks?: (tasks: ITask[]) => void;
  isViewTask: boolean;
  handleViewTask?: (e: React.MouseEvent<HTMLDivElement>, activeTask: ITask) => void;
}

const TaskItem = ({ task, setTasks, isViewTask = false, handleViewTask }: TaskItemProps) => {
  const [isDone, setIsDone] = useState(task.done || false);
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, currentTaskId: string) => {
    e.stopPropagation();
    try {
      await deleteTask(currentTaskId);
      if (isViewTask) {
        navigate(0); // Refresh the page
      } else {
        updateTaskList();
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleCheckbox = async (currentTask: IPayload, id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedVal = e.target.checked;
    if (!checkedVal) return; // Only update task if it's checked

    const payload: IPayload = {
      title: currentTask.title,
      description: currentTask.description,
      due_date: currentTask.due_date,
      priority: currentTask.priority,
      done: checkedVal,
    };

    try {
      await updateTask(id,payload);
      updateTaskList();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const updateTaskList = async () => {
    try {
      const allTasks = await getTasks();
      if (setTasks) {
        setTasks(allTasks.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleEdit = (currentTask: ITask) => {
    navigate("/", { state: { task: currentTask } });
  };

  return (
    <div
      className="m-8 cursor-pointer border border-container rounded-md p-4 hover:shadow-lg transition duration-300 ease-in-out max-h-96"
      onClick={(e) => handleViewTask && handleViewTask(e, task)}
    >
      <section key={task.$id} className="flex flex-col justify-between gap-2 my-4 h-full">
        <section className="flex gap-4 items-center justify-between flex-wrap">
          {task.priority && (
            <span>
              <span className="font-medium">Priority: </span>
              <span
                className={`${
                  task.priority === "low"
                    ? "bg-lowPriority text-iconColor"
                    : task.priority === "medium"
                    ? "bg-mediumPriority text-iconColor"
                    : "bg-highPriority text-iconColor"
                } py-1 px-2 rounded-md`}
              >
                {task.priority}
              </span>
            </span>
          )}
          <div className="flex gap-2 py-1 ml-auto">
            {!task.done && (
              <Button
                handleClick={() => handleEdit(task)}
                extraBtnClasses="bg-ok"
                content={{
                  text: "Edit",
                  icon: PencilSquareIcon,
                }}
              />
            )}

            <Button
              handleClick={(e) => handleDelete(e, task.$id)}
              extraBtnClasses="bg-highPriority"
              content={{
                text: "Delete",
                icon: TrashIcon,
              }}
            />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-medium py-2 break-words">{task.title}</h2>
          <p className="py-1 mb-4 min-h-16 break-words">
            {task.description.length > 70 && !isViewTask
              ? task.description.substring(0, 70) + "..."
              : task.description}
          </p>
          <span className="font-extralight mt-2">
            <span className="font-medium">Due on: </span>
            <span className="underline">{`${new Date(task.due_date).toLocaleDateString()}`}</span>
          </span>
        </section>
        <section className="flex justify-between">
          {task.done ? (
            <span className="items-center text-ok font-bold ml-auto">Completed</span>
          ) : (
            <div className="flex items-center ml-auto hover:scale-105 transition duration-300 ease-in-out">
              <label htmlFor="done" className="mr-2 font-light">Mark as complete</label>
              <input
                type="checkbox"
                checked={isDone}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  setIsDone(e.target.checked);
                  handleCheckbox(task, task.$id, e);
                }}
                className="size-5 accent-pink-600 rounded-sm"
              />
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default TaskItem;