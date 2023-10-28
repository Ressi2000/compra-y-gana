import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FormularioPage from "./pages/FormularioPage";
import FormularioShowPage from "./pages/FormularioShowPage";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import BeforeForm from "./pages/BeforeForm";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import { FormProvider } from "./context/FormContext";
import { StoreProvider } from "./context/StoreContext";
import { CrmProvider } from "./context/CrmContext";
import LocalesPage from "./pages/LocalesPage";
import LocalesFormPage from "./pages/LocalesFormPage";
import CrmPage from "./pages/CrmPage";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <CrmProvider>
          <FormProvider>
            <StoreProvider>
              <BrowserRouter>
                <main className="container mx-auto px-10">
                  <Navbar />

                  <Routes>
                    <Route path="admin/" element={<HomePage />} />
                    <Route path="/admin/login" element={<LoginPage />} />
                    <Route path="/admin/register" element={<RegisterPage />} />
                    <Route path="/formulario" element={<FormularioPage />} />
                    <Route path="/beforeForm" element={<BeforeForm />} />

                    <Route element={<ProtectedRoute />}>
                      <Route path="/admin/tasks" element={<TaskPage />} />
                      <Route
                        path="/admin/add-task"
                        element={<TaskFormPage />}
                      />
                      <Route
                        path="/admin/tasks/:id"
                        element={<TaskFormPage />}
                      />
                      <Route path="/admin/stores" element={<LocalesPage />} />
                      <Route
                        path="/admin/add-store"
                        element={<LocalesFormPage />}
                      />
                      <Route
                        path="/admin/stores/:id"
                        element={<LocalesFormPage />}
                      />
                      <Route path="/admin/profile" element={<ProfilePage />} />
                      <Route
                        path="/admin/show-formulario"
                        element={<FormularioShowPage />}
                      />
                      <Route
                        path="/admin/show-tabla-crm"
                        element={<CrmPage />}
                      />
                    </Route>
                  </Routes>
                </main>
              </BrowserRouter>
            </StoreProvider>
          </FormProvider>
        </CrmProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
