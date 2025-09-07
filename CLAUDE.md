# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Storm Inc is a static website built for digital marketing services, designed to be integrated with Laravel Blade templates. The project uses a modular CSS architecture, semantic HTML5, and modern JavaScript with jQuery for interactions.

## Key Architecture Decisions

### CSS Architecture
- **Modular CSS approach**: Styles are split into specialized files by component/section
- **BEM methodology**: Used for maintainable class naming
- **CSS files are versioned** with PHP timestamps (`?v=<?php echo time(); ?>`) in index.html for cache busting
- **Critical styles loaded in order**:
  1. fonts.css - Custom Peachi fonts and font definitions
  2. base.css - Reset and foundational styles  
  3. Component-specific CSS (header, hero, company, industry, services, partners, sections)
  4. utilities.css - Helper classes
  5. responsive-768.css - Mobile-specific overrides

### JavaScript Architecture
- **Namespace pattern**: All JS functionality wrapped in `StormApp` object to avoid global pollution
- **jQuery 3.7.1** and **Bootstrap 5.3.0** loaded via CDN
- **Mobile menu system**: Custom implementation for screens ≤768px with overlay menu
- **Performance optimizations**: Debounce/throttle utilities, lazy loading, WebP detection

### Laravel Blade Integration Points
- **PHP timestamp versioning** on assets for cache invalidation
- **Asset paths** will need conversion from relative to Laravel helpers: `{{ asset('path') }}`
- **Sections designed as components** for easy Blade templating

## Common Development Commands

Since this is a static site without a build process:

```bash
# Serve locally with Python
python3 -m http.server 8000 -d src

# Or with PHP
php -S localhost:8000 -t src/

# Or with Node.js http-server
npx http-server src/ -p 8000

# Update cache busting timestamps before deployment
./update-cache.sh

# Deploy to Vercel
vercel --prod

# Check for issues (no linting configured)
# Consider adding ESLint/Prettier for code quality
```

## Vercel Deployment Configuration

The `vercel.json` is configured with:
- Output directory: `src/`
- Cache headers optimized to prevent CSS/JS caching issues (must-revalidate)
- Image caching set to 1 year (immutable)
- Clean URLs enabled
- No build step required

## File Structure Notes

- **src/index.html**: Main entry point with all sections inline
- **src/assets/css/**: 17 modular CSS files organized by component
- **src/assets/js/**: main.js (application logic), carousel.js, google-animation.js
- **src/assets/img/**: Images should be in WebP format where possible
- **src/assets/fonts/**: Custom Peachi font files (woff2)

## Mobile Responsiveness

- **Mobile-first approach** with breakpoint at 768px
- **Custom mobile menu** implementation separate from desktop navigation
- **Mobile-specific styles** in responsive-768.css override desktop styles

## Important Implementation Details

1. **Header is transparent** and overlays the hero section image
2. **Custom Peachi font** is preloaded for performance
3. **Mobile menu** uses a full-screen overlay pattern with slide-in animation
4. **Forms** include real-time validation and loading states (ready for AJAX)
5. **Accessibility features** include skip links, ARIA labels, keyboard navigation support
6. **Cache busting** uses PHP timestamps in development, update-cache.sh for deployment