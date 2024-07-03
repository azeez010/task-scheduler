import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '../../types/Task';

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onEdit?: (task: Task) => void; 
  onStart: (task: Task) => void;
  onComplete: (task: Task) => void;
}

const TaskSection: React.FC<TaskSectionProps> = ({ title, tasks, onDelete, onEdit, onStart, onComplete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onStart={onStart}
              onComplete={onComplete}
            />
          ))
        ) : (
          <p className="text-gray-500">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskSection;
