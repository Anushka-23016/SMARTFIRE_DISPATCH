import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import DispatcherDashboard from "./DispatcherDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dispatcher" element={<DispatcherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
