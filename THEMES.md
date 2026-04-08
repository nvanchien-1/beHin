# 🎨 beHin Loading Page – Theme Variations Guide

> Choose from 6 beautiful pre-designed themes or easily create your own

---

## 🚀 Quick Start

### Basic Setup (No Themes)
The default loading page comes with **Beach Vibes** theme built-in. No additional files needed.

```html
<!-- Default beach theme -->
<html lang="vi">
  <!-- ... uses style.css only -->
</html>
```

### Enable Theme System
To use theme variants, include the optional themes file:

```html
<!-- In <head> -->
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="themes.css">  <!-- Optional themes -->

<!-- On <body> -->
<body data-theme="beach">
  <!-- Or change to: cozy, luxury, minimal, tropical -->
</body>
```

---

## 🎭 Available Themes

### 1️⃣ **Beach Vibes** (Default)
- **Vibe**: Đà Nẵng ocean sunset
- **Colors**: Gold (#C9A96E), Light Gold (#E8D5B0)
- **Overlay**: Warm Mediterranean
- **Best For**: Beach resorts, seaside villas
- **Usage**: `data-theme="beach"` (or omit attribute)

```html
<body data-theme="beach">
```

**Visual Features:**
- Soft golden gradients
- Ocean-inspired particle effects
- Warm but not too saturated
- Ideal for tropical/coastal properties

---

### 2️⃣ **Cozy Homestay**
- **Vibe**: Warm wooden interior
- **Colors**: Tan (#D4A574), Warm Beige (#E8C895)
- **Overlay**: Deep brown tones
- **Best For**: Mountain lodges, rural homestays
- **Usage**: `data-theme="cozy"`

```html
<body data-theme="cozy">
```

**Visual Features:**
- Earthy, warm palette
- Intimate atmosphere
- Wooden texture vibes
- Sandy/brown particle effects
- Great for intimate, welcoming properties

---

### 3️⃣ **Luxury Airbnb**
- **Vibe**: Ultra-premium, sophisticated
- **Colors**: Gold (#D4AF37), Wheat (#F0E68C)
- **Overlay**: Deep black with subtle gold
- **Best For**: High-end villas, luxury resorts
- **Usage**: `data-theme="luxury"`

```html
<body data-theme="luxury">
```

**Visual Features:**
- Rich dark background
- Dramatic gold accents
- Premium feel like Airbnb Luxury Rooms
- Enhanced contrast & saturation
- Golden particle shimmer
- Perfect for 5-star properties

**Performance Note:** Luxury theme uses stronger blur effects (60px). On mobile, automatically reduces to 32px.

---

### 4️⃣ **Modern Minimal**
- **Vibe**: Clean, contemporary, no-frills
- **Colors**: Gray (#808080), Silver (#C0C0C0)
- **Overlay**: Simple dark gray
- **Best For**: Modern apartments, minimalist design
- **Usage**: `data-theme="minimal"`

```html
<body data-theme="minimal">
```

**Visual Features:**
- Monochromatic grayscale
- Zen, calm aesthetic
- Reduced visual noise
- Subdued particles
- Great for corporate/modern properties

---

### 5️⃣ **Tropical Sunset**
- **Vibe**: Vibrant, warm, energetic
- **Colors**: Orange (#FF8C42), Light Orange (#FFB84D)
- **Overlay**: Deep tropical brown
- **Best For**: Tropical resorts, active lifestyle properties
- **Usage**: `data-theme="tropical"`

```html
<body data-theme="tropical">
```

**Visual Features:**
- Vibrant orange/coral palette
- Animated particle rotations (360°)
- Enhanced saturation & brightness
- Warm, energetic feeling
- Perfect for adventure/beach properties

---

## 🎨 Visual Comparison

| Theme | Primary Color | Mood | Best For |
|-------|--------------|------|----------|
| 🏖️ **Beach** | Gold (#C9A96E) | Relaxing | Beach villas |
| 🏡 **Cozy** | Tan (#D4A574) | Intimate | Mountain lodges |
| 💎 **Luxury** | Gold (#D4AF37) | Sophisticated | High-end resorts |
| ⚪ **Minimal** | Gray (#808080) | Clean | Modern apartments |
| 🌅 **Tropical** | Orange (#FF8C42) | Vibrant | Tropical resorts |

---

## 🔧 How to Apply a Theme

### Method 1: HTML Attribute (Recommended)
```html
<!DOCTYPE html>
<html lang="vi">
<body data-theme="luxury">
  <!-- Rest of your page -->
</body>
</html>
```

### Method 2: JavaScript (Runtime Change)
```javascript
// Change theme dynamically
document.body.setAttribute('data-theme', 'tropical');

// Or switch on user interaction
document.getElementById('theme-selector').addEventListener('change', (e) => {
  document.body.setAttribute('data-theme', e.target.value);
});
```

### Method 3: CSS Class (Alternative)
```html
<body class="theme-luxury">
  <!-- Requires custom CSS mapping -->
</body>
```

---

## 🎬 Customizing Themes

### Create Your Own Theme
Edit `themes.css` and add:

```css
/* MY CUSTOM THEME */
[data-theme="custom"] {
  --theme-primary: #YourColor1;
  --theme-light: #YourColor2;
  --theme-dark: #YourColor3;
  --theme-overlay-1: rgba(R, G, B, A);
  --theme-overlay-2: rgba(R, G, B, A);
  --theme-overlay-3: rgba(R, G, B, A);
  --theme-accent: #YourAccent;
}

/* Optional: Override specific elements */
[data-theme="custom"] .logo-icon {
  background: linear-gradient(135deg, 
    var(--theme-dark), 
    var(--theme-primary), 
    var(--theme-light));
}

[data-theme="custom"] .particle {
  background: radial-gradient(circle, 
    var(--theme-accent), 
    transparent);
}
```

Then use: `<body data-theme="custom">`

### Modify Theme Colors
Simply change the CSS variables:

```css
[data-theme="beach"] {
  --theme-primary: #YOUR_NEW_COLOR;
}
```

### Adjust Overlay Intensity
```css
[data-theme="beach"] .overlay {
  background: 
    linear-gradient(180deg, 
      rgba(R, G, B, 0.50) 0%,    /* Increase/decrease alpha (0-1) */
      rgba(R, G, B, 0.60) 35%,
      rgba(R, G, B, 0.85) 100%);
}
```

---

## 🔄 Theme Switching Example

```html
<!-- Theme selector dropdown -->
<div class="theme-selector">
  <label for="themes">Choose Theme:</label>
  <select id="themes">
    <option value="beach">🏖️ Beach Vibes</option>
    <option value="cozy">🏡 Cozy Homestay</option>
    <option value="luxury">💎 Luxury Airbnb</option>
    <option value="minimal">⚪ Modern Minimal</option>
    <option value="tropical">🌅 Tropical Sunset</option>
  </select>
</div>

<script>
  document.getElementById('themes').addEventListener('change', (e) => {
    document.body.setAttribute('data-theme', e.target.value);
    // Optional: Save preference
    localStorage.setItem('beHin-theme', e.target.value);
  });

  // Optional: Restore saved theme on page load
  const savedTheme = localStorage.getItem('beHin-theme') || 'beach';
  document.body.setAttribute('data-theme', savedTheme);
</script>
```

---

## 📱 Responsive Theme Behavior

### Mobile (< 768px)
- All themes automatically reduce blur strength for performance
- Particle animations remain smooth
- Typography scales appropriately

### Tablet (768px - 1199px)
- Medium blur strength maintained
- Full theme effects applied
- Optimal visual experience

### Desktop (≥ 1200px)
- Full theme effects with maximum blur
- All animations at full capability
- Split layout with right panel

---

## 🎯 Theme Color Reference

### Color Variables Used
```css
--theme-primary      /* Main accent color */
--theme-light        /* Light accent / highlight */
--theme-dark         /* Dark accent / shadow */
--theme-overlay-1    /* Primary overlay color */
--theme-overlay-2    /* Secondary overlay color */
--theme-overlay-3    /* Tertiary overlay color */
--theme-accent       /* Particle & highlight accent */
```

### How They're Applied
```css
/* Logo icon gradient */
.logo-icon {
  background: linear-gradient(135deg, 
    var(--theme-dark), 
    var(--theme-primary), 
    var(--theme-light));
}

/* Loading bar */
.loading-bar-fill {
  background: linear-gradient(90deg, 
    var(--theme-dark) 0%, 
    var(--theme-primary) 50%, 
    var(--theme-light) 100%);
}

/* Particle shimmer */
.particle {
  background: radial-gradient(circle, 
    var(--theme-accent),
    transparent);
}
```

---

## 🚀 Performance Notes

### Blur Strength by Theme
- **Beach**: 40px → 32px on mobile
- **Cozy**: 40px → 32px on mobile
- **Luxury**: 60px → 32px on mobile (most demanding)
- **Minimal**: 50px → 32px on mobile
- **Tropical**: 40px → 32px on mobile

### GPU Acceleration
- All themes use `will-change: transform, opacity`
- Backdrop blur handled by browser GPU
- Smooth 60fps animations guaranteed
- Test on throttled networks with DevTools

---

## 💡 Recommendations

### For Beach Properties
✓ Use **Beach Vibes** (default)
✓ Use high-quality ocean sunset images
✓ Keep imagery bright & airy

### For Mountain/Forest Properties
✓ Use **Cozy Homestay** theme
✓ Use wooden interior or forest landscapes
✓ Emphasize natural materials

### For Luxury 5-Star Properties
✓ Use **Luxury Airbnb** theme  
✓ Use high-end architectural photography
✓ Ensure image quality is premium (retina ready)

### For Modern Apartments/City
✓ Use **Modern Minimal** theme
✓ Use clean architectural photography
✓ Subtle, sophisticated messaging

### For Tropical Resorts
✓ Use **Tropical Sunset** theme
✓ Use vibrant, saturated tropical imagery
✓ Energetic, adventure-focused messaging

---

## 🧪 Testing Themes

### Browser DevTools
1. Open DevTools (F12)
2. Inspect `<body>` element
3. Edit attribute: `data-theme="theme-name"`
4. See live preview

### Console Commands
```javascript
// Test theme switching in browser console
document.body.setAttribute('data-theme', 'luxury');
document.body.setAttribute('data-theme', 'tropical');
document.body.setAttribute('data-theme', 'cozy');
```

### Verify Performance
1. Open DevTools → Performance tab
2. Record page load
3. Check FPS during animations (should stay ~60fps)
4. Monitor GPU usage

---

## ❓ FAQ

**Q: Can I use multiple themes together?**  
A: No, `data-theme` accepts one value. But you can create a hybrid theme in `themes.css`.

**Q: Do themes affect loading performance?**  
A: Minimal impact. Themes.css adds ~8KB. Blur strength automatically reduces on mobile.

**Q: How do I remove a theme from my build?**  
A: Simply don't link `themes.css`. The default beach theme is built into `style.css`.

**Q: Can I create animated theme transitions?**  
A: Yes! Add CSS transitions to theme variables.

**Q: Which theme loads fastest?**  
A: **Minimal** (lowest blur). **Luxury** is most demanding.

---

## 📞 Support

For theme-related issues:
1. Verify `themes.css` is linked
2. Check browser console for errors
3. Test with `data-theme` attribute
4. Compare with example HTML files

---

**Made with ❤️ for beHin – Luxury Homestay Platform**

*Themes created 2026 | Vietnam Travel Aesthetic*

