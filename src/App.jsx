import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersProvider } from "./context/UsersContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import UserFormPage from "./pages/UserFormPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <UsersProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/"              element={<Dashboard />} />
            <Route path="/users"         element={<UsersPage />} />
            <Route path="/add-user"      element={<UserFormPage />} />
            <Route path="/edit-user/:id" element={<UserFormPage />} />
            <Route path="/settings"      element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UsersProvider>
  );
}