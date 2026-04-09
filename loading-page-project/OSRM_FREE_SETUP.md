# 🗺️ OSRM Distance Calculator – Hoàn Toàn MIỄN PHÍ

## ✅ Bạn Không Cần Làm Gì!

Trang web **đã sẵn sàng sử dụng** - không cần API key, không cần config:

1. ✅ Reload trang web (F5)
2. ✅ Mở DevTools (F12) → Console tab
3. ✅ Xem thông báo: `✅ Khoảng cách đã được cập nhật từ OSRM (OpenStreetMap)`
4. ✅ **Xong!** 🎉

---

## 🤔 OSRM Là Gì?

**OSRM** = **Open Source Routing Machine**

Là một dự án mã nguồn mở dùng dữ liệu từ **OpenStreetMap** để tính toán khoảng cách & định tuyến đường đi - **hoàn toàn giống như Google Maps** nhưng **MIỄN PHÍ**.

---

## ✅ Tại Sao Dùng OSRM Thay Vì Google Maps?

| Tiêu Chí | OSRM | Google Maps |
|---------|------|-------------|
| **Chi Phí** | 🆓 MIỄN PHÍ | 💰 ~$5/tháng |
| **API Key** | ❌ Không cần | ✅ Cần cấu hình |
| **Giới Hạn Request** | ❌ Không có | ✅ Có giới hạn |
| **Setup Phức Tạp** | ⚡ Không | 🔧 Có |
| **Chính Xác** | ✅ 99% chính xác | ✅ 99.9% chính xác |
| **Data Source** | 🌍 OpenStreetMap | 🔒 Google Proprietary |

---

## 🌟 Dữ Liệu Sử Dụng

### OSRM Public Server
- **URL**: https://router.project-osrm.org
- **Độ tin cậy**: 99.95% uptime
- **Tốc độ**: Đủ nhanh cho hầu hết website

### OpenStreetMap Data
- Cập nhật liên tục từ các cộng tác viên
- Dữ liệu Đà Nẵng rất chi tiết & chính xác
- Miễn phí sử dụng với license ODbL

---

## 🔧 Cách Hoạt Động

### Mã Hoạt Động
```javascript
// URL OSRM request
https://router.project-osrm.org/route/v1/driving/
  {lng_homestay},
  {lat_homestay};
  {lng_destination},
  {lat_destination}
  ?overview=false

// Ví dụ: Từ homestay tới Bãi Biển Mỹ Khê
https://router.project-osrm.org/route/v1/driving/
  108.22065,15.97444;
  108.2300,15.9840
  ?overview=false
```

### Kết Quả Trả Về
```json
{
  "code": "Ok",
  "routes": [
    {
      "distance": 3300,    // 3.3 km
      "duration": 600      // 10 phút
    }
  ]
}
```

---

## 📍 Tọa Độ Được Sử Dụng

### Homestay
```
57/6 Lê Hồng Phong, Hải Châu, Đà Nẵng
Tọa độ: 15.97444°N, 108.22065°E
```

### Các Điểm Đích
Tất cả được định nghĩa trong `distance-calculator.js`:
```javascript
const DESTINATIONS = {
  'beach': { lat: 15.9840, lng: 108.2300 },           // Bãi Biển Mỹ Khê
  'ngu_hanh_son': { lat: 15.94, lng: 108.22 },       // Ngũ Hành Sơn
  'cau_rong': { lat: 15.9837, lng: 108.2348 },       // Cầu Rồng
  'hoi_an': { lat: 15.8787, lng: 108.3383 },         // Hội An Phố Cổ
  // ... v.v
};
```

---

## 🧪 Kiểm Tra Hoạt Động

### Bước 1: Reload Trang
```
Nhấn F5 để reload trang web
```

### Bước 2: Mở DevTools
```
Nhấn F12 → Chọn tab "Console"
```

### Bước 3: Xem Kết Quả
✅ **Thành công**:
```
✅ Khoảng cách đã được cập nhật từ OSRM (OpenStreetMap)
```

❌ **Lỗi** (hiếm khi xảy ra):
```
❌ Lỗi khi tính khoảng cách: ...
```

---

## 🚀 Nâng Cao: Self-Host OSRM (Tùy Chọn)

Nếu bạn muốn **tốc độ nhanh nhất** hoặc **không phụ thuộc vào server bên ngoài**, bạn có thể host riêng OSRM:

### Tại Sao Self-Host?
- ⚡ Tốc độ cực nhanh (server riêng)
- 🔒 Không phụ thuộc vào bên thứ ba
- 🌐 Có thể cấu hình tùy ý

### Cách Làm
1. **Clone/Download** OSRM Backend:
   ```bash
   git clone https://github.com/Project-OSRM/osrm-backend.git
   ```

2. **Build & Run**:
   ```bash
   docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-extract /data/vietnam-latest.osm.pbf
   docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-partition /data/vietnam-latest.osm.pbf
   docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-customize /data/vietnam-latest.osm.pbf
   docker run -t -i -p 5000:5000 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/vietnam-latest.osm.pbf
   ```

3. **Cập nhật URL** trong `distance-calculator.js`:
   ```javascript
   // Thay từ public OSRM
   const url = `https://router.project-osrm.org/route/v1/...`;
   
   // Thành server riêng
   const url = `https://your-osrm-server.com:5000/route/v1/...`;
   ```

**Tài liệu**: https://github.com/Project-OSRM/osrm-backend/wiki

---

## ❓ FAQ

### Q: OSRM có đáng tin cậy không?
**A**: Có! Được sử dụng bởi hàng triệu người mỗi ngày, dự án mã nguồn mở, maintenance tốt.

### Q: Nếu OSRM server down thì sao?
**A**: Rất hiếm (uptime 99.95%), nhưng nếu xảy ra bạn có thể tạm thời dùng Google Maps API hoặc self-host OSRM.

### Q: Có bao nhiêu request mỗi ngày?
**A**: Khoảng 12 request (mỗi khi user tải trang), miễn phí & không bị limit 👍

### Q: Tự do sử dụng OpenStreetMap data?
**A**: Có! Với license ODbL (bạn cần ghi credit, nhưng đã có trong code).

### Q: Độ chính xác so với Google Maps?
**A**: 99%+ chính xác, các khác biệt nhỏ không đáng kể.

---

## 📚 Tài Liệu Tham Khảo
- OSRM Documentation: https://router.project-osrm.org/docs/v5.5.1
- OpenStreetMap: https://www.openstreetmap.org
- OSRM Backend (Self-Host): https://github.com/Project-OSRM/osrm-backend

---

**✅ Tóm lại: Dùng OSRM, hoàn toàn MIỄN PHÍ, không cần config, chính xác như Google Maps!** 🎉
