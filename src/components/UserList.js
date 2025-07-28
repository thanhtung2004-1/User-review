import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../api";
import "./UserList.css";

function UserList() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách người dùng:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Bạn có chắc muốn xoá?");
        if (isConfirmed) {
            try {
                await deleteUser(id);
                fetchData();
            } catch (error) {
                console.error("Lỗi khi xoá người dùng:", error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        alert("Đăng xuất thành công");
        navigate("/login");
    };

    const filteredUsers = users.filter(
        (u) =>
            u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="userlist-container">
            <div className="userlist-header">
                <h2>Danh sách người dùng</h2>
                <button onClick={handleLogout} className="logout-button">
                    Đăng xuất
                </button>
            </div>

            <div className="add-user-wrapper">
                <Link to="/add-user" className="add-link">
                    + Thêm người dùng
                </Link>
            </div>

            <input
                type="text"
                placeholder="Tìm kiếm theo tên, phòng ban, vai trò..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <ul className="user-list">
                {filteredUsers.map((u) => (
                    <li key={u.id} className="user-item">
                        <span>
                            <strong>{u.name}</strong> - {u.department} - {u.role}
                        </span>
                        <div>
                            <Link to={`/view-user/${u.id}`}>[Xem]</Link>{" "}
                            <Link to={`/edit-user/${u.id}`}>[Sửa]</Link>{" "}
                            <button onClick={() => handleDelete(u.id)}>Xoá</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
