import React, { useState } from 'react';
import { Task } from '../../types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10; // Number of tasks per page

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks available</p>
        )}
      </div>
      {tasks.length > tasksPerPage && (
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md mx-1 focus:outline-none ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
