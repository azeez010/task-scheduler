export interface Task {
  id: string;
  title: string;
  description: string;
  type: "one-time" | "recurring";
  dueDate?: Date | null;
  cronExpression: string | null;
  status: "in-progress" | "todo" | "done";
}
