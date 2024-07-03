import { render, screen } from "./util/test-utils";
import AppRoutes from "./AppRoutes";
import { MemoryRouter } from "react-router-dom";

describe("App Component", () => {
  it("renders TaskManagement component on default route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Task Management/i })
    ).toBeInTheDocument();
  });

  it("renders TaskScheduler component on /task-scheduling route", () => {
    render(
      <MemoryRouter initialEntries={["/task-scheduling"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Task Scheduling/i })
    ).toBeInTheDocument();
  });

  it("renders TaskHistory component on /task-history route", () => {
    render(
      <MemoryRouter initialEntries={["/task-history"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Task History/i })
    ).toBeInTheDocument();
  });
});
