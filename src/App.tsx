// src/App.tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./util/NotificationUtil";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </NotificationProvider>
  );
};

export default App;
