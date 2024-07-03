import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types/Task';
import { getTasks, updateTasks as updateTaskInStorage, deleteTask as deleteTaskFromStorage } from '../util/storage';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
  }, []);

  const updateTask = useCallback((updatedTask: Task) => {
    updateTaskInStorage(updatedTask);
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    deleteTaskFromStorage(taskId);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const addTask = useCallback((newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    // Persist new task to storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }, [tasks]);

  return {
    tasks,
    updateTask,
    deleteTask,
    addTask,
  };
};

export default useTasks;
