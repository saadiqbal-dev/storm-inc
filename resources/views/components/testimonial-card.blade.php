@props(['testimonial', 'author', 'position', 'image', 'active' => false])

<div class="carousel-item {{ $active ? 'active' : '' }}">
    <div class="trusted-by__testimonial text-center px-3">
        <div class="trusted-by__quote mb-4">
            <i class="bi bi-quote text-primary" style="font-size: 3rem;"></i>
        </div>
        <blockquote class="trusted-by__testimonial-text h5 fw-normal text-muted mb-4">
            "{{ $testimonial }}"
        </blockquote>
        <div class="trusted-by__author">
            <img src="{{ asset('images/testimonials/' . $image) }}" alt="{{ $author }}" class="trusted-by__author-img rounded-circle mb-3" width="80" height="80" loading="lazy">
            <h4 class="trusted-by__author-name h6 fw-bold mb-1">{{ $author }}</h4>
            <p class="trusted-by__author-position text-muted small mb-0">{{ $position }}</p>
        </div>
    </div>
</div>