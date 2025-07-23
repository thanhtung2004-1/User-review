import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api";
import "./AddUser.css";

function AddUser() {
    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        department: "",
        role: "",
        performanceScore: 0,
        reviews: []
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUser(form);
        alert("Thêm thành công");
        navigate("/");
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Thêm người dùng</h2>
            {Object.keys(form).map(
                (key) =>
                    key !== "reviews" && (
                        <input
                            key={key}
                            placeholder={key}
                            value={form[key]}
                            onChange={(e) =>
                                setForm({ ...form, [key]: key === "performanceScore" ? +e.target.value : e.target.value })
                            }
                        />
                    )
            )}
            <button type="submit">Thêm</button>
            <button type="button" className="back-btn" onClick={handleBack}>
                Quay lại
            </button>
        </form>
    );
}

export default AddUser;
