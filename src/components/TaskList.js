import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppProvider";
import toast from "react-hot-toast";

const TaskList = ({ task }) => {
    const [checkCompleted, setCheckCompleted] = useState(task.completed)
  const { updateTaskCompletion, deleteTask } = useAppContext();
  const handleTaskCompletion=()=>{
    updateTaskCompletion(task.id,checkCompleted )
    if(checkCompleted)
    toast.success("task completed")
  }
useEffect(() => {
    handleTaskCompletion()
}, [checkCompleted])


  return (
    <li className="flex gap-4 items-center justify-between px-2 ">
      <span className="flex gap-1 items-center flex-1">
        <input
          type="checkbox"

          defaultChecked={checkCompleted}
          onChange={() =>setCheckCompleted(prev=>!prev)}
          id={task.id}
        />
        <label
          
          htmlFor={task.id}
        >
          <p
            className={`truncate   ${
              task.completed ? " line-through text-gray-700" : "text-amber-500"
            }`}
          >
            {task.text}
          </p>
        </label>
      </span>
      <button
        type="button"
        onClick={() => {deleteTask(task.id)
      toast.success("Deleting task");
        
        ;}}
        className="p-2 px-3 bg-red-500/90 rounded-xl shadow  font-semibold "
      >
        Delete
      </button>
    </li>
  );
};

export default TaskList;
