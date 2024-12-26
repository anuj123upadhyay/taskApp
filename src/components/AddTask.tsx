// import React, { useEffect, useState } from "react";
// import Select from "./Select";
// import Button from "./Button";
// import { Link, useNavigate } from "react-router-dom";
// import { createTask, updateTask } from "../utils/db";
// import { IPayload, ITask } from "../models/interface";
// import getTasks from "../utils/shared";
// import { SparklesIcon } from "@heroicons/react/24/solid";
// import { callAI } from "../utils/ai";
// import Speaker from "./Speaker";
// import { useSpeechToTextHelper } from "../hooks/useSpeechToTextHelper";
// import { getCurrentUser } from "../auth/auth";
// interface ITaskFormProps {
//   task: ITask | null;
//   isEdit?: boolean;
//   setTasks?: (tasks: ITask[]) => void;
// }

// const AddTask = ({ task, isEdit, setTasks }: ITaskFormProps) => {
//   const [titleVal, setTitleVal] = useState("");
//   const [textAreaVal, setTextAreaVal] = useState("");
//   const [dueDate, setDueDate] = useState(
//     isEdit && task?.due_date ? new Date(task.due_date) : new Date()
//   );

//   const priorityArray = ["low", "medium", "high"];
//   const [priority, setPriority] = useState(
//     isEdit && task?.priority ? task?.priority : priorityArray[0]
//   );

//   const navigate = useNavigate();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [titleValidationError, setTitleValidationError] = useState("");

//   const [isGenerating, setIsGenerating] = useState(false);

//   const { transcript, resetTranscript } = useSpeechToTextHelper();

//   useEffect(() => {
//     if (isEdit && task && !transcript) {
//       setTitleVal(task.title);
//       setTextAreaVal(task.description);
//     } else {
//       setTitleVal(transcript || "");
//     }
//   }, [isEdit, task, transcript]);

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTitleVal(e.target.value);
//     if (e.target.value.trim() !== "") {
//       setTitleValidationError("");
//     }
//   };

//   const clearTranscript = () => {
//     resetTranscript();
//   };

//   const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       if (!titleVal) {
//         setTitleValidationError("Please provide at least a title for the task");
//         setTimeout(() => setTitleValidationError(""), 2000);
//         setIsSubmitting(false);
//         return;
//       }

//       if (titleVal.length > 49) {
//         setTitleValidationError("Title too long. It can only be 49 characters long");
//         setTimeout(() => setTitleValidationError(""), 2000);
//         setIsSubmitting(false);
//         return;
//       }

//       const payload: IPayload = {
//         title: titleVal,
//         description: textAreaVal,
//         due_date: dueDate,
//         priority: priority,
        
//       };

//       if (isEdit && task) {
//         await updateTask(task.$id, payload);
//       } else {
//         const user = await getCurrentUser();
//         if (user.user && user.user.$id) {
//           await createTask(payload, user.user.$id);
//         } else {
//           throw new Error("User not found");
//         }
//       }

//       const allTasks = await getTasks();
//       if (setTasks) {
//         setTasks(allTasks.reverse());
//       }

//       // Reset form
//       setTitleVal("");
//       setTextAreaVal("");
//       setDueDate(new Date());
//       setPriority(priorityArray[0]);
//       setTitleValidationError("");
//       setIsSubmitting(false);
//       navigate("/tasks");
//     } catch (error) {
//       console.log("Error in handleSubmitTask", error);
//       setIsSubmitting(false);
//     }
//   };

//   const generateDesc = async () => {
//     if (!titleVal.trim()) {
//       alert("Please provide a title for the task");
//       return;
//     }

//     setIsGenerating(true);
//     setTextAreaVal("");

//     const prompt = `Write a brief, single-sentence description for: ${titleVal}. Must be under 35 words for my task description of my TaskApp.`;

