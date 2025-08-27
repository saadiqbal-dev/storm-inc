<!-- Header Component -->
<header role="banner" class="header" id="navigation">
    <nav class="navbar navbar-expand-lg navbar-light bg-white" role="navigation" aria-label="Main navigation">
        <div class="container">
            <!-- Brand Logo -->
            <a class="navbar-brand" href="{{ url('/') }}" aria-label="{{ config('app.name', 'Storm Inc') }} Home">
                <img src="{{ asset('images/logo.webp') }}" alt="{{ config('app.name', 'Storm Inc') }}" width="140" height="45" loading="eager" class="navbar-brand__logo">
            </a>
            
            <!-- Mobile Menu Toggle -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <!-- Navigation Menu -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto" role="menubar">
                    @php
                    $navItems = [
                        ['text' => 'Home', 'url' => '#home', 'active' => true],
                        ['text' => 'About', 'url' => '#about'],
                        ['text' => 'Services', 'url' => '#services'],
                        ['text' => 'Our Clients', 'url' => '#trusted-by'],
                        ['text' => 'Contact', 'url' => '#contact']
                    ];
                    @endphp
                    
                    @foreach($navItems as $item)
                    <li class="nav-item" role="none">
                        <a class="nav-link {{ isset($item['active']) && $item['active'] ? 'active' : '' }}" 
                           href="{{ $item['url'] }}" 
                           role="menuitem" 
                           {{ isset($item['active']) && $item['active'] ? 'aria-current=page' : '' }}>
                            {{ $item['text'] }}
                        </a>
                    </li>
                    @endforeach
                    
                    <li class="nav-item ms-2" role="none">
                        <a class="btn btn-primary nav-cta" href="#contact" role="menuitem">Get Started</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>