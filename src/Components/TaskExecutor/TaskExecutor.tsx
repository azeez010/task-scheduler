import React, { useEffect } from 'react';
import { Task } from '../../types/Task';
import { executeTask, getTasks } from '../../util';
import cronParser from 'cron-parser';
import { useNotification } from '../../util/NotificationUtil';

interface TaskExecutorProps {
  tasks: Task[];
  onExecute: (task: Task) => void;
}

const TaskExecutor: React.FC<TaskExecutorProps> = ({ tasks, onExecute }) => {
  const { addNotification } = useNotification();

  useEffect(() => {
    console.log('TaskExecutor initialized');

    const interval = setInterval(() => {
      console.log('Interval triggered');
      const storedTasks = getTasks();
      const now = new Date();

      if (storedTasks) {
        storedTasks.forEach((task) => {
          try {
            console.log(`Processing task ${task.id}`);
            if (task.status !== 'done') {
              if (task.type === 'one-time') {
                if (task.dueDate && new Date(task.dueDate) <= now) {
                  executeTask(task, addNotification); 
                  onExecute({ ...task, status: 'done' });
                  addNotification(`Task ${task.title}: ${task.description} due date has been exceeded`);
                } else if (task.dueDate && new Date(task.dueDate).getTime() - now.getTime() < 10000) {
                  addNotification(`Task ${task.title} due date is near`);
                  console.log(`Task ${task.title} due date is near`);
                }
              } else if (task.type === 'recurring') {
                if (task.cronExpression) {
                  const cronInterval = cronParser.parseExpression(task.cronExpression);
                  const nextExecution = cronInterval.next().toDate();

                  if (nextExecution <= now) {
                    executeTask(task, addNotification);
                    onExecute({ ...task, status: 'in-progress' });
                    addNotification(`Reminder from your todo App: ${task.title} ${task.description}`);
                  } else if (nextExecution.getTime() - now.getTime() < 10000) {
                    addNotification(`Task ${task.title} Description ${task.description} is near`);
                    console.log(`Task ${task.title} Description ${task.description} is near`);
                  }
                } else {
                  console.warn(`Invalid cron expression for task ${task.id}.`);
                }
              } else {
                console.warn(`Unknown task type or invalid task configuration for task ${task.id}.`);
              }
            }
          } catch (error) {
            console.error(`Error processing task ${task.id}`);
          }
        });
      } else {
        console.warn('No tasks found.');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [tasks, onExecute, addNotification]);

  return null;
};

export default TaskExecutor;
