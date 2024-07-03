import React, { useState } from 'react';
import { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [type, setType] = useState<'one-time' | 'recurring'>(task?.type);
  const [dueDateTime, setDueDateTime] = useState(() => {
    try {
      return task.dueDate ? new Date(task.dueDate).toISOString() : '';
    } catch (error) {
      console.error('Error converting task.dueDate:', error);
      return '';
    }
  });
  const [cronExpression, setCronExpression] = useState(task?.cronExpression || '');
  const [status, setStatus] = useState<Task['status']>(task?.status);

  const handleSaveTask = () => {
    const updatedTask: Task = {
      ...task,
      title,
      description,
      type,
      dueDate: type === 'one-time' ? new Date(dueDateTime) : null,
      cronExpression: type === 'recurring' ? cronExpression : null,
      status,
    };
    updateTask(updatedTask);
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  return (
    <div className="task-item-container bg-white shadow-md rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-lg">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="type" className="block font-medium text-gray-700">
              Task Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as 'one-time' | 'recurring')}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="one-time">One-Time</option>
              <option value="recurring">Recurring</option>
            </select>
          </div>
          {type === 'one-time' ? (
            <div>
              <label htmlFor="due-date" className="block font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="datetime-local"
                id="due-date"
                value={dueDateTime}
                onChange={(e) => setDueDateTime(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="cron-expression" className="block font-medium text-gray-700">
                Cron Expression
              </label>
              <input
                type="text"
                id="cron-expression"
                value={cronExpression}
                onChange={(e) => setCronExpression(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., * * * * *"
              />
            </div>
          )}
          <div>
            <label htmlFor="status" className="block font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Task['status'])}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSaveTask}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">{task?.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteTask}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-700">{task?.description}</p>
          <div className="flex justify-between items-center">
            {task?.type === 'one-time' ? (
              <p className="text-gray-600">
                Due: {task.dueDate ? new Date(task.dueDate).toLocaleString() : ''}
              </p>
            ) : (
              <p className="text-gray-600">Cron: {task?.cronExpression}</p>
            )}
            <span
              className={`px-3 py-1 rounded-md text-sm font-semibold ${
                task?.status === 'todo'
                  ? 'bg-yellow-500 text-yellow-800'
                  : task?.status === 'in-progress'
                  ? 'bg-blue-500 text-blue-800'
                  : 'bg-green-500 text-green-800'
              }`}
            >
              {task?.status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
