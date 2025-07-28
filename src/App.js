import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import ViewUser from "./components/ViewUser";
import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/MainLayout"; // 👉 Mới thêm

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register />} />

                {isLoggedIn ? (
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Navigate to="users" />} />
                        <Route path="users" element={<UserList />} />
                        <Route path="add-user" element={<AddUser />} />
                        <Route path="edit-user/:id" element={<EditUser />} />
                        <Route path="view-user/:id" element={<ViewUser />} />
                    </Route>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
