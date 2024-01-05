import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAppContext } from '../AppProvider';

const InputTask = () => {
    const { addTask } = useAppContext();

    const [task, setTask] = useState();
    const handleAddTask = async (e) => {
      e.preventDefault();
      if (task.trim().length < 1)
        return toast.error("The password is not enough");
  
      const { data, error } = await addTask({
       text: task
      });
      if (error) {
  
        toast.error(error.message);
      } else {
        toast.success("Adding task");
        setTask('')
  
      }
    };
    return (
      <form className="flex-1 flex items-end gap-2 p-4 " onSubmit={handleAddTask}>
        <input
          type='text'
          placeholder="task"
          required
          className=" bg-slate-300/50 rounded-md flex-1  p-4"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type="submit"
          className="bg-amber-500 shadow-xl   p-2 px-6 rounded-xl font-bold  text-black "
        >
          + Add
        </button>
      </form>
    );
}

export default InputTask