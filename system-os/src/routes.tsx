import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { ProtectedLayout } from "./components/ProtectedLayout";
import Relatorio from "./pages/Relatorios";
import Receber from "./pages/Receber";

const AppRoutes = () => {
    return (
        <Router>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={
                    <ProtectedLayout>
                        <Home />
                    </ProtectedLayout>
                }
                />
                <Route path="/relatorios" element={
                    <ProtectedLayout>
                        <Relatorio />
                    </ProtectedLayout>
                } />
                <Route path="/relatorios/:id" element={
                    <ProtectedLayout>
                        <Relatorio />
                    </ProtectedLayout>
                } />
                <Route path="/receber" element={
                    <ProtectedLayout>
                        <Receber />
                    </ProtectedLayout>
                } />
            </Routes>

        </Router>
    )
}

export default AppRoutes