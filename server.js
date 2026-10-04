const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware kiểm tra tuổi (age) theo yêu cầu
const checkAgeMiddleware = (req, res, next) => {
    const { age } = req.query;

    // Kiểm tra xem tham số age có được truyền lên hay không và có phải là số hợp lệ không
    if (!age || isNaN(age)) {
        return res.status(400).json({
            error: "Vui lòng cung cấp tham số 'age' hợp lệ qua Query String."
        });
    }

    const parsedAge = parseInt(age, 10);

    // Nếu age < 18, trả về lỗi và chặn request không cho đi tiếp
    if (parsedAge < 18) {
        return res.status(403).json({
            error: "Truy cập bị từ chối. Bạn phải từ 18 tuổi trở lên."
        });
    }

    // Nếu age >= 18, tiếp tục xử lý sang Route Handler
    next();
};

// API route GET /api/info kết hợp sử dụng middleware kiểm tra tuổi
app.get('/api/info', checkAgeMiddleware, (req, res) => {
    // Lấy name và age từ Query String
    const { name, age } = req.query;

    // Trả về response[cite: 1]
    res.status(200).json({
        message: "Xác thực thành công!",
        data: {
            name: name || "Ẩn danh",
            age: parseInt(age, 10)
        }
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});