//     try {
//       const response = await callAI(prompt);
//       console.log(prompt);
//       const cleanedResponse = response
//         .replace(/^.*?(Write a brief|single-sentence description for:.*?words\.?\s*)/i, '')
//         .replace(/^(Here'?s?|I'?ll|Let me|This is|A brief|The task|Task description:|Description:|Brief:|Summary:)/i, '')
//         .replace(/^.*?(You can answer|The user works|First think| Must be under 35 words for my task description of my TaskApp.)/i, '')
//         .trim();
//       cleanedResponse.split("").forEach((char, index) => {
//         setTimeout(() => {
//           setTextAreaVal((prev) => prev + char);
//         }, index * 32);
//       });
//     } catch (error) {
//       console.error("ERROR HUGGING FACE API:", error);
//       setTextAreaVal("Failed to generate description. Please try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <form id="form" onSubmit={handleSubmitTask} className="m-8">
//       <div className="flex flex-col mb-6">
//         <div className="flex flex-row justify-between items-center">
//           <label htmlFor="title">Task Title</label>
//           <Speaker handleClear={clearTranscript} />
//         </div>
//         <input
//           type="text"
//           id="title"
//           placeholder="Title of your task"
//           value={titleVal}
//           onChange={handleTitleChange}
//           className={`bg-inherit border rounded-sm p-2 focus:outline-none focus:ring-1 ${
//             titleValidationError
//               ? "border-error focus:ring-red-500 invalid:focus:ring-red-600"
//               : "border-input focus:ring-slate-900"
//           }`}
//         />
//         {titleValidationError && (
//           <span className="text-error mt-1">{titleValidationError}</span>
//         )}
//       </div>
//       <div className="flex flex-col mb-6">
//         <label htmlFor="description" className="mb-1">
//           Task Description
//         </label>
//         <textarea
//           id="description"
//           placeholder="Describe your task"
//           maxLength={200}
//           value={isGenerating ? "generating..." : textAreaVal}
//           onChange={(e) => setTextAreaVal(e.target.value)}
//           className={`bg-inherit border rounded-sm p-2 h-32 resize-none focus:outline-none focus:ring-1 ${
//             textAreaVal.length > 197
//               ? "border-error focus:ring-red-500 invalid:focus:ring-red-600"
//               : "border-input focus:ring-slate-900"
//           }`}
//         />
//         {textAreaVal.length > 197 && (
//           <span className="text-error mt-1">
//             Warning description getting too long. Can only be 200 characters
//           </span>
//         )}
//         <Button
//           handleClick={generateDesc}
//           disable={isGenerating}
//           extraBtnClasses="bg-light mt-2 w-fit ml-auto"
//           content={{
//             text: "Generate description",
//             icon: SparklesIcon,
//           }}
//         />
//       </div>
//       <div className="flex flex-col mb-6">
//         <label htmlFor="description" className="mb-1">
//           Task Priority
//         </label>
//         <Select
//           defaultSelectValue={priority}
//           selectOptions={priorityArray}
//           handleSelectChange={(e) => setPriority(e.target.value)}
//         />
//       </div>
//       <div className="flex flex-col mb-6">
//         <label htmlFor="description" className="mb-1">
//           Task Due Date
//         </label>
//         <input
//           type="date"
//           id="date"
//           value={dueDate!.toISOString().split("T")[0]}
//           min={new Date().toISOString().split("T")[0]}
//           onChange={(e) => setDueDate(new Date(e.target.value))}
//           className="bg-inherit border rounded-sm border-input p-2 focus:outline-none focus:ring-1 focus:ring-slate-900 invalid:focus:ring-red-600"
//         />
//       </div>
//       <Link to="/dashboard/tasks">
//       <Button
        
//         type="submit"
//         disable={isSubmitting}
//         extraBtnClasses="bg-primary justify-center text-white font-semibold px-4 py-2 outline-1 hover:bg-primaryHover focus:ring-1 focus:ring-pink-800 w-full"
//         content={{
//           text: isSubmitting ? "Submitting ..." : task ? "Edit Task" : "Add Task",
//         }}
//       />
//      </Link>
//     </form>
//   );
// };

// export default AddTask;


import React, { useEffect, useState } from "react";
import Select from "./Select";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { createTask, updateTask } from "../utils/db";
import { IPayload, ITask } from "../models/interface";
import getTasks from "../utils/shared";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { callAI } from "../utils/ai";
import Speaker from "./Speaker";
import { useSpeechToTextHelper } from "../hooks/useSpeechToTextHelper";
import { getCurrentUser } from "../auth/auth";

interface ITaskFormProps {
  task: ITask | null;
  isEdit?: boolean;
  setTasks?: (tasks: ITask[]) => void;
}

