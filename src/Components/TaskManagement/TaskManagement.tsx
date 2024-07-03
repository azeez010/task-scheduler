import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import useTasks from '../../hooks/useTask'; // Adjust the path as necessary
import Navbar from '../NavBar';

const TaskManagement: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Management</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <TaskForm onTaskAdded={addTask} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
