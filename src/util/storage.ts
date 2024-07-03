// src/util.ts

import { Task } from '../types/Task';
import { TaskHistories } from '../types/TaskHistory';

const TASKS_KEY = 'tasks';
const HISTORY_KEY = 'taskHistory';

export const addTask = (task: Task) => {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const updateTasks = (updatedTask: Task): Promise<Task> => {
  return new Promise((resolve, reject) => {
    try {
      const tasks = getTasks();
      const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
        resolve(updatedTask);
      } else {
        reject(new Error('Task not found'));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteTask = (taskId: string) => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

export const executeTask = (task: Task, addNotification: (message: string) => void) => {
  const updatedTask: Task = {
    ...task,
    status: task.type === 'one-time' ? 'done' : 'in-progress'
  };

  updateTasks(updatedTask)
    .then(updatedTask => {
      if (updatedTask.status === 'done') {
        addToTaskHistory(updatedTask);
        addNotification(`Task executed: ${task.title}`);
      }
    })
    .catch(error => {
      console.error(`Failed to execute task ${task.id}: ${error}`);
    });
};


export const getTaskHistory = (): TaskHistories[] => {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

const addToTaskHistory = (task: Task) => {
  const history: TaskHistories[] = getTaskHistory();
  const historyItem: TaskHistories = {
    id: task.id,
    taskId: task.id,
    title: task.title,
    description: task.description,
    type: task.type,
    status: 'completed',
    completionDate: new Date()
  };
  history.push(historyItem);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const deleteTaskHistory = (historyId: string) => {
  const history = getTaskHistory();
  const updatedHistory = history.filter(item => item.id !== historyId);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};
