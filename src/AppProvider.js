import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.REACT_PUBLIC_SUPABASE_URL ||
  "https://olhdtjfrlomrfdektykk.supabase.co";
const SUPABASE_KEY =
  process.env.REACT_PUBLIC_SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9saGR0amZybG9tcmZkZWt0eWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMTI2ODgsImV4cCI6MjAxOTg4ODY4OH0.W-vEpG8AQL6nvfEkjxi0L1Ph8ubvpEPqAz1uefKQRBY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [userCur, setUserCur] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error("Error signing up:", error.message);
      return { error };
    }
    if (data?.user) setUserCur(data?.user);

    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error signing in:", error.message);
      return { error };
    }
    setUserCur(data?.user);
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    setUserCur(null);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      localStorage.setItem("user", session?.user);
      setUserCur(session?.user ?? null);
    });
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (userCur) {
        const { data, error } = await supabase
          .from("todo")
          .select("")
          .eq("user_id", userCur?.id)
          .order("created_at", { ascending: false });
        if (error) {
          console.error("Error fetching tasks:", error.message);
          return;
        }
        if (filter === "All") return setTasks(data ?? []);
        if (filter === "Completed")
          return setTasks(data.filter((task) => task.completed));
        if (filter === "Incomplete")
          return setTasks(data.filter((task) => !task.completed));
      }
    };

    fetchTasks();
  }, [userCur, filter]);
  const fetchTasks = async () => {
    if (userCur) {
      const { data, error } = await supabase
        .from("todo")
        .select("")
        .eq("user_id", userCur?.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching tasks:", error.message);
        return;
      }
      return data;
    }
  };
  const addTask = async (newTask) => {
    if (userCur) {
      const { data, error } = await supabase
        .from("todo")
        .insert([
          {
            ...newTask,
            user_id: userCur.id,
          },
        ])
        .select();
      if (error) {
        console.error("Error adding task:", error.message);
        return;
      }
      setTasks([...tasks, data[0]]);
      return { data, error };
    }
  };

  const deleteTask = async (taskId) => {
    if (userCur) {
      await supabase.from("todo").delete().eq("id", taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    }
  };

  const updateTaskCompletion = async (taskId, completed) => {
    if (userCur) {
      const {  error } = await supabase
        .from("todo")
        .update({ completed })
        .eq("id", taskId);
      if (error) {
        console.error("Error updating task:", error.message);
        return;
      }
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      );
      setTasks(updatedTasks);
    }
  };
  const updateTask = async (taskId, newTask) => {
    if (userCur) {
      const { data, error } = await supabase
        .from("todo")
        .update({ text: newTask })
        .eq("id", taskId);
      if (error) {
        console.error("Error updating task:", error.message);
        return;
      }
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      return { data, error };
    }
  };
  const contextValue = {
    user: userCur,
    filter,
    setFilter,
    signUp,
    signIn,
    signOut,
    fetchTasks,
    tasks,
    setTasks,
    
    addTask,
    deleteTask,
    updateTask,
    updateTaskCompletion,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
