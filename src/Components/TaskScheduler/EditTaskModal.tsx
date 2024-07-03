import React, { useState } from "react";
import { Task } from "../../types/Task";

interface EditTaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.toISOString().substr(0, 10) : ""
  );
  const [cronExpression, setCronExpression] = useState(
    task.cronExpression || ""
  );

  const handleSave = () => {
    const updatedTask: Task = {
      ...task,
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      cronExpression: task.type === "recurring" ? cronExpression : null,
    };
    onSave(updatedTask);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            placeholder="Title"
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
          placeholder="Description"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {task.type === "one-time" &&  (
        <div className="mb-4">
          <label htmlFor="dueDateTime" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="datetime-local"
            id="dueDateTime"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
         )}
        {task.type === "recurring" && (
          <div className="mb-4">
            <label htmlFor="cronExpression" className="block text-sm font-medium text-gray-700">
              Cron Expression
            </label>
            <input
            id="cronExpression"
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
            />
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-1 px-3 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
