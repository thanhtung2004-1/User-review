import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUsers } from "../api";
import "./Auth.css"; // 👉 Thêm CSS dùng chung

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await getUsers();
        const user = res.data.find(
            (u) => u.username === username && u.password === password
        );
        if (user) {
            localStorage.setItem("loggedIn", "true");
            alert("Đăng nhập thành công");
            navigate("/");
        } else {
            alert("Sai tài khoản hoặc mật khẩu");
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-form">
                <h2>Đăng nhập</h2>
                <input
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    placeholder="Mật khẩu"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Đăng nhập</button>
                <p>
                    Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
