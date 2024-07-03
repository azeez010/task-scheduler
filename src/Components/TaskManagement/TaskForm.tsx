import React, { useState } from 'react';
import { Task } from '../../types/Task';
import { addTask } from '../../util';

interface TaskFormProps {
  onTaskAdded: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDateTime, setDueDateTime] = useState('');
  const [cronExpression, setCronExpression] = useState('');
  const [type, setType] = useState<'one-time' | 'recurring'>('one-time');
  const [status, setStatus] = useState<Task['status']>('todo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      type,
      dueDate: type === 'one-time' ? new Date(dueDateTime) : null,
      cronExpression: type === 'recurring' ? cronExpression : null,
      status,
    };
    addTask(newTask);
    onTaskAdded(newTask);
    setTitle('');
    setDescription('');
    setDueDateTime('');
    setCronExpression('');
    setType('one-time');
    setStatus('todo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center py-10 px-4 rounded-xl">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="type" className="block text-gray-700 font-medium mb-1">Task Type</label>
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
              <label htmlFor="dueDateTime" className="block text-gray-700 font-medium mb-1">Due Date and Time</label>
              <input
                type="datetime-local"
                id="dueDateTime"
                value={dueDateTime}
                onChange={(e) => setDueDateTime(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ) : (
            <div>
              <label htmlFor="cronExpression" className="block text-gray-700 font-medium mb-1">Cron Expression</label>
              <input
                type="text"
                id="cronExpression"
                value={cronExpression}
                onChange={(e) => setCronExpression(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., * * * * *"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="status" className="block text-gray-700 font-medium mb-1">Status</label>
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full transition duration-150 ease-in-out"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
