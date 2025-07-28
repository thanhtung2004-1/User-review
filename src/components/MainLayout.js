import { Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        alert("Đăng xuất thành công");
        navigate("/login");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}> Ứng dụng quản lý người dùng</h2>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <button onClick={handleLogout}>Đăng xuất</button>
            </div>
            <hr />
            <Outlet />
        </div>
    );
}

export default MainLayout;
