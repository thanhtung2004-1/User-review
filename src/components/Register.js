import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUsers, addUser } from "../api";
import "./Auth.css";

function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await getUsers();
        const isExists = res.data.find((u) => u.username === username);
        if (isExists) {
            alert("Tên tài khoản đã tồn tại");
        } else {
            await addUser({ name, username, password });
            alert("Đăng ký thành công");
            navigate("/login");
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleRegister} className="auth-form">
                <h2>Đăng ký</h2>
                <input
                    placeholder="Tên hiển thị"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">Đăng ký</button>
                <p>
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
