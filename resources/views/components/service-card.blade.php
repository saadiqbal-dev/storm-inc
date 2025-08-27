@props(['icon', 'title', 'description', 'features' => []])

<div class="col-lg-4 col-md-6">
    <div class="services__card card h-100 border-0 shadow-sm">
        <div class="card-body text-center p-4">
            <div class="services__icon mb-4">
                <i class="bi {{ $icon }} text-primary" style="font-size: 3rem;"></i>
            </div>
            <h3 class="services__card-title h5 fw-bold mb-3">{{ $title }}</h3>
            <p class="services__card-text text-muted mb-4">{{ $description }}</p>
            
            @if(!empty($features))
            <ul class="services__features list-unstyled text-start mb-4">
                @foreach($features as $feature)
                <li><i class="bi bi-check text-success me-2"></i>{{ $feature }}</li>
                @endforeach
            </ul>
            @endif
            
            <a href="#contact" class="btn btn-outline-primary">Learn More</a>
        </div>
    </div>
</div>