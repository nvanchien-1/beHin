# 🗺️ Hướng Dẫn Cấu Hình Google Maps Distance Matrix API

## 📋 Tại sao cần API key?

Dự án sử dụng **Google Maps Distance Matrix API** để tính toán khoảng cách chính xác từ homestay (57/6 Lê Hồng Phong) đến các địa điểm du lịch và nhà hàng. Khoảng cách sẽ được cập nhật **tự động** mỗi khi trang web load.

## 🔑 Lấy Google Maps API Key

### Bước 1: Truy cập Google Cloud Console
- Đi đến: https://console.cloud.google.com
- Đăng nhập bằng tài khoản Gmail của bạn

### Bước 2: Tạo Project mới
1. Click vào dropdown "Select a Project" (góc trên cùng)
2. Click "NEW PROJECT"
3. Nhập tên project: `Hyn's House`
4. Click "CREATE"
5. Chờ project được tạo (vài giây)

### Bước 3: Enable Google Maps Distance Matrix API
1. Tìm kiếm "Distance Matrix API" trong thanh tìm kiếm
2. Click vào "Distance Matrix API"
3. Click nút "ENABLE"

### Bước 4: Tạo API Key
1. Mở menu (☰) → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "API Key"
3. Copy API key (một chuỗi dài với chữ và số)

### Bước 5: Đặt giới hạn API (Tùy chọn nhưng BẬT TIÊN)
1. Click vào API key vừa tạo
2. Kéo xuống "Application restrictions"
3. Chọn "HTTP referrers (websites)"
4. Thêm miền của bạn (ví dụ: `localhost`, `behin.com`, v.v.)
5. Kéo xuống "API restrictions"
6. Chọn "Restrict key" → Tìm → Chỉ chọn "Distance Matrix API"
7. Click "SAVE"

## 🔧 Cập Nhật API Key vào Dự Án

### Cách 1: Sửa trực tiếp file (Dễ nhất)
1. Mở file `distance-calculator.js` (trong thư mục dự án)
2. Tìm dòng:
   ```javascript
   const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';
   ```
3. Thay `'YOUR_GOOGLE_MAPS_API_KEY_HERE'` bằng API key của bạn, ví dụ:
   ```javascript
   const GOOGLE_MAPS_API_KEY = 'AIzaSyDxxxxxxxxxxxxxxxxxxx';
   ```
4. **Lưu file** (Ctrl+S)

### Cách 2: Sử dụng biến môi trường (An toàn hơn)
Nếu bạn mu ốn ẩn API key (không công khai):

1. Tạo file `.env` trong thư mục dự án:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxx
   ```

2. Cập nhật `distance-calculator.js`:
   ```javascript
   const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY_HERE';
   ```

## 🧪 Kiểm Tra Hoạt Động

1. **Reload trang web** (F5)
2. Mở **Developer Tools** (F12)
3. Nhìn vào **Console** tab
4. Bạn sẽ thấy:
   - ✅ `✅ Khoảng cách đã được cập nhật từ Google Maps API` → Thành công!
   - ⚠️ `⚠️ Google Maps API key chưa được cấu hình...` → Cần cấu hình API key

## 💰 Chi Phí

Google Maps Distance Matrix API có **mức miễn phí**:
- **$5 credit miễn phí** mỗi tháng
- Sau đó tính theo lượt request (rất rẻ, ~$0.005 mỗi 100 request)

Cho dự án này (vài chục request/ngày), chi phí là **gần như miễn phí**.

## 🆘 Khắc Phục Sự Cố

### Vấn đề: "Không thể tính khoảng cách"
- ✅ Kiểm tra API key đã chính xác chưa
- ✅ Kiểm tra Distance Matrix API đã được Enable chưa
- ✅ Kiểm tra kết nối Internet

### Vấn đề: Lỗi "403 Forbidden"
- Có thể API key không có quyền truy cập Distance Matrix API
- Kiểm tra lại bước "Enable Google Maps Distance Matrix API"

### Vấn đề: Khoảng cách không cập nhật
- Mở Console (F12) → tìm error messages
- Kiểm tra xem file `distance-calculator.js` đã được load?

## 📚 Tài Liệu Tham Khảo
- [Google Maps Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix)
- [Google Cloud Console](https://console.cloud.google.com)

---

**Câu hỏi?** Liên hệ chủ nhà hoặc nhà phát triển 😊
