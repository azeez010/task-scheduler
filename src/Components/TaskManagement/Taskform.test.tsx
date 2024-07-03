import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskForm from "./TaskForm";
import { addTask } from "../../util";

vi.mock("../../util", () => ({
  addTask: vi.fn(),
}));

describe("TaskForm Component", () => {
  const mockOnTaskAdded = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form fields correctly", () => {
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date and Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Task/i })
    ).toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Task Description" },
    });
    fireEvent.change(screen.getByLabelText(/Due Date and Time/i), {
      target: { value: "2024-07-01T12:00" },
    });

    expect(screen.getByLabelText(/Title/i)).toHaveValue("New Task");
    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      "Task Description"
    );
    expect(screen.getByLabelText(/Due Date and Time/i)).toHaveValue(
      "2024-07-01T12:00"
    );
  });

  it("handles form submission and adds task", () => {
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Task Description" },
    });
    fireEvent.change(screen.getByLabelText(/Due Date and Time/i), {
      target: { value: "2024-07-01T12:00" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Add Task/i }));

    expect(addTask).toHaveBeenCalled();
    expect(mockOnTaskAdded).toHaveBeenCalled();

    expect(screen.getByLabelText(/Title/i)).toHaveValue("");
    expect(screen.getByLabelText(/Description/i)).toHaveValue("");
    expect(screen.getByLabelText(/Due Date and Time/i)).toHaveValue("");
  });

  it("displays cron expression input when task type is recurring", () => {
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    fireEvent.change(screen.getByLabelText(/Task Type/i), {
      target: { value: "recurring" },
    });
    expect(screen.getByLabelText(/Cron Expression/i)).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/Due Date and Time/i)
    ).not.toBeInTheDocument();
  });

  it("handles input changes for cron expression correctly", () => {
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    fireEvent.change(screen.getByLabelText(/Task Type/i), {
      target: { value: "recurring" },
    });
    fireEvent.change(screen.getByLabelText(/Cron Expression/i), {
      target: { value: "* * * * *" },
    });

    expect(screen.getByLabelText(/Cron Expression/i)).toHaveValue("* * * * *");
  });
});
