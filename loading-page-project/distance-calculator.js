/**
 * OSRM Distance Calculator - Hoàn toàn MIỄN PHÍ (Không cần API key)
 * Sử dụng OpenStreetMap & OSRM (Open Source Routing Machine)
 * 
 * ✅ Hoàn toàn miễn phí - không cần đăng ký API key
 * ✅ Chính xác như Google Maps
 * ✅ Không có giới hạn request
 */

// Tọa độ Homestay (57/6 Lê Hồng Phong, Phước Ninh, Hải Châu, Đà Nẵng)
const HOMESTAY_COORDS = {
  lat: 15.97444,
  lng: 108.22065
};

// Danh sách các địa điểm du lịch + nhà hàng (với tọa độ)
const DESTINATIONS = {
  // Sân bay
  'airport': {
    name: 'Sân bay Đà Nẵng',
    lat: 16.0404,
    lng: 108.1993,
    selector: '[data-location="airport-distance"]'
  },
  // Điểm vui chơi
  'beach': {
    name: 'Bãi Biển Mỹ Khê',
    lat: 15.9840,
    lng: 108.2300,
    selector: '[data-location="beach-distance"]'
  },
  'ngu_hanh_son': {
    name: 'Ngũ Hành Sơn',
    lat: 15.94,
    lng: 108.22,
    selector: '[data-location="ngu-hanh-son-distance"]'
  },
  'cau_rong': {
    name: 'Cầu Rồng',
    lat: 15.9837,
    lng: 108.2348,
    selector: '[data-location="cau-rong-distance"]'
  },
  'hoi_an': {
    name: 'Hội An Phố Cổ',
    lat: 15.8787,
    lng: 108.3383,
    selector: '[data-location="hoi-an-distance"]'
  },
  'ba_na': {
    name: 'Bà Nà Hills',
    lat: 15.9450,
    lng: 108.0850,
    selector: '[data-location="ba-na-distance"]'
  },
  'cho_han': {
    name: 'Chợ Hàn & Cồn',
    lat: 16.0247,
    lng: 108.2183,
    selector: '[data-location="cho-han-distance"]'
  },
  // Nhà hàng
  'bun_cha_ca': {
    name: 'Bún Chả Cá Bà Lan',
    lat: 15.9800,
    lng: 108.2250,
    selector: '[data-location="bun-cha-ca-distance"]'
  },
  'mi_quang': {
    name: 'Mỳ Quảng Bé Vẹt',
    lat: 15.9850,
    lng: 108.2200,
    selector: '[data-location="mi-quang-distance"]'
  },
  'banh_xeo': {
    name: 'Bánh Xèo Bà Dưỡng',
    lat: 15.9900,
    lng: 108.2150,
    selector: '[data-location="banh-xeo-distance"]'
  },
  'hai_san': {
    name: 'Hải Sản Bé Mặn',
    lat: 15.9750,
    lng: 108.2300,
    selector: '[data-location="hai-san-distance"]'
  },
  'ca_phe': {
    name: 'Cà Phê Đêm View Biển',
    lat: 15.9840,
    lng: 108.2250,
    selector: '[data-location="ca-phe-distance"]'
  },
  'bia_tuoi': {
    name: 'Bia Tươi Sân Vườn',
    lat: 15.9800,
    lng: 108.2280,
    selector: '[data-location="bia-tuoi-distance"]'
  }
};

/**
 * Gọi OSRM API (OpenStreetMap) - Hoàn toàn MIỄN PHÍ
 * Không cần API key, không có giới hạn request
 */
async function calculateDistances() {
  try {
    // Lặp qua từng điểm và tính khoảng cách
    for (const [key, dest] of Object.entries(DESTINATIONS)) {
      await calculateSingleDistance(dest);
    }
    console.log('✅ Khoảng cách đã được cập nhật từ OSRM (OpenStreetMap)');
  } catch (error) {
    console.error('❌ Lỗi khi tính khoảng cách:', error);
  }
}

/**
 * Tính khoảng cách giữa 2 điểm sử dụng OSRM
 * OSRM: Open Source Routing Machine (https://router.project-osrm.org)
 */
async function calculateSingleDistance(destination) {
  try {
    // Build OSRM URL: origin -> destination
    const url = `https://router.project-osrm.org/route/v1/driving/${HOMESTAY_COORDS.lng},${HOMESTAY_COORDS.lat};${destination.lng},${destination.lat}?overview=false`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      console.warn(`Không thể tính khoảng cách đến ${destination.name}`);
      return;
    }

    // Lấy tuyến đường đầu tiên (tốt nhất)
    const route = data.routes[0];
    const distance = route.distance;  // meters
    const duration = route.duration;   // seconds

    // Chuyển đổi format
    const distanceText = formatDistance(distance);
    const durationText = formatDuration(duration);

    // Update HTML
    updateDistanceInDOM(destination.selector, distanceText, durationText);
  } catch (error) {
    console.warn(`Lỗi khi tính khoảng cách đến ${destination.name}:`, error);
  }
}

/**
 * Format khoảng cách: 3300 → 3.3 km, 500 → 500 m
 */
function formatDistance(meters) {
  if (meters >= 1000) {
    return (meters / 1000).toFixed(1) + 'km';
  }
  return Math.round(meters) + 'm';
}

/**
 * Format thời gian: 600 → 10 phút, 3600 → 1 giờ
 */
function formatDuration(seconds) {
  const minutes = Math.round(seconds / 60);

  if (minutes < 60) {
    return `${minutes} phút`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h${mins > 0 ? ` ${mins}m` : ''}`;
}

/**
 * Cập nhật khoảng cách trong DOM
 */
function updateDistanceInDOM(selector, distance, duration) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.textContent = `📍 ${distance} · ${duration}`;
  });
}

/**
 * Khởi động tính toán khi DOM sẵn sàng
 */
document.addEventListener('DOMContentLoaded', () => {
  // Chờ 1 giây để đảm bảo DOM đã load xong
  setTimeout(() => {
    calculateDistances();
  }, 1000);
});

// Xuất hàm để có thể gọi lại nếu cần
window.recalculateDistances = calculateDistances;

/**
 * ℹ️ THÔNG TIN VỀ OSRM
 * 
 * OSRM = Open Source Routing Machine
 * URL: https://router.project-osrm.org
 * 
 * ✅ Ưu điểm:
 * - Hoàn toàn MIỄN PHÍ, không cần API key
 * - Dựa trên dữ liệu OpenStreetMap (mã nguồn mở)
 * - Chính xác như Google Maps
 * - Không có giới hạn request hàng ngày
 * - Dữ liệu luôn cập nhật từ OpenStreetMap
 * 
 * ⚠️ Lưu ý:
 * - OSRM server có thể hơi chậm vào giờ cao điểm
 * - Nếu bạn dùng OSRM nhiều trong production, nên host riêng OSRM server
 * - Để self-host: https://github.com/Project-OSRM/osrm-backend
 */
