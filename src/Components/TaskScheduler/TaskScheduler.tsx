import React, { useState, useEffect } from "react";
import TaskSection from "./TaskSection";
import TaskExecutor from "../TaskExecutor/TaskExecutor";
import { Task } from "../../types/Task";
import useTasks from "../../hooks/useTask";
import EditTaskModal from "./EditTaskModal";
import cronParser from "cron-parser";
import Navbar from "../NavBar";

const TaskScheduler: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleTaskDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleTaskEdit = (task: Task) => {
    setCurrentTask(task);
    setEditModalOpen(true);
  };

  const handleTaskStart = (task: Task) => {
    const updatedTask: Task = { ...task, status: "in-progress" };
    updateTask(updatedTask);
  };

  const handleTaskComplete = (task: Task) => {
    const updatedTask: Task = { ...task, status: "done" };
    updateTask(updatedTask);
  };

  const handleTaskExecution = (task: Task) => {
    console.log(`Executing task: ${task.title}`);

    if (task.type === "one-time") {
      const now = new Date();
      if (
        task.status === "todo" &&
        task.dueDate &&
        new Date(task.dueDate) <= now
      ) {
        const updatedTask: Task = { ...task, status: "done" };
        updateTask(updatedTask);
      }
    } else if (task.type === "recurring" && task.cronExpression) {
      const now = new Date();
      try {
        const cronExpression: string = task.cronExpression;
        const cronInterval = cronParser.parseExpression(cronExpression);
        const nextExecution = cronInterval.next().toDate();

        if (task.status === "todo" && nextExecution <= now) {
          const updatedTask: Task = { ...task, status: "in-progress" };
          updateTask(updatedTask);
        }
      } catch (error) {
        console.error(`Error parsing cron expression for task ${task.id}`);
      }
    }
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setCurrentTask(null);
  };

  const handleTaskSave = (updatedTask: Task) => {
    updateTask(updatedTask);
    handleModalClose();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      tasks.forEach((task) => {
        if (task.type === "recurring" && task.cronExpression) {
          handleTaskExecution(task);
        }
      });
    }, 60000); // Run every minute

    return () => clearInterval(intervalId);
  }, [tasks]);

  // Filter tasks by type
  const recurringTasks = tasks.filter((task) => task.type === "recurring");
  const oneTimeTasks = tasks.filter((task) => task.type === "one-time");

  return (
    <div className="h-screen p-4 bg-gray-100 rounded-lg shadow-lg sm:p-6">
      <Navbar />
      <h2 className="mb-4 text-2xl font-bold text-center mt-7">
        Task Scheduling
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Task Sections */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <TaskSection
            title="Recurring Tasks"
            tasks={recurringTasks}
            onDelete={handleTaskDelete}
            onEdit={handleTaskEdit}
            onStart={handleTaskStart}
            onComplete={handleTaskComplete}
          />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <TaskSection
            title="One-Time Tasks"
            tasks={oneTimeTasks}
            onDelete={handleTaskDelete}
            onStart={handleTaskStart}
            onComplete={handleTaskComplete}
          />
        </div>
      </div>

      {/* Task Executor */}
      <div className="p-4 mt-4 ">
        <TaskExecutor tasks={tasks} onExecute={handleTaskExecution} />
      </div>

      {/* Edit Task Modal */}
      {currentTask && (
        <EditTaskModal
          task={currentTask}
          isOpen={isEditModalOpen}
          onClose={handleModalClose}
          onSave={handleTaskSave}
        />
      )}
    </div>
  );
};

export default TaskScheduler;
