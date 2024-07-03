// src/util/test-utils.tsx
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";
import { NotificationProvider } from "./NotificationUtil";

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <NotificationProvider>{children}</NotificationProvider>
    ),
    ...options,
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
