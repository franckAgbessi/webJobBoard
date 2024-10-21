import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Sign from "./pages/Sign";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./Context/AuthContext";
import ProtectRoute from './Context/ProtectRoute';
import UserCompte from "./pages/UserCompte";

import {ToastContainer} from "react-toastify";

function App() {
    return (


        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign" element={<Sign />} />
                    <Route path="/dashBoard" element={

                        <ProtectRoute>
                            <Dashboard />
                        </ProtectRoute>
                    } />
                    <Route path="/myAccount" element={

                        <ProtectRoute>
                            <UserCompte />
                        </ProtectRoute>
                    } />

                </Routes>
            </AuthProvider>

        <ToastContainer/>
        </Router>
    );
}

export default App;
