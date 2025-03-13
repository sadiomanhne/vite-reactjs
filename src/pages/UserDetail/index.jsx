import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UserDetail = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [user, setUser] = useState(null); // State lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // State xử lý trạng thái tải
  const [error, setError] = useState(null); // State xử lý lỗi

  useEffect(() => {
    // Hàm gọi API để lấy thông tin người dùng
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://67bfced4b9d02a9f22474c36.mockapi.io/api/v1/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Chỉ gọi lại khi userId thay đổi

  if (loading) {
    return <h2>Loading...</h2>; // Hiển thị khi đang tải
  }

  if (error) {
    return <h2>Error: {error}</h2>; // Hiển thị nếu có lỗi
  }

  if (!user) {
    return <h2>User not found</h2>; // Hiển thị nếu không tìm thấy người dùng
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ccc",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "20px auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2
        style={{
          textAlign: "center",
      
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        Thông tin chi tiết người dùng
      </h2>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={user.avatar}
          alt={user.name}
          
        />
      </div>
      <p style={{ color: "#555", marginBottom: "10px" }}>
        <strong>Tên:</strong> {user.name}
      </p>
      <p style={{ color: "#555", marginBottom: "10px" }}>
        <strong>Địa chỉ:</strong> {user.address}
      </p>
      <p style={{ color: "#555", marginBottom: "10px" }}>
        <strong>Ngày sinh:</strong>{" "}
        {new Date(user.dateOfBirth).toLocaleDateString()}
      </p>
      <p style={{ color: "#555", marginBottom: "10px" }}>
        <strong>Ngày tạo tài khoản:</strong>{" "}
        {new Date(user.createdAt).toLocaleDateString()}
      </p>

      <p style={{ color: "#555" }}>
        <strong>Date Picker:</strong>{" "}
        {new Date(user.DatePicker).toLocaleDateString()}
      </p>
    </div>
  );
};

export default UserDetail;
