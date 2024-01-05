import React from 'react'
import { useAppContext } from '../AppProvider';
import TaskList from './TaskList';

const TasksList = () => {
    const { tasks} = useAppContext();



    return (
      <ul className="flex-col flex mt-5 space-y-4 p-2 my-2 ">
        {tasks.map((task) => (
          <TaskList
            key={task.id}
            task={task}
         
          />
        ))}
      </ul>
    );
}

export default TasksList