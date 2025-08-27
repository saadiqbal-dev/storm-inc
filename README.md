# Storm Inc - Frontend Project

A modern, responsive frontend template built with **HTML5**, **CSS3**, **JavaScript**, **Bootstrap 5**, and **jQuery**. Designed for Laravel integration following Google's modern web specifications.

## 🚀 Quick Start

1. **Clone/Download** this repository
2. **Open** `index.html` in your browser or serve with a local server
3. **Customize** the templates in `/src/pages/` for your needs
4. **Replace** placeholder content and images with your actual content

## 📁 Project Structure

```
storm-inc/
├── src/                          # Source files
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css         # Main stylesheet with BEM methodology
│   │   ├── js/
│   │   │   └── main.js          # Main JavaScript (no global pollution)
│   │   └── img/                 # WebP images and assets
│   ├── components/
│   │   ├── seo-meta.html        # SEO meta tags template
│   │   └── accessibility.html   # A11y components and guidelines
│   └── pages/
│       └── template-base.html   # Base HTML template
├── dist/                        # Production-ready assets (copy from src)
│   ├── css/
│   ├── js/
│   └── img/
├── index.html                   # Navigation index to all templates
└── README.md                    # This file
```

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Bootstrap** | 5.3.3 | CSS Framework & Components |
| **jQuery** | 3.7.1 | DOM manipulation & interactions |
| **HTML5** | Latest | Semantic markup |
| **CSS3** | Latest | Modern styling with CSS variables |
| **WebP** | - | Modern image format |

## ✨ Features

### 🎯 Core Features
- ✅ **Fully Responsive** - Mobile-first approach (320px+)
- ✅ **Bootstrap 5** integration via CDN
- ✅ **jQuery** for enhanced interactions
- ✅ **WebP Images** with automatic fallbacks
- ✅ **BEM CSS Methodology** for maintainable styles
- ✅ **No Inline Styles/Scripts** - External files only

### 🔍 SEO Optimized
- ✅ **Semantic HTML5** structure
- ✅ **Proper heading hierarchy** (h1→h6)
- ✅ **Meta tags template** with Open Graph & Twitter Cards
- ✅ **Structured data** (JSON-LD) ready
- ✅ **Clean, crawlable markup**

### ♿ Accessibility (A11y)
- ✅ **WCAG 2.1 AA** compliant
- ✅ **Keyboard navigation** support
- ✅ **Screen reader** optimized
- ✅ **Focus management** for dynamic content
- ✅ **ARIA attributes** where needed
- ✅ **Skip links** for navigation

### ⚡ Performance
- ✅ **Lighthouse Score ≥90** target
- ✅ **Lazy loading** for images
- ✅ **WebP format** with fallbacks
- ✅ **Minified assets** ready
- ✅ **Critical CSS** approach supported

## 🎨 Customization Guide

### 1. Update Brand Colors
Edit CSS variables in `src/assets/css/main.css`:
```css
:root {
  --primary-color: #your-brand-color;
  --secondary-color: #your-secondary-color;
  /* ... other variables */
}
```

### 2. Add New Pages
1. **Copy** `src/pages/template-base.html`
2. **Rename** to your page name
3. **Update** meta tags using `src/components/seo-meta.html`
4. **Customize** content sections
5. **Add** to navigation in `index.html`

### 3. Custom Components
Create reusable components in `/src/components/`:
```html
<!-- Example: src/components/card.html -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{TITLE}}</h5>
    <p class="card-text">{{CONTENT}}</p>
  </div>
</div>
```

### 4. Image Optimization
Follow the responsive image pattern:
```html
<picture>
  <source srcset="img/hero-large.webp" media="(min-width: 768px)">
  <source srcset="img/hero-medium.webp" media="(min-width: 480px)">
  <img src="img/hero-small.webp" alt="Description" loading="lazy">
</picture>
```

## 📱 Browser Support

- ✅ **Chrome** (latest)
- ✅ **Firefox** (latest)  
- ✅ **Safari** (latest)
- ✅ **Edge** (latest)
- ⚠️ **Legacy browsers** - Graceful degradation included

## 🧪 Testing Checklist

### Manual Testing
- [ ] **Mobile responsiveness** (320px - 1920px+)
- [ ] **Keyboard navigation** (Tab, Enter, Escape)
- [ ] **Screen reader** compatibility
- [ ] **Form validation** and error states
- [ ] **Loading states** and animations

### Automated Testing
```bash
# Lighthouse audit (install globally: npm install -g lighthouse)
lighthouse http://your-local-server --output=html

# Accessibility testing
# Use axe DevTools browser extension
```

## 🚢 Deployment & Handoff

### For Development
1. **Edit** files in `/src/` directory
2. **Test** locally with your preferred server
3. **Copy** finalized assets to `/dist/` when ready

### For Production (Laravel Integration)
1. **Copy** `/dist/` contents to Laravel public directory
2. **Update** asset paths in templates
3. **Replace** CDN links with local files if needed
4. **Configure** Laravel Mix/Vite for asset compilation

### Handoff Package
```
storm-inc-handoff/
├── dist/               # Production assets
├── src/                # Source files  
├── index.html          # Template navigation
├── lighthouse-report.html  # Performance report
└── README.md           # This documentation
```

## 📋 Laravel Integration Notes

### Blade Template Structure
```php
<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('partials.meta')
    <link href="{{ asset('css/main.css') }}" rel="stylesheet">
</head>
<body>
    @include('partials.header')
    
    <main role="main">
        @yield('content')
    </main>
    
    @include('partials.footer')
    <script src="{{ asset('js/main.js') }}"></script>
</body>
</html>
```

### Asset Management
- Use `php artisan storage:link` for public images
- Update paths: `../assets/img/` → `{{ asset('img/') }}`
- Consider Laravel Mix/Vite for asset compilation

## 🐛 Common Issues & Solutions

### Images Not Loading
- ✅ Check file paths are relative to HTML file
- ✅ Ensure WebP images exist (create fallbacks if needed)
- ✅ Verify image file names match HTML references

### JavaScript Errors
- ✅ Ensure jQuery loads before custom scripts
- ✅ Check browser console for specific errors
- ✅ Verify Bootstrap JS is loaded for interactive components

### Responsive Issues
- ✅ Test on actual devices, not just browser resize
- ✅ Check viewport meta tag is present
- ✅ Ensure Bootstrap grid classes are used correctly

## 📞 Support & Documentation

### Dependencies Documentation
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [jQuery Documentation](https://api.jquery.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Accessibility Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Evaluation Tool](https://wave.webaim.org/)

### Performance Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebP Converter](https://developers.google.com/speed/webp)

---

**Built with ❤️ for modern web development**

*This template follows Google's modern web specifications and is ready for Laravel integration.*