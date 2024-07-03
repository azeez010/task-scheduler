import React from "react";
import { Route, Routes } from "react-router-dom";
import TaskManagement from "./Components/TaskManagement/TaskManagement";
import TaskScheduler from "./Components/TaskScheduler/TaskScheduler";
import TaskHistory from "./Components/TaskHistory/TaskHistorys";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/task-management" element={<TaskManagement />} />
    <Route path="/task-scheduling" element={<TaskScheduler />} />
    <Route path="/task-history" element={<TaskHistory />} />
    <Route path="/" element={<TaskManagement />} />
  </Routes>
);

export default AppRoutes;
