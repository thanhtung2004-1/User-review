import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditUser() {
    const [form, setForm] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8888/users/${id}`)
            .then((res) => setForm(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8888/users/${id}`, form)
            .then(() => navigate("/users"))
            .catch((err) => console.log(err));
    };

    const handleBack = () => {
        navigate("/users");
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "30px" }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxWidth: "500px",
                    width: "100%",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
            >
                <h2 style={{ textAlign: "center" }}>Sửa người dùng</h2>
                {Object.keys(form).map(
                    (key) =>
                        key !== "reviews" && (
                            <input
                                key={key}
                                placeholder={key}
                                value={form[key]}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        [key]: key === "performanceScore" ? +e.target.value : e.target.value,
                                    })
                                }
                                style={{
                                    padding: "8px",
                                    fontSize: "16px",
                                    border: "1px solid #aaa",
                                    borderRadius: "5px",
                                }}
                            />
                        )
                )}
                <button
                    type="submit"
                    style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
                >
                    Cập nhật
                </button>
                <button
                    type="button"
                    onClick={handleBack}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backgroundColor: "#007bff",
                    }}
                >
                    Quay lại danh sách
                </button>
            </form>
        </div>
    );
}

export default EditUser;