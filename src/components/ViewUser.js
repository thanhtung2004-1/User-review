import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../api";
import "./ViewUser.css";


function ViewUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [review, setReview] = useState({
        criteria: "",
        score: 0,
        comment: "",
        date: new Date().toISOString(),
        reviewer: ""
    });

    useEffect(() => {
        getUserById(id).then((res) => setUser(res.data));
    }, [id]);

    const handleReview = async (e) => {
        e.preventDefault();
        const updated = {
            ...user,
            reviews: [...(user.reviews || []), review]
        };
        await updateUser(id, updated);
        setUser(updated);
        alert("Đã thêm đánh giá");

        setReview({
            criteria: "",
            score: 0,
            comment: "",
            date: new Date().toISOString(),
            reviewer: ""
        });
    };


    const handleBack = () => {
        navigate("/");
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="view-user-container">
            <h2>{user.name}</h2>
            <p>Phòng ban: {user.department}</p>
            <p>Chức vụ: {user.role}</p>
            <p>Điểm hiệu suất: {user.performanceScore}</p>

            <h3>Đánh giá</h3>
            {user.reviews && user.reviews.length > 0 ? (
                <ul>
                    {user.reviews.map((r, i) => (
                        <li key={i}>
                            {r.criteria} - {r.score} điểm - "{r.comment}" (
                            {r.reviewer} - {new Date(r.date).toLocaleDateString()})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Chưa có đánh giá nào.</p>
            )}

            <h4>Thêm đánh giá</h4>
            <form onSubmit={handleReview}>
                <input
                    placeholder="Tiêu chí"
                    value={review.criteria}
                    onChange={(e) => setReview({ ...review, criteria: e.target.value })}
                    required
                />
                <input
                    placeholder="Điểm"
                    type="number"
                    value={review.score}
                    onChange={(e) => setReview({ ...review, score: +e.target.value })}
                    required
                />
                <input
                    placeholder="Nhận xét"
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    required
                />
                <input
                    placeholder="Người đánh giá"
                    value={review.reviewer}
                    onChange={(e) => setReview({ ...review, reviewer: e.target.value })}
                    required
                />
                <button type="submit">Gửi</button>
            </form>

            <button onClick={handleBack} style={{ marginTop: "20px" }}>
                Quay lại danh sách
            </button>
        </div>
    );
}

export default ViewUser;
