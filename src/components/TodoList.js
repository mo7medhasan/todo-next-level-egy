
import React from "react";
import TasksList from "./TasksList";
import InputTask from "./InputTask";



const TodoList = () => {
  return (
    <div className="flex-1 flex-col flow-root  gap-8  py-4 pb-6">
      <InputTask />
  <div className="h-6 bg-gray-300 p-4"/>

  
 
      <TasksList />
    </div>
  );
};

export default TodoList;
