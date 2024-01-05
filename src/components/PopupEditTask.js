import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../AppProvider";

const PopupEditTask = ({ task }) => {
    const { updateTask } = useAppContext();

  const [showPopup, setShowPopup] = useState(false);
 const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const [editTask, setEditTask] = useState(task.text);
  const handleEditTask = async (e) => {
    e.preventDefault();
    if (editTask.trim().length < 1)
      return toast.error("The task is not enough");

    const { data, error } = await updateTask(task.id, editTask
    );
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Adding task");
      togglePopup()
      setEditTask("");
    }
  };
 

  return (
    <>
      <button
        onClick={togglePopup}
        className="p-2 px-3 bg-gray-300/90 rounded-xl shadow  font-semibold "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m21.28 6.4-9.54 9.54c-.95.95-3.77 1.39-4.4.76-.63-.63-.2-3.45.75-4.4l9.55-9.55a2.58 2.58 0 1 1 3.64 3.65v0Z"
          />
          <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 4H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11c2.21 0 3-1.8 3-4v-5"
          />
        </svg>
      </button>
     {showPopup&& <div
        className={
          showPopup
            ? "popup fixed z-50 h-full inset-0  bg-black/10 w-full flex justify-center items-center"
            : "popup hidden"
        }
      >
        <section className="popup-main  shadow p-5  bg-white rounded-lg  max-w-sm w-full">
          <form
            className="flex-1 flex  gap-10 flex-col p-4 "
            onSubmit={handleEditTask}
          >
            <h3 className=" text-xl font-semibold  text-amber-500">
              Edit Task
            </h3>

            <input
              type="text"
              placeholder="task"
              required
              className=" bg-slate-300/50 rounded-md flex-1  p-4"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
            />
            <div className=" flex justify-end gap-4 items-center ">
             
              <button
                type="submit"
                className="bg-amber-500 shadow-xl   p-2 px-6 rounded-xl font-bold  text-black "
              >
                Save
              </button>
              <button
                onClick={togglePopup}
                className="p-2 px-3 bg-gray-300/90 rounded-xl shadow  font-semibold "
              >
                Close
              </button>
            </div>
          </form>
        </section>
      </div>}
    </>
  );
};

export default PopupEditTask;
