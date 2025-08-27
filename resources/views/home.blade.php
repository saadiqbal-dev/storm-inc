@extends('layouts.app')

@section('title', 'Professional Web Development & Digital Solutions | Storm Inc')
@section('meta_title', 'Professional Web Development & Digital Solutions | Storm Inc')
@section('meta_description', 'Storm Inc creates modern, responsive web solutions that help your business grow. Expert web development, UI/UX design, e-commerce, and digital marketing services.')
@section('meta_keywords', 'web development, responsive design, UI UX design, e-commerce solutions, digital marketing, SEO optimization, mobile development, Storm Inc')

@section('og_title', 'Professional Web Development & Digital Solutions | Storm Inc')
@section('og_description', 'Storm Inc creates modern, responsive web solutions that help your business grow. Expert web development, UI/UX design, e-commerce, and digital marketing services.')

@section('twitter_title', 'Professional Web Development & Digital Solutions | Storm Inc')
@section('twitter_description', 'Storm Inc creates modern, responsive web solutions that help your business grow. Expert web development, UI/UX design, e-commerce, and digital marketing services.')

@section('content')
<!-- Hero Section -->
<section id="home" class="hero" aria-label="Welcome to Storm Inc">
    <div class="container">
        <div class="row align-items-center min-vh-100">
            <!-- Hero Content -->
            <div class="col-lg-6 col-md-12">
                <div class="hero__content">
                    <h1 class="hero__title display-3 fw-bold mb-4">
                        Building Digital 
                        <span class="text-gradient">Excellence</span>
                    </h1>
                    <p class="hero__subtitle lead mb-4">
                        We create modern, responsive, and user-friendly web solutions that help your business grow and succeed in the digital world.
                    </p>
                    <div class="hero__actions d-flex flex-column flex-sm-row gap-3 mb-5">
                        <a href="#services" class="btn btn-primary btn-lg px-4 py-3">
                            Explore Our Services
                        </a>
                        <a href="#about" class="btn btn-outline-primary btn-lg px-4 py-3">
                            Learn More About Us
                        </a>
                    </div>
                    
                    <!-- Hero Stats -->
                    <div class="hero__stats">
                        <div class="row text-center text-sm-start">
                            @php
                            $heroStats = [
                                ['number' => '150+', 'label' => 'Projects Completed'],
                                ['number' => '50+', 'label' => 'Happy Clients'],
                                ['number' => '5+', 'label' => 'Years Experience']
                            ];
                            @endphp
                            
                            @foreach($heroStats as $stat)
                            <div class="col-4">
                                <div class="hero__stat">
                                    <div class="hero__stat-number display-6 fw-bold text-primary">{{ $stat['number'] }}</div>
                                    <div class="hero__stat-label text-muted">{{ $stat['label'] }}</div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Hero Image -->
            <div class="col-lg-6 col-md-12">
                <div class="hero__image-wrapper text-center">
                    <picture class="hero__image">
                        <source srcset="{{ asset('images/hero-desktop.webp') }}" media="(min-width: 992px)" type="image/webp">
                        <source srcset="{{ asset('images/hero-tablet.webp') }}" media="(min-width: 768px)" type="image/webp">
                        <source srcset="{{ asset('images/hero-mobile.webp') }}" media="(max-width: 767px)" type="image/webp">
                        <img src="{{ asset('images/hero-desktop.webp') }}" alt="Digital solutions and web development illustration" 
                             class="img-fluid hero__image-main" loading="eager" width="600" height="500">
                    </picture>
                    
                    <!-- Floating Elements -->
                    <div class="hero__floating-elements">
                        <div class="hero__floating-element hero__floating-element--1" aria-hidden="true">
                            <i class="bi bi-code-slash"></i>
                        </div>
                        <div class="hero__floating-element hero__floating-element--2" aria-hidden="true">
                            <i class="bi bi-palette"></i>
                        </div>
                        <div class="hero__floating-element hero__floating-element--3" aria-hidden="true">
                            <i class="bi bi-rocket"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="hero__scroll-indicator">
            <a href="#about" class="hero__scroll-link" aria-label="Scroll to next section">
                <i class="bi bi-chevron-down"></i>
            </a>
        </div>
    </div>
    
    <!-- Background Elements -->
    <div class="hero__background" aria-hidden="true">
        <div class="hero__bg-shape hero__bg-shape--1"></div>
        <div class="hero__bg-shape hero__bg-shape--2"></div>
    </div>
</section>

