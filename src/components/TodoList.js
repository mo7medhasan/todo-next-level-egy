import React from "react";
import TasksList from "./TasksList";
import InputTask from "./InputTask";
import { useAppContext } from "../AppProvider";

const dataFilter = ["All", "Completed", "Incomplete"];

const TodoList = () => {
  const { filter, setFilter } = useAppContext();

  return (
    <div className="flex-1 flex-col flow-root  gap-8  py-4 pb-6">
      <InputTask />

      <div className=" bg-gray-300 p-4 flex flex-wrap gap-2  items-center justify-center">
        {dataFilter.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`${
              filter === item ? "bg-amber-500" : "bg-white"
            } px-5 py-2 shadow-sm rounded-full `}
          >
            {item}
          </button>
        ))}
      </div>

      <TasksList />
    </div>
  );
};

export default TodoList;
