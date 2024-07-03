import React from 'react';
import { Task } from '../../types/Task';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  onStart: (task: Task) => void;
  onComplete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit, onStart, onComplete }) => {
  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(task);
  };

  let actionButton = null;
  switch (task.status) {
    case 'todo':
      actionButton = (
        <button
          onClick={() => onStart(task)}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded-md"
        >
          Start
        </button>
      );
      break;
    case 'in-progress':
      actionButton = (
        <button
          onClick={() => onComplete(task)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md"
        >
          Complete
        </button>
      );
      break;
    case 'done':
      actionButton = (
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md"
        >
          Delete
        </button>
      );
      break;
    default:
      actionButton = null;
  }

  const taskDueDate = task.dueDate ? new Date(task.dueDate).toLocaleString() : 'N/A';
  const taskSchedule = task.type === 'recurring' ? task.cronExpression : taskDueDate;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">{task.title}</h3>
          {onEdit && (
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md"
            >
              Edit
            </button>
          )}
        </div>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {task.type === 'recurring' ? `Cron: ${taskSchedule}` : `Due: ${taskSchedule}`}
          </p>
          <div>{actionButton}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
