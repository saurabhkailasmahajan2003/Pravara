import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OwnerLayout from "./layouts/OwnerLayout";
import Dashboard from "./pages/owner/Dashboard";
import Teams from "./pages/owner/Teams";
import Analytics from "./pages/owner/Analytics";
import Leaves from "./pages/owner/Leaves";
import TimeSheet from "./pages/owner/TimeSheet";
import Reminder from "./pages/owner/Reminder";
import Reports from "./pages/owner/Reports";
import Settings from "./pages/owner/Settings";
import Employees from "./pages/owner/Employees";
import { RequireAuth } from "./auth/AuthContext.jsx";
import Login from "./pages/auth/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/owner/dashboard" replace />} />
        <Route path="/owner" element={<RequireAuth><OwnerLayout /></RequireAuth>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="teams" element={<Teams />} />
          <Route path="employees" element={<Employees />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="time-sheet" element={<TimeSheet />} />
          <Route path="reminder" element={<Reminder />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/owner/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
