import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =process.env.REACT_PUBLIC_SUPABASE_URL|| 'https://olhdtjfrlomrfdektykk.supabase.co';
const SUPABASE_KEY = process.env.REACT_PUBLIC_SUPABASE_KEY||'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9saGR0amZybG9tcmZkZWt0eWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMTI2ODgsImV4cCI6MjAxOTg4ODY4OH0.W-vEpG8AQL6nvfEkjxi0L1Ph8ubvpEPqAz1uefKQRBY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};





export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error('Error signing up:', error.message);
      return { error };
    }
    setUser(user);
    return { user };
  };

  const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      console.error('Error signing in:', error.message);
      return { error };
    }
    setUser(user);
    return { user };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
  }, []);


  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const { data: tasks, error } = await supabase
          .from('todo')
          .select('*')
          .eq('user_id', user.id);
        if (error) {
          console.error('Error fetching tasks:', error.message);
          return;
        }
        setTasks(tasks ?? []);
      }
    };

    fetchTasks();
  }, [user]);

  const addTask = async (newTask) => {
    if (user) {
      const { data: task, error } = await supabase.from('tasks').insert([
        {
          ...newTask,
          user_id: user.id,
        },
      ]);
      if (error) {
        console.error('Error adding task:', error.message);
        return;
      }
      setTasks([...tasks, task[0]]);
    }
  };

  const deleteTask = async (taskId) => {
    if (user) {
      await supabase.from('tasks').delete().eq('id', taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    }
  };

  const updateTaskCompletion = async (taskId, completed) => {
    if (user) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', taskId);
      if (error) {
        console.error('Error updating task:', error.message);
        return;
      }
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      );
      setTasks(updatedTasks);
    }
  };

  const contextValue = {
    user,
    signUp,
    signIn,
    signOut,
    tasks,
    addTask,
    deleteTask,
    updateTaskCompletion,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default supabase;
