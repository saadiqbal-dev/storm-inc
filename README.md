# Storm Inc - Digital Marketing Website

A modern, responsive static website built for Storm Inc, a digital marketing agency. This project is designed to be integrated with Laravel Blade templates for backend functionality.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [CSS Architecture](#-css-architecture)
- [JavaScript Architecture](#-javascript-architecture)
- [HTML Structure](#-html-structure)
- [Deployment Guide](#-deployment-guide)
- [Laravel Blade Integration](#-laravel-blade-integration)
- [Development Guide](#-development-guide)
- [Browser Support](#-browser-support)

## 🎯 Project Overview

Storm Inc is a fully responsive digital marketing agency website featuring:
- Modern, clean design with custom typography (Peachi font family)
- Mobile-first responsive layout with breakpoint at 768px
- Modular CSS architecture for easy maintenance
- Performance-optimized with lazy loading and WebP images
- SEO-friendly semantic HTML5 structure
- Accessibility features (WCAG 2.1 AA compliant)

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | Latest | Semantic markup structure |
| **CSS3** | Latest | Modular styling with BEM methodology |
| **JavaScript** | ES6 | Interactive functionality |
| **jQuery** | 3.7.1 | DOM manipulation & Bootstrap support |
| **Bootstrap** | 5.3.0 | Grid system & UI components |
| **Peachi Font** | Custom | Brand typography |
| **Mona Sans** | Google Font | Secondary typography |

## 📁 Project Structure

```
storm-inc/
├── src/                              # Source files directory
│   ├── index.html                   # Main HTML file with all sections
│   ├── assets/                      # All static assets
│   │   ├── css/                     # Modular CSS files
│   │   │   ├── base.css            # Reset and foundational styles
│   │   │   ├── fonts.css           # Font face declarations
│   │   │   ├── header.css          # Header & navigation styles
│   │   │   ├── hero.css            # Hero section styles
│   │   │   ├── company.css         # Company section styles
│   │   │   ├── industry.css        # Industry section styles
│   │   │   ├── services.css        # Services section styles
│   │   │   ├── partners.css        # Partners section styles
│   │   │   ├── join.css            # Join section styles
│   │   │   ├── testimonials.css    # Testimonials carousel styles
│   │   │   ├── footer.css          # Footer section styles
│   │   │   ├── utilities.css       # Helper classes
│   │   │   ├── responsive-768.css  # Mobile responsive overrides
│   │   │   └── google-animation.css # Google animation styles
│   │   ├── js/                     # JavaScript files
│   │   │   ├── main.js             # Core application logic
│   │   │   ├── carousel.js         # Carousel functionality
│   │   │   └── google-animation.js # Animation scripts
│   │   ├── img/                    # Images directory
│   │   │   ├── logo-black.svg      # Black logo variant
│   │   │   ├── logo-white.svg      # White logo variant
│   │   │   ├── hero-*.jpg          # Hero section images
│   │   │   └── [other images]      # Various section images
│   │   └── fonts/                  # Custom font files
│   │       ├── Peachi-Regular.woff2
│   │       ├── Peachi-Light.woff2
│   │       └── Peachi-Medium.woff2
│   ├── components/                 # Reusable HTML components (future)
│   └── pages/                      # Additional pages (future)
├── dist/                           # Production-ready assets (legacy)
├── vercel.json                     # Vercel deployment configuration
├── CLAUDE.md                       # AI assistant documentation
└── README.md                       # This file
```

## 🎨 CSS Architecture

### Modular Approach

The CSS is organized into specialized modules for maintainability:

1. **base.css** - CSS reset, root variables, base typography
2. **fonts.css** - @font-face declarations for Peachi fonts
3. **header.css** - Navigation bar, mobile menu, logo styles
4. **hero.css** - Hero section with transparent header overlay
5. **company.css** - Company/about section styles
6. **industry.css** - Industry expertise section
7. **services.css** - Services cards and layouts
8. **partners.css** - Partner logos and carousel
9. **join.css** - Join/CTA section with split layout
10. **testimonials.css** - Customer testimonials carousel
11. **footer.css** - Footer navigation and contact info
12. **utilities.css** - Helper classes (spacing, text, display)
13. **responsive-768.css** - Mobile-specific overrides (≤768px)
14. **google-animation.css** - Special animation effects

### CSS Methodology

- **BEM (Block Element Modifier)** naming convention
- **CSS Custom Properties** for theming
- **Mobile-first** responsive design
- **Utility classes** for common patterns

### Key CSS Variables

```css
:root {
  /* Colors */
  --primary-color: #FF5964;
  --secondary-color: #000000;
  --white: #FFFFFF;
  
  /* Typography */
  --font-primary: 'Peachi', sans-serif;
  --font-secondary: 'Mona Sans', sans-serif;
  
  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 48px;
  --spacing-xl: 80px;
  
  /* Breakpoints */
  --breakpoint-mobile: 768px;
}
```

## 💻 JavaScript Architecture

### Main Application Structure (main.js)

The JavaScript follows a **namespace pattern** to avoid global scope pollution:

```javascript
StormApp = {
  config: {
    breakpoints: { /* responsive breakpoints */ },
    animationDuration: 300,
    debounceDelay: 250
  },
  
  utils: {
    debounce(),      // Performance optimization
    throttle(),      // Scroll event optimization
    scrollToElement(), // Smooth scrolling
    isInViewport()   // Visibility detection
  },
  
  navigation: {
    setupSmoothScroll(),      // Anchor link scrolling
    setupMobileMenuBehavior(), // Mobile menu (≤768px)
    setupActiveStateTracking() // Active nav highlighting
  },
  
  forms: {
    setupValidation(),  // Real-time validation
    setupSubmission()   // AJAX form handling
  },
  
  performance: {
    setupLazyLoading(),      // Image lazy loading
    setupImageOptimization() // WebP detection
  },
  
  accessibility: {
    setupKeyboardNavigation(), // Keyboard shortcuts
    setupFocusManagement(),    // Focus trapping
    setupARIAEnhancements()    // Screen reader support
  }
}
```

### Key JavaScript Features

- **Mobile Menu System**: Custom full-screen overlay menu for mobile devices
- **Smooth Scrolling**: Animated scroll to sections
- **Form Validation**: Real-time field validation with visual feedback
- **Lazy Loading**: Native lazy loading with IntersectionObserver fallback
- **WebP Detection**: Automatic fallback for unsupported browsers
- **Accessibility**: Full keyboard navigation and screen reader support

## 📄 HTML Structure

### index.html Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags -->
  <!-- Font preloading -->
  <!-- CSS files with PHP versioning -->
</head>
<body>
  <!-- Mobile Header (≤768px) -->
  <div class="mobile-header">...</div>
  <div class="mobile-menu">...</div>
  
  <!-- Desktop Header -->
  <header class="header">...</header>
  
  <!-- Main Content -->
  <main>
    <!-- Hero Section -->
    <section class="hero">...</section>
    
    <!-- Company Section -->
    <section class="company">...</section>
    
    <!-- Industry Section -->
    <section class="industry">...</section>
    
    <!-- Services Section -->
    <section class="services">...</section>
    
    <!-- Partners Section -->
    <section class="partners">...</section>
    
    <!-- Additional Sections -->
    <section>...</section>
  </main>
  
  <!-- Footer -->
  <footer class="footer">...</footer>
  
  <!-- Scripts -->
</body>
</html>
```

### Key HTML Features

- **Semantic HTML5 elements** for better SEO
- **ARIA labels** for accessibility
- **Structured data** ready for JSON-LD
- **PHP versioning** on assets (`?v=<?php echo time(); ?>`)
- **Responsive images** with WebP format

## 🚀 Deployment Guide

### Vercel Deployment

The project includes a `vercel.json` configuration:

```json
{
  "buildCommand": "echo 'No build required'",
  "outputDirectory": "src",
  "framework": null,
  "headers": [
    {
      "source": "/assets/css/(.*)",
      "headers": [{
        "key": "Cache-Control",
        "value": "public, max-age=0, must-revalidate"
      }]
    }
  ],
  "cleanUrls": true
}
```

#### Deploy Steps:

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Login**: `vercel login`
3. **Deploy**: `vercel` (in project root)
4. **Production**: `vercel --prod`

### Manual Deployment

1. Upload contents of `/src/` to web server
2. Ensure proper MIME types for fonts (woff2)
3. Configure cache headers for assets
4. Enable GZIP compression

## 🔧 Laravel Blade Integration

### Converting to Blade Templates

#### 1. Layout Template (resources/views/layouts/app.blade.php)

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Storm Inc - Digital Marketing')</title>
    
    <!-- CSS Files -->
    <link href="{{ asset('css/fonts.css') }}?v={{ filemtime(public_path('css/fonts.css')) }}" rel="stylesheet">
    <link href="{{ asset('css/base.css') }}?v={{ filemtime(public_path('css/base.css')) }}" rel="stylesheet">
    <!-- Add other CSS files -->
    
    @stack('styles')
</head>
<body>
    @include('partials.header')
    
    <main>
        @yield('content')
    </main>
    
    @include('partials.footer')
    
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/main.js') }}?v={{ filemtime(public_path('js/main.js')) }}"></script>
    @stack('scripts')
</body>
</html>
```

#### 2. Component Example (resources/views/components/service-card.blade.php)

```blade
<div class="service-card">
    <div class="service-card__icon">
        <img src="{{ asset($icon) }}" alt="{{ $title }}">
    </div>
    <h3 class="service-card__title">{{ $title }}</h3>
    <p class="service-card__description">{{ $description }}</p>
    <a href="{{ $link }}" class="service-card__link">Learn More</a>
</div>
```

#### 3. Asset Path Updates

Replace static paths with Laravel helpers:
- `src/assets/img/` → `{{ asset('img/filename.jpg') }}`
- `href="assets/css/` → `href="{{ asset('css/filename.css') }}"`
- `src="assets/js/` → `src="{{ asset('js/filename.js') }}"`

#### 4. Dynamic Content Integration

```blade
<!-- Services Section -->
<section class="services">
    <div class="container">
        <div class="row">
            @foreach($services as $service)
                <div class="col-md-4">
                    <x-service-card 
                        :title="$service->title"
                        :description="$service->description"
                        :icon="$service->icon_path"
                        :link="route('services.show', $service->slug)"
                    />
                </div>
            @endforeach
        </div>
    </div>
</section>
```

### File Organization for Laravel

```
laravel-project/
├── public/
│   ├── css/         # Copy from src/assets/css/
│   ├── js/          # Copy from src/assets/js/
│   ├── img/         # Copy from src/assets/img/
│   └── fonts/       # Copy from src/assets/fonts/
├── resources/
│   └── views/
│       ├── layouts/
│       │   └── app.blade.php
│       ├── partials/
│       │   ├── header.blade.php
│       │   ├── footer.blade.php
│       │   └── mobile-menu.blade.php
│       ├── components/
│       │   ├── service-card.blade.php
│       │   └── partner-logo.blade.php
│       └── pages/
│           ├── home.blade.php
│           └── about.blade.php
```

## 👨‍💻 Development Guide

### Local Development

```bash
# Using Python
python3 -m http.server 8000
# Visit: http://localhost:8000/src/

# Using PHP
php -S localhost:8000 -t src/
# Visit: http://localhost:8000/

# Using Node.js (http-server)
npx http-server src/ -p 8000
# Visit: http://localhost:8000/
```

### Making Changes

1. **CSS Changes**: Edit modular CSS files in `src/assets/css/`
2. **JavaScript**: Modify `src/assets/js/main.js` using StormApp namespace
3. **HTML**: Update `src/index.html` maintaining semantic structure
4. **Images**: Add WebP format images to `src/assets/img/`

### Best Practices

1. **Always use semantic HTML5 elements**
2. **Follow BEM naming for CSS classes**
3. **Keep JavaScript within StormApp namespace**
4. **Optimize images (WebP format, lazy loading)**
5. **Test on mobile devices (not just browser resize)**
6. **Maintain accessibility features (ARIA, keyboard nav)**
7. **Use CSS variables for theming**

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | Latest | ✅ Full |
| Edge | Latest | ✅ Full |
| Mobile Safari | iOS 12+ | ✅ Full |
| Chrome Mobile | Latest | ✅ Full |
| IE 11 | - | ⚠️ Basic (no WebP, limited CSS) |

## 📝 Important Notes for Backend Integration

1. **Cache Busting**: PHP timestamps (`?v=<?php echo time(); ?>`) should be replaced with Laravel's `mix()` or `vite()` helpers
2. **Form Handling**: Forms are prepared for AJAX but need backend endpoints
3. **SEO Meta**: Meta tags in HTML should be dynamic in Blade templates
4. **Mobile Menu**: Separate mobile menu system (≤768px) from desktop
5. **Image Paths**: All image paths need conversion to Laravel asset helpers
6. **Font Loading**: Ensure proper CORS headers for font files
7. **API Integration**: JavaScript is ready for API calls with loading states

## 🔍 Performance Considerations

- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Total Blocking Time**: < 300ms
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score Target**: ≥ 90

## 🐛 Troubleshooting

### Common Issues

1. **Fonts not loading**: Check CORS headers and file paths
2. **Mobile menu not working**: Verify JavaScript is loaded
3. **CSS cache issues**: Clear browser cache or update version parameter
4. **Images not displaying**: Check WebP support and fallbacks
5. **JavaScript errors**: Ensure jQuery loads before main.js

---

**Built for Storm Inc** | Ready for Laravel Blade Integration | Mobile-First Responsive Design