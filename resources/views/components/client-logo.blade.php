@props(['name', 'image', 'index'])

<div class="col-6 col-md-4 col-lg-2">
    <div class="trusted-by__logo text-center">
        <img src="{{ asset('images/clients/' . $image) }}" alt="{{ $name }}" class="img-fluid trusted-by__logo-img" loading="lazy" width="140" height="60">
    </div>
</div>