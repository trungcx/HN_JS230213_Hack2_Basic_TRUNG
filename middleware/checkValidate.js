const checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

// Midleware kiểm tra dữ liệu đầu vào
const validateData = (req, res, next) => {
  // Lấy content và points từ phần người dùng gửi lên
  const { Content } = req.body;
  if (checkIsEmpty(Content)) {
    return res.status(404).json({
      message: "Nội dung không được phép để trống",
    });
  }

  next();
};

module.exports = validateData;
