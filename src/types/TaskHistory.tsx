// src/types/TaskHistory.ts

export interface TaskHistories {
    id: string;
    taskId: string; 
    title: string;
    description: string;
    type: 'one-time' | 'recurring';
    status: 'completed' | 'deleted'; 
    completionDate: Date; 
  }
  