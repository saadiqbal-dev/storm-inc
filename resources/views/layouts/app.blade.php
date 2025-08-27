<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <!-- Primary Meta Tags -->
    <title>@yield('title', config('app.name', 'Storm Inc'))</title>
    <meta name="title" content="@yield('meta_title', config('app.name', 'Storm Inc'))">
    <meta name="description" content="@yield('meta_description', 'Storm Inc creates modern, responsive web solutions that help your business grow. Expert web development, UI/UX design, e-commerce, and digital marketing services.')">
    <meta name="keywords" content="@yield('meta_keywords', 'web development, responsive design, UI UX design, e-commerce solutions, digital marketing, SEO optimization, mobile development, Storm Inc')">
    <meta name="author" content="Storm Inc">
    <meta name="robots" content="@yield('meta_robots', 'index, follow')">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="@yield('og_title', config('app.name', 'Storm Inc'))">
    <meta property="og:description" content="@yield('og_description', 'Storm Inc creates modern, responsive web solutions that help your business grow.')">
    <meta property="og:image" content="@yield('og_image', asset('images/og-image.webp'))">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:site_name" content="{{ config('app.name', 'Storm Inc') }}">
    <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="@yield('twitter_title', config('app.name', 'Storm Inc'))">
    <meta name="twitter:description" content="@yield('twitter_description', 'Storm Inc creates modern, responsive web solutions that help your business grow.')">
    <meta name="twitter:image" content="@yield('twitter_image', asset('images/twitter-card.webp'))">
    <meta name="twitter:image:alt" content="@yield('twitter_image_alt', 'Storm Inc - Professional Web Development & Digital Solutions')">
    
    <!-- Favicon and App Icons -->
    <link rel="icon" type="image/x-icon" href="{{ asset('images/favicon.ico') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/favicon-16x16.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/apple-touch-icon.png') }}">
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#0d6efd">
    <meta name="msapplication-TileColor" content="#0d6efd">
    
    <!-- DNS Prefetch and Preconnect -->
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    
    @stack('head-styles')
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
    
    @stack('styles')
    
    <!-- Structured Data -->
    @hasSection('structured_data')
        @yield('structured_data')
    @else
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "{{ config('app.name', 'Storm Inc') }}",
          "url": "{{ url('/') }}",
          "logo": "{{ asset('images/logo.webp') }}",
          "description": "Professional web development and digital solutions company specializing in modern, responsive websites and applications.",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-234-567-8900",
            "contactType": "customer service",
            "email": "hello@storminc.com"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Business Avenue, Suite 100",
            "addressLocality": "New York",
            "addressRegion": "NY",
            "postalCode": "10001",
            "addressCountry": "US"
          },
          "foundingDate": "2020",
          "numberOfEmployees": "10-50",
          "serviceArea": "Worldwide",
          "sameAs": [
            "https://facebook.com/storminc",
            "https://twitter.com/storminc",
            "https://linkedin.com/company/storminc"
          ]
        }
        </script>
    @endif
</head>
<body>
    <!-- Skip Navigation Links -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <a href="#navigation" class="skip-link">Skip to navigation</a>
    <a href="#contact" class="skip-link">Skip to contact</a>
    
    <!-- Header -->
    @include('partials.header')
    
    <!-- Main Content -->
    <main role="main" id="main-content">
        @yield('content')
    </main>
    
    <!-- Footer -->
    @include('partials.footer')
    
    <!-- Scripts -->
    @stack('pre-scripts')
    
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    
    <!-- Custom JS -->
    <script src="{{ asset('js/main.js') }}"></script>
    
    @stack('scripts')
    
    <!-- Live Region for Accessibility -->
    <div id="live-region" class="visually-hidden" aria-live="polite" aria-atomic="true"></div>
</body>
</html>