const AddTask = ({ task, isEdit, setTasks }: ITaskFormProps) => {
  const [titleVal, setTitleVal] = useState("");
  const [textAreaVal, setTextAreaVal] = useState("");
  const [dueDate, setDueDate] = useState(
    isEdit && task?.due_date ? new Date(task.due_date) : new Date()
  );

  const priorityArray = ["low", "medium", "high"];
  const [priority, setPriority] = useState(
    isEdit && task?.priority ? task?.priority : priorityArray[0]
  );

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleValidationError, setTitleValidationError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { transcript, resetTranscript } = useSpeechToTextHelper();

  useEffect(() => {
    if (isEdit && task && !transcript) {
      setTitleVal(task.title);
      setTextAreaVal(task.description);
    } else {
      setTitleVal(transcript || "");
    }
  }, [isEdit, task, transcript]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleVal(e.target.value);
    if (e.target.value.trim() !== "") {
      setTitleValidationError("");
    }
  };

  const clearTranscript = () => {
    resetTranscript();
  };

  const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!titleVal) {
        setTitleValidationError("Please provide at least a title for the task");
        setTimeout(() => setTitleValidationError(""), 2000);
        setIsSubmitting(false);
        return;
      }

      if (titleVal.length > 49) {
        setTitleValidationError("Title too long. It can only be 49 characters long");
        setTimeout(() => setTitleValidationError(""), 2000);
        setIsSubmitting(false);
        return;
      }

      const payload: IPayload = {
        title: titleVal,
        description: textAreaVal,
        due_date: dueDate,
        priority: priority,
      };

      if (isEdit && task) {
        await updateTask(task.$id, payload);
      } else {
        const user = await getCurrentUser();
        if (user.user && user.user.$id) {
          await createTask(payload, user.user.$id);
        } else {
          throw new Error("User not found");
        }
      }

      const allTasks = await getTasks();
      if (setTasks) {
        setTasks(allTasks.reverse());
      }

      // Reset form
      setTitleVal("");
      setTextAreaVal("");
      setDueDate(new Date());
      setPriority(priorityArray[0]);
      setTitleValidationError("");
      setIsSubmitting(false);
      navigate("/tasks"); // Redirect after form submission
    } catch (error) {
      console.log("Error in handleSubmitTask", error);
      setIsSubmitting(false);
    }
  };

  const generateDesc = async () => {
    if (!titleVal.trim()) {
      alert("Please provide a title for the task");
      return;
    }

    setIsGenerating(true);
    setTextAreaVal("");

    const prompt = `Write a brief, single-sentence description for: ${titleVal}. Must be under 35 words for my task description of my TaskApp.`;

    try {
      const response = await callAI(prompt);
      console.log(prompt);
      const cleanedResponse = response
        .replace(/^.*?(Write a brief|single-sentence description for:.*?words\.?\s*)/i, '')
        .replace(/^(Here'?s?|I'?ll|Let me|This is|A brief|The task|Task description:|Description:|Brief:|Summary:)/i, '')
        .replace(/^.*?(You can answer|The user works|First think| Must be under 35 words for my task description of my TaskApp.)/i, '')
        .trim();
      cleanedResponse.split("").forEach((char, index) => {
        setTimeout(() => {
          setTextAreaVal((prev) => prev + char);
        }, index * 32);
      });
    } catch (error) {
      console.error("ERROR HUGGING FACE API:", error);
      setTextAreaVal("Failed to generate description. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddTaskLink = () => {
  navigate("/dashboard/tasks");
  }

  return (
    <form id="form" onSubmit={handleSubmitTask} className="m-8">
      <div className="flex flex-col mb-6">
        <div className="flex flex-row justify-between items-center">
          <label htmlFor="title">Task Title</label>
          <Speaker handleClear={clearTranscript} />
        </div>
        <input
          type="text"
          id="title"
          placeholder="Title of your task"
          value={titleVal}
          onChange={handleTitleChange}
          className={`bg-inherit border rounded-sm p-2 focus:outline-none focus:ring-1 ${
            titleValidationError
              ? "border-error focus:ring-red-500 invalid:focus:ring-red-600"
              : "border-input focus:ring-slate-900"
          }`}
        />
        {titleValidationError && (
          <span className="text-error mt-1">{titleValidationError}</span>
        )}
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="description" className="mb-1">
          Task Description
        </label>
        <textarea
          id="description"
          placeholder="Describe your task"
          maxLength={200}
          value={isGenerating ? "generating..." : textAreaVal}
          onChange={(e) => setTextAreaVal(e.target.value)}
          className={`bg-inherit border rounded-sm p-2 h-32 resize-none focus:outline-none focus:ring-1 ${
            textAreaVal.length > 197
              ? "border-error focus:ring-red-500 invalid:focus:ring-red-600"
              : "border-input focus:ring-slate-900"
          }`}
        />
        {textAreaVal.length > 197 && (
          <span className="text-error mt-1">
            Warning description getting too long. Can only be 200 characters
          </span>
        )}
        <Button
          handleClick={generateDesc}
          disable={isGenerating}
          extraBtnClasses="bg-light mt-2 w-fit ml-auto"
          content={{
            text: "Generate description",
            icon: SparklesIcon,
          }}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="description" className="mb-1">
          Task Priority
        </label>
        <Select
          defaultSelectValue={priority}
          selectOptions={priorityArray}
          handleSelectChange={(e) => setPriority(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="description" className="mb-1">
          Task Due Date
        </label>
        <input
          type="date"
          id="date"
          value={dueDate!.toISOString().split("T")[0]}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDueDate(new Date(e.target.value))}
          className="bg-inherit border rounded-sm border-input p-2 focus:outline-none focus:ring-1 focus:ring-slate-900 invalid:focus:ring-red-600"
        />
      </div>
      <Button
        
        type="submit"
        disable={isSubmitting}
        handleClick={handleAddTaskLink}
        extraBtnClasses="bg-primary justify-center text-white font-semibold px-4 py-2 outline-1 hover:bg-primaryHover focus:ring-1 focus:ring-pink-800 w-full"
        content={{
          text: isSubmitting ? "Submitting ..." : task ? "Edit Task" : "Add Task",
        }}
      />
    </form>
  );
};

export default AddTask;
