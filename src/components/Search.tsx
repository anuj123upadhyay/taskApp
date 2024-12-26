import { FormEvent, useState } from "react";
import { ITask } from "../models/interface";
import Dialog from "./Dialog";
import TaskItem from "./TaskItem";
import Button from "./Button";
import { searchTasks } from "../utils/db";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchedTasks, setSearchedTasks] = useState<ITask[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm) {
      setError("Please enter a search term");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    setIsSearching(true);

    const res = await searchTasks(searchTerm);
    if (res.success && res.tasks) {
      const mappedTasks: ITask[] = res.tasks.map((task) => ({
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
        done: task.done,
        userId: task.userId,
      }));
      setSearchedTasks(mappedTasks);
    } else {
      setError(res.message || "No tasks found");
      setTimeout(() => {
        setSearchTerm("");
        setError("");
      }, 3000);
    }
    setIsSearching(false);
  };

  return (
    <div className="flex flex-col w-full md:w-1/2">
      <form
        className="flex flex-col md:flex-row items-start md:items-center gap-2"
        onSubmit={handleSubmit}
      >
        {searchedTasks.length > 0 && (
          <Dialog setSearchedTasks={setSearchedTasks}>
            {searchedTasks.map((task: ITask) => (
              <TaskItem key={task.$id} task={task} isViewTask={true} />
            ))}
          </Dialog>
        )}
        <input
          aria-roledescription="search"
          type="text"
          id="search"
          placeholder="search your tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`bg-inherit w-5/6 border rounded-md p-2 focus:outline-none focus:ring-1 ${
            error
              ? "border-error focus:ring-red-500 invalid:focus:ring-red-600"
              : "border-input focus:ring-slate-900"
          }`}
        />
        <Button
          type="submit"
          extraBtnClasses="bg-primary text-white hover:bg-primaryHover font-medium text-main py-2"
          content={{
            text: isSearching ? "Searching ..." : "Search",
          }}
        />
      </form>
      <span className="text-error font-medium mt-1">{error}</span>
    </div>
  );
};

export default Search;