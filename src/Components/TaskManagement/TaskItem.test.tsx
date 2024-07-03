import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import TaskItem from "./TaskItem";
import { Task } from "../../types/Task";

describe("TaskItem Component", () => {
  const task: Task = {
    id: "1",
    title: "Sample Task",
    description: "This is a sample task",
    type: "one-time",
    dueDate: new Date(), // Use Date object instead of string
    cronExpression: "",
    status: "todo",
  };

  const updateTask = vi.fn();
  const deleteTask = vi.fn();

  it("renders task details correctly", () => {
    render(
      <TaskItem task={task} updateTask={updateTask} deleteTask={deleteTask} />
    );
    expect(screen.getByText("Sample Task")).toBeInTheDocument();
    expect(screen.getByText("This is a sample task")).toBeInTheDocument();
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
    expect(screen.getByText("todo")).toBeInTheDocument(); // Update to match rendered text
  });

  it("opens the edit form when edit button is clicked", () => {
    render(
      <TaskItem task={task} updateTask={updateTask} deleteTask={deleteTask} />
    );
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Task Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Due Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });

  it("saves changes when save button is clicked", () => {
    render(
      <TaskItem task={task} updateTask={updateTask} deleteTask={deleteTask} />
    );
    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Updated Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Updated description" },
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "in-progress" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(updateTask).toHaveBeenCalledWith({
      ...task,
      title: "Updated Task",
      description: "Updated description",
      status: "in-progress",
      dueDate: new Date(task.dueDate!), // Ensure dueDate is a Date object
      cronExpression: null, // Ensure cronExpression is null
    });
  });

  it("cancels editing when cancel button is clicked", () => {
    render(
      <TaskItem task={task} updateTask={updateTask} deleteTask={deleteTask} />
    );
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByLabelText("Title")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Description")).not.toBeInTheDocument();
  });

  it("deletes task when delete button is clicked", () => {
    render(
      <TaskItem task={task} updateTask={updateTask} deleteTask={deleteTask} />
    );
    fireEvent.click(screen.getByText("Delete"));
    expect(deleteTask).toHaveBeenCalledWith("1");
  });
});
