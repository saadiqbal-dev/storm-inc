<!-- Footer Component -->
<footer role="contentinfo" class="footer bg-dark text-light py-5" id="contact">
    <div class="container">
        <!-- Footer Top -->
        <div class="row mb-5">
            <!-- Company Info -->
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="footer__brand mb-4">
                    <img src="{{ asset('images/logo-white.webp') }}" alt="{{ config('app.name', 'Storm Inc') }}" class="footer__logo mb-3" width="140" height="45" loading="lazy">
                    <p class="footer__description text-light opacity-75 mb-4">
                        We create exceptional digital experiences that drive business growth through innovative web development and design solutions.
                    </p>
                </div>
                
                <!-- Social Links -->
                <div class="footer__social">
                    <h5 class="footer__social-title h6 fw-bold mb-3">Follow Us</h5>
                    <div class="footer__social-links d-flex gap-3">
                        @php
                        $socialLinks = [
                            ['icon' => 'bi-facebook', 'label' => 'Follow us on Facebook', 'url' => '#'],
                            ['icon' => 'bi-twitter', 'label' => 'Follow us on Twitter', 'url' => '#'],
                            ['icon' => 'bi-linkedin', 'label' => 'Follow us on LinkedIn', 'url' => '#'],
                            ['icon' => 'bi-instagram', 'label' => 'Follow us on Instagram', 'url' => '#'],
                            ['icon' => 'bi-github', 'label' => 'View our GitHub', 'url' => '#']
                        ];
                        @endphp
                        
                        @foreach($socialLinks as $social)
                        <a href="{{ $social['url'] }}" class="footer__social-link" aria-label="{{ $social['label'] }}">
                            <i class="bi {{ $social['icon'] }} fs-5"></i>
                        </a>
                        @endforeach
                    </div>
                </div>
            </div>
            
            <!-- Quick Links -->
            <div class="col-lg-2 col-md-6 mb-4">
                <h5 class="footer__title h6 fw-bold mb-3">Quick Links</h5>
                <nav class="footer__nav" aria-label="Footer navigation">
                    <ul class="footer__nav-list list-unstyled">
                        @php
                        $quickLinks = [
                            ['text' => 'Home', 'url' => '#home'],
                            ['text' => 'About Us', 'url' => '#about'],
                            ['text' => 'Our Services', 'url' => '#services'],
                            ['text' => 'Portfolio', 'url' => '#trusted-by'],
                            ['text' => 'Contact', 'url' => '#contact']
                        ];
                        @endphp
                        
                        @foreach($quickLinks as $link)
                        <li class="footer__nav-item mb-2">
                            <a href="{{ $link['url'] }}" class="footer__nav-link text-light opacity-75">{{ $link['text'] }}</a>
                        </li>
                        @endforeach
                    </ul>
                </nav>
            </div>
            
            <!-- Services -->
            <div class="col-lg-2 col-md-6 mb-4">
                <h5 class="footer__title h6 fw-bold mb-3">Services</h5>
                <ul class="footer__services-list list-unstyled">
                    @php
                    $footerServices = ['Web Development', 'UI/UX Design', 'E-Commerce', 'SEO Optimization', 'Mobile Development'];
                    @endphp
                    
                    @foreach($footerServices as $service)
                    <li class="footer__services-item mb-2">
                        <a href="#services" class="footer__services-link text-light opacity-75">{{ $service }}</a>
                    </li>
                    @endforeach
                </ul>
            </div>
            
            <!-- Contact Info -->
            <div class="col-lg-4 col-md-6 mb-4">
                <h5 class="footer__title h6 fw-bold mb-3">Contact Information</h5>
                
                <!-- Contact Details -->
                <div class="footer__contact mb-4">
                    @php
                    $contactInfo = [
                        ['icon' => 'bi-geo-alt-fill', 'label' => 'Address', 'content' => '123 Business Avenue<br>Suite 100, New York, NY 10001', 'link' => false],
                        ['icon' => 'bi-telephone-fill', 'label' => 'Phone', 'content' => '+1 (234) 567-8900', 'link' => 'tel:+1234567890'],
                        ['icon' => 'bi-envelope-fill', 'label' => 'Email', 'content' => 'hello@storminc.com', 'link' => 'mailto:hello@storminc.com']
                    ];
                    @endphp
                    
                    @foreach($contactInfo as $contact)
                    <div class="footer__contact-item d-flex align-items-start mb-3">
                        <i class="bi {{ $contact['icon'] }} text-primary me-3 mt-1"></i>
                        <div class="footer__contact-content">
                            <h6 class="footer__contact-label fw-bold mb-1">{{ $contact['label'] }}</h6>
                            @if($contact['link'])
                                <a href="{{ $contact['link'] }}" class="footer__contact-link text-light opacity-75 text-decoration-none">
                                    {{ $contact['content'] }}
                                </a>
                            @else
                                <p class="footer__contact-text text-light opacity-75 mb-0">
                                    {!! $contact['content'] !!}
                                </p>
                            @endif
                        </div>
                    </div>
                    @endforeach
                </div>
                
                <!-- Newsletter Signup -->
                <div class="footer__newsletter">
                    <h6 class="footer__newsletter-title fw-bold mb-3">Stay Updated</h6>
                    <form class="footer__newsletter-form" method="POST" action="{{ route('newsletter.subscribe') }}" aria-label="Newsletter signup">
                        @csrf
                        <div class="input-group mb-3">
                            <input type="email" name="email" class="form-control" placeholder="Enter your email" 
                                   aria-label="Email address for newsletter" required>
                            <button class="btn btn-primary" type="submit" aria-label="Subscribe to newsletter">
                                <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>
                        <small class="text-light opacity-50">
                            Get the latest updates and industry insights delivered to your inbox.
                        </small>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Footer Bottom -->
        <div class="footer__bottom border-top border-secondary pt-4">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <p class="footer__copyright text-light opacity-75 mb-0">
                        &copy; {{ date('Y') }} {{ config('app.name', 'Storm Inc') }}. All rights reserved. 
                        <a href="{{ route('privacy.policy') }}" class="footer__legal-link text-light opacity-75 text-decoration-none ms-3">Privacy Policy</a>
                        <a href="{{ route('terms.service') }}" class="footer__legal-link text-light opacity-75 text-decoration-none ms-3">Terms of Service</a>
                    </p>
                </div>
                <div class="col-md-4 text-md-end mt-3 mt-md-0">
                    <div class="footer__certifications">
                        <small class="text-light opacity-50">
                            Built with modern web standards • WCAG 2.1 AA Compliant
                        </small>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Back to Top Button -->
        <div class="footer__back-to-top">
            <a href="#home" class="footer__back-to-top-btn btn btn-primary rounded-circle position-fixed" 
               aria-label="Back to top" style="bottom: 2rem; right: 2rem; width: 50px; height: 50px; z-index: 1000;">
                <i class="bi bi-arrow-up"></i>
            </a>
        </div>
    </div>
</footer>