<!-- About Section -->
<section id="about" class="about py-5" aria-label="About Storm Inc">
    <div class="container">
        <!-- Section Header -->
        <div class="row mb-5">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="about__title display-5 fw-bold mb-4">About Storm Inc</h2>
                <p class="about__subtitle lead text-muted">
                    We are passionate developers and designers dedicated to creating exceptional digital experiences that drive business growth.
                </p>
            </div>
        </div>
        
        <div class="row align-items-center">
            <!-- About Content -->
            <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="about__content">
                    <h3 class="about__content-title h4 fw-bold mb-3">Our Mission</h3>
                    <p class="about__content-text mb-4">
                        At Storm Inc, we believe in the power of technology to transform businesses. Our team combines creativity with technical expertise to deliver web solutions that are not only visually stunning but also highly functional and user-friendly.
                    </p>
                    
                    <h3 class="about__content-title h4 fw-bold mb-3">What Sets Us Apart</h3>
                    <div class="about__features">
                        @php
                        $features = [
                            ['icon' => 'bi-check-circle-fill', 'title' => 'Modern Technology Stack', 'description' => 'We use the latest web technologies and frameworks to ensure your project is future-proof.'],
                            ['icon' => 'bi-check-circle-fill', 'title' => 'Responsive Design', 'description' => 'Every project is built mobile-first, ensuring perfect functionality across all devices.'],
                            ['icon' => 'bi-check-circle-fill', 'title' => 'SEO Optimized', 'description' => 'Built with search engine optimization in mind to help your business get found online.'],
                            ['icon' => 'bi-check-circle-fill', 'title' => 'Ongoing Support', 'description' => 'We provide continuous support and maintenance to keep your website running smoothly.']
                        ];
                        @endphp
                        
                        @foreach($features as $feature)
                        <div class="about__feature d-flex align-items-start mb-3">
                            <div class="about__feature-icon me-3">
                                <i class="bi {{ $feature['icon'] }} text-primary fs-5"></i>
                            </div>
                            <div class="about__feature-content">
                                <h4 class="about__feature-title h6 fw-bold mb-1">{{ $feature['title'] }}</h4>
                                <p class="about__feature-text text-muted mb-0">{{ $feature['description'] }}</p>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
            
            <!-- About Image & Stats -->
            <div class="col-lg-6">
                <div class="about__visual">
                    <!-- About Image -->
                    <div class="about__image-wrapper mb-4">
                        <picture class="about__image">
                            <source srcset="{{ asset('images/about-team.webp') }}" media="(min-width: 768px)" type="image/webp">
                            <source srcset="{{ asset('images/about-team-mobile.webp') }}" media="(max-width: 767px)" type="image/webp">
                            <img src="{{ asset('images/about-team.webp') }}" alt="Storm Inc team working on digital projects" 
                                 class="img-fluid rounded about__image-main" loading="lazy" width="500" height="400">
                        </picture>
                    </div>
                    
                    <!-- Statistics Cards -->
                    <div class="about__stats">
                        <div class="row g-3">
                            @php
                            $stats = [
                                ['number' => '98%', 'label' => 'Client Satisfaction'],
                                ['number' => '24/7', 'label' => 'Support Available'],
                                ['number' => '100%', 'label' => 'Mobile Responsive'],
                                ['number' => '3x', 'label' => 'Faster Loading']
                            ];
                            @endphp
                            
                            @foreach($stats as $stat)
                            <div class="col-6">
                                <div class="about__stat-card text-center p-3 bg-light rounded">
                                    <div class="about__stat-number display-6 fw-bold text-primary">{{ $stat['number'] }}</div>
                                    <div class="about__stat-label small text-muted">{{ $stat['label'] }}</div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Call to Action -->
        <div class="row mt-5">
            <div class="col-12 text-center">
                <div class="about__cta bg-primary bg-gradient rounded p-5 text-white">
                    <h3 class="about__cta-title h4 fw-bold mb-3">Ready to Start Your Project?</h3>
                    <p class="about__cta-text mb-4 opacity-75">
                        Let's work together to bring your digital vision to life with our expertise and passion.
                    </p>
                    <a href="#contact" class="btn btn-light btn-lg px-4 py-3">
                        Get in Touch Today
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section id="services" class="services py-5 bg-light" aria-label="Our Services">
    <div class="container">
        <!-- Section Header -->
        <div class="row mb-5">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="services__title display-5 fw-bold mb-4">Our Services</h2>
                <p class="services__subtitle lead text-muted">
                    We offer comprehensive digital solutions to help your business thrive in the modern web landscape.
                </p>
            </div>
        </div>
        
        <!-- Services Grid (3x3) -->
        <div class="row g-4">
            @php
            $services = [
                ['icon' => 'bi-code-slash', 'title' => 'Web Development', 'description' => 'Custom web applications built with modern frameworks and best practices for optimal performance.', 'features' => ['Responsive Design', 'Modern Frameworks', 'Performance Optimized']],
                ['icon' => 'bi-palette', 'title' => 'UI/UX Design', 'description' => 'Beautiful, intuitive user interfaces designed to enhance user experience and engagement.', 'features' => ['User-Centered Design', 'Wireframing & Prototyping', 'Brand Consistency']],
                ['icon' => 'bi-cart', 'title' => 'E-Commerce Solutions', 'description' => 'Complete online store solutions with secure payment integration and inventory management.', 'features' => ['Payment Integration', 'Inventory Management', 'Security & SSL']],
                ['icon' => 'bi-search', 'title' => 'SEO Optimization', 'description' => 'Improve your search engine rankings with our comprehensive SEO strategies and techniques.', 'features' => ['Keyword Research', 'On-Page Optimization', 'Performance Monitoring']],
                ['icon' => 'bi-phone', 'title' => 'Mobile Development', 'description' => 'Native and cross-platform mobile applications for iOS and Android with seamless performance.', 'features' => ['iOS & Android', 'Cross-Platform', 'App Store Deployment']],
                ['icon' => 'bi-megaphone', 'title' => 'Digital Marketing', 'description' => 'Comprehensive digital marketing strategies to boost your online presence and reach your target audience.', 'features' => ['Social Media Marketing', 'Content Strategy', 'Analytics & Reporting']],
                ['icon' => 'bi-cloud', 'title' => 'Cloud Solutions', 'description' => 'Scalable cloud infrastructure and deployment solutions for reliable and secure hosting.', 'features' => ['AWS & Azure', 'Auto-Scaling', '24/7 Monitoring']],
                ['icon' => 'bi-tools', 'title' => 'Maintenance & Support', 'description' => 'Ongoing website maintenance, updates, and technical support to keep your site running smoothly.', 'features' => ['Regular Updates', 'Security Monitoring', 'Performance Optimization']],
                ['icon' => 'bi-lightbulb', 'title' => 'Consulting & Strategy', 'description' => 'Expert technology consulting to help you make informed decisions about your digital transformation.', 'features' => ['Technology Assessment', 'Digital Strategy', 'Project Planning']]
            ];
            @endphp
            
            @foreach($services as $service)
            <div class="col-lg-4 col-md-6">
                <div class="services__card card h-100 border-0 shadow-sm">
                    <div class="card-body text-center p-4">
                        <div class="services__icon mb-4">
                            <i class="bi {{ $service['icon'] }} text-primary" style="font-size: 3rem;"></i>
                        </div>
                        <h3 class="services__card-title h5 fw-bold mb-3">{{ $service['title'] }}</h3>
                        <p class="services__card-text text-muted mb-4">{{ $service['description'] }}</p>
                        <ul class="services__features list-unstyled text-start mb-4">
                            @foreach($service['features'] as $feature)
                            <li><i class="bi bi-check text-success me-2"></i>{{ $feature }}</li>
                            @endforeach
                        </ul>
                        <a href="#contact" class="btn btn-outline-primary">Learn More</a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        
        <!-- Bottom CTA -->
        <div class="row mt-5">
            <div class="col-12 text-center">
                <h3 class="services__cta-title h4 fw-bold mb-3">Need a Custom Solution?</h3>
                <p class="services__cta-text text-muted mb-4">
                    We specialize in creating tailored solutions that fit your unique business requirements.
                </p>
                <a href="#contact" class="btn btn-primary btn-lg px-4 py-3">
                    Discuss Your Project
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Trusted By Section -->
<section id="trusted-by" class="trusted-by py-5" aria-label="Trusted by leading companies">
    <div class="container">
        <!-- Section Header -->
        <div class="row mb-5">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="trusted-by__title display-5 fw-bold mb-4">Trusted by Leading Companies</h2>
                <p class="trusted-by__subtitle lead text-muted">
                    We're proud to partner with innovative businesses across various industries to deliver exceptional digital solutions.
                </p>
            </div>
        </div>
        
        <!-- Client Logos Grid -->
        <div class="trusted-by__logos">
            <div class="row align-items-center g-4 mb-5">
                @php
                $clients = ['TechCorp', 'InnovateLab', 'DataFlow Solutions', 'GlobalTech', 'FutureSoft', 'CloudVision'];
                @endphp
                
                @foreach($clients as $index => $client)
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="trusted-by__logo text-center">
                        <img src="{{ asset('images/clients/client-' . ($index + 1) . '.webp') }}" alt="{{ $client }}" class="img-fluid trusted-by__logo-img" loading="lazy" width="140" height="60">
                    </div>
                </div>
                @endforeach
            </div>
        </div>
        
        <!-- Client Testimonials -->
        <div class="trusted-by__testimonials">
            <div class="row">
                <div class="col-12">
                    <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                        <div class="carousel-inner">
                            @php
                            $testimonials = [
                                ['text' => 'Storm Inc transformed our digital presence completely. Their attention to detail and technical expertise exceeded our expectations.', 'author' => 'Sarah Johnson', 'position' => 'CEO, TechCorp', 'image' => 'author-1.webp'],
                                ['text' => 'Working with Storm Inc was a game-changer. They delivered a stunning website that perfectly captures our brand identity.', 'author' => 'Michael Chen', 'position' => 'Founder, InnovateLab', 'image' => 'author-2.webp'],
                                ['text' => 'The team\'s professionalism and expertise made our project a success. Highly recommend Storm Inc for any web development needs.', 'author' => 'Emma Rodriguez', 'position' => 'Director, DataFlow Solutions', 'image' => 'author-3.webp']
                            ];
                            @endphp
                            
                            @foreach($testimonials as $index => $testimonial)
                            <div class="carousel-item {{ $index === 0 ? 'active' : '' }}">
                                <div class="trusted-by__testimonial text-center px-3">
                                    <div class="trusted-by__quote mb-4">
                                        <i class="bi bi-quote text-primary" style="font-size: 3rem;"></i>
                                    </div>
                                    <blockquote class="trusted-by__testimonial-text h5 fw-normal text-muted mb-4">
                                        "{{ $testimonial['text'] }}"
                                    </blockquote>
                                    <div class="trusted-by__author">
                                        <img src="{{ asset('images/testimonials/' . $testimonial['image']) }}" alt="{{ $testimonial['author'] }}" class="trusted-by__author-img rounded-circle mb-3" width="80" height="80" loading="lazy">
                                        <h4 class="trusted-by__author-name h6 fw-bold mb-1">{{ $testimonial['author'] }}</h4>
                                        <p class="trusted-by__author-position text-muted small mb-0">{{ $testimonial['position'] }}</p>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                        
                        <!-- Carousel Controls -->
                        <button class="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev" aria-label="Previous testimonial">
                            <span class="carousel-control-prev-icon bg-primary rounded-circle p-3" aria-hidden="true"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next" aria-label="Next testimonial">
                            <span class="carousel-control-next-icon bg-primary rounded-circle p-3" aria-hidden="true"></span>
                        </button>
                        
                        <!-- Carousel Indicators -->
                        <div class="carousel-indicators">
                            @foreach($testimonials as $index => $testimonial)
                            <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="{{ $index }}" class="{{ $index === 0 ? 'active' : '' }}" aria-current="{{ $index === 0 ? 'true' : 'false' }}" aria-label="Go to testimonial {{ $index + 1 }}"></button>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Success Metrics -->
        <div class="trusted-by__metrics mt-5">
            <div class="row text-center">
                @php
                $metrics = [
                    ['number' => '50+', 'label' => 'Happy Clients'],
                    ['number' => '150+', 'label' => 'Projects Delivered'],
                    ['number' => '98%', 'label' => 'Client Satisfaction'],
                    ['number' => '24/7', 'label' => 'Support Available']
                ];
                @endphp
                
                @foreach($metrics as $metric)
                <div class="col-6 col-md-3">
                    <div class="trusted-by__metric">
                        <div class="trusted-by__metric-number display-4 fw-bold text-primary mb-2">{{ $metric['number'] }}</div>
                        <div class="trusted-by__metric-label text-muted">{{ $metric['label'] }}</div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
        
        <!-- Call to Action -->
        <div class="row mt-5">
            <div class="col-12 text-center">
                <div class="trusted-by__cta">
                    <h3 class="trusted-by__cta-title h4 fw-bold mb-3">Join Our Growing Family of Satisfied Clients</h3>
                    <p class="trusted-by__cta-text text-muted mb-4">
                        Ready to transform your digital presence? Let's discuss how we can help your business grow.
                    </p>
                    <a href="#contact" class="btn btn-primary btn-lg px-4 py-3 me-3">
                        Start Your Project
                    </a>
                    <a href="#services" class="btn btn-outline-primary btn-lg px-4 py-3">
                        View Our Services
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection