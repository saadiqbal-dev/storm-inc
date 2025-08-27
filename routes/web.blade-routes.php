<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes for Storm Inc
|--------------------------------------------------------------------------
|
| Here are the routes for the Storm Inc website. These routes are loaded
| by the RouteServiceProvider within a group which contains the "web"
| middleware group.
|
*/

// Homepage Route
Route::get('/', function () {
    return view('home', [
        'title' => 'Professional Web Development & Digital Solutions | Storm Inc',
        'description' => 'Storm Inc creates modern, responsive web solutions that help your business grow. Expert web development, UI/UX design, e-commerce, and digital marketing services.',
        'keywords' => 'web development, responsive design, UI UX design, e-commerce solutions, digital marketing, SEO optimization, mobile development, Storm Inc'
    ]);
})->name('home');

// Newsletter Subscription Route
Route::post('/newsletter/subscribe', function (Illuminate\Http\Request $request) {
    $request->validate([
        'email' => 'required|email|max:255'
    ]);
    
    // Here you would typically save to database or send to email service
    // Newsletter::create(['email' => $request->email]);
    
    return response()->json([
        'success' => true,
        'message' => 'Thank you for subscribing to our newsletter!'
    ]);
})->name('newsletter.subscribe');

// Legal Pages Routes
Route::get('/privacy-policy', function () {
    return view('legal.privacy-policy', [
        'title' => 'Privacy Policy | Storm Inc',
        'description' => 'Read our privacy policy to understand how Storm Inc collects, uses, and protects your personal information.',
        'meta_robots' => 'index, follow'
    ]);
})->name('privacy.policy');

Route::get('/terms-of-service', function () {
    return view('legal.terms-service', [
        'title' => 'Terms of Service | Storm Inc', 
        'description' => 'Review our terms of service to understand the terms and conditions for using Storm Inc services.',
        'meta_robots' => 'index, follow'
    ]);
})->name('terms.service');

// API Routes for AJAX calls
Route::prefix('api')->group(function () {
    // Contact Form Submission
    Route::post('/contact', function (Illuminate\Http\Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
            'service' => 'nullable|string|in:web-development,ui-ux-design,ecommerce,seo,mobile-development,digital-marketing,cloud-solutions,maintenance,consulting'
        ]);
        
        // Here you would typically save to database or send email
        // Contact::create($request->all());
        // Mail::to('hello@storminc.com')->send(new ContactFormMail($request->all()));
        
        return response()->json([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you within 24 hours.'
        ]);
    })->name('api.contact');
    
    // Quote Request
    Route::post('/quote', function (Illuminate\Http\Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'budget' => 'required|string|in:under-5k,5k-15k,15k-30k,30k-50k,50k-plus',
            'timeline' => 'required|string|in:asap,1-month,3-months,6-months,flexible',
            'services' => 'required|array|min:1',
            'services.*' => 'string|in:web-development,ui-ux-design,ecommerce,seo,mobile-development,digital-marketing,cloud-solutions,maintenance,consulting',
            'description' => 'required|string|max:2000'
        ]);
        
        // Here you would typically save to database or send email
        // Quote::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Thank you for your quote request! We will review your requirements and get back to you within 24 hours with a detailed proposal.'
        ]);
    })->name('api.quote');
});

// Sitemap Route
Route::get('/sitemap.xml', function () {
    $urls = [
        ['url' => url('/'), 'changefreq' => 'weekly', 'priority' => '1.0'],
        ['url' => route('privacy.policy'), 'changefreq' => 'monthly', 'priority' => '0.5'],
        ['url' => route('terms.service'), 'changefreq' => 'monthly', 'priority' => '0.5'],
    ];
    
    return response()->view('sitemap', ['urls' => $urls])
                    ->header('Content-Type', 'text/xml');
})->name('sitemap');

// Robots.txt Route
Route::get('/robots.txt', function () {
    $content = "User-agent: *\n";
    $content .= "Allow: /\n";
    $content .= "Disallow: /admin/\n";
    $content .= "Disallow: /api/\n";
    $content .= "\n";
    $content .= "Sitemap: " . route('sitemap') . "\n";
    
    return response($content)->header('Content-Type', 'text/plain');
})->name('robots');

// Health Check Route
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
        'version' => config('app.version', '1.0.0')
    ]);
})->name('health');