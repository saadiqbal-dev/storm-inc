<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class HomeController extends Controller
{
    /**
     * Display the homepage.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // You can fetch dynamic data here if needed
        $heroStats = [
            ['number' => '150+', 'label' => 'Projects Completed'],
            ['number' => '50+', 'label' => 'Happy Clients'],
            ['number' => '5+', 'label' => 'Years Experience']
        ];
        
        $services = [
            [
                'icon' => 'bi-code-slash',
                'title' => 'Web Development',
                'description' => 'Custom web applications built with modern frameworks and best practices for optimal performance.',
                'features' => ['Responsive Design', 'Modern Frameworks', 'Performance Optimized']
            ],
            [
                'icon' => 'bi-palette',
                'title' => 'UI/UX Design',
                'description' => 'Beautiful, intuitive user interfaces designed to enhance user experience and engagement.',
                'features' => ['User-Centered Design', 'Wireframing & Prototyping', 'Brand Consistency']
            ],
            [
                'icon' => 'bi-cart',
                'title' => 'E-Commerce Solutions',
                'description' => 'Complete online store solutions with secure payment integration and inventory management.',
                'features' => ['Payment Integration', 'Inventory Management', 'Security & SSL']
            ],
            [
                'icon' => 'bi-search',
                'title' => 'SEO Optimization',
                'description' => 'Improve your search engine rankings with our comprehensive SEO strategies and techniques.',
                'features' => ['Keyword Research', 'On-Page Optimization', 'Performance Monitoring']
            ],
            [
                'icon' => 'bi-phone',
                'title' => 'Mobile Development',
                'description' => 'Native and cross-platform mobile applications for iOS and Android with seamless performance.',
                'features' => ['iOS & Android', 'Cross-Platform', 'App Store Deployment']
            ],
            [
                'icon' => 'bi-megaphone',
                'title' => 'Digital Marketing',
                'description' => 'Comprehensive digital marketing strategies to boost your online presence and reach your target audience.',
                'features' => ['Social Media Marketing', 'Content Strategy', 'Analytics & Reporting']
            ],
            [
                'icon' => 'bi-cloud',
                'title' => 'Cloud Solutions',
                'description' => 'Scalable cloud infrastructure and deployment solutions for reliable and secure hosting.',
                'features' => ['AWS & Azure', 'Auto-Scaling', '24/7 Monitoring']
            ],
            [
                'icon' => 'bi-tools',
                'title' => 'Maintenance & Support',
                'description' => 'Ongoing website maintenance, updates, and technical support to keep your site running smoothly.',
                'features' => ['Regular Updates', 'Security Monitoring', 'Performance Optimization']
            ],
            [
                'icon' => 'bi-lightbulb',
                'title' => 'Consulting & Strategy',
                'description' => 'Expert technology consulting to help you make informed decisions about your digital transformation.',
                'features' => ['Technology Assessment', 'Digital Strategy', 'Project Planning']
            ]
        ];
        
        $testimonials = [
            [
                'text' => 'Storm Inc transformed our digital presence completely. Their attention to detail and technical expertise exceeded our expectations.',
                'author' => 'Sarah Johnson',
                'position' => 'CEO, TechCorp',
                'image' => 'author-1.webp'
            ],
            [
                'text' => 'Working with Storm Inc was a game-changer. They delivered a stunning website that perfectly captures our brand identity.',
                'author' => 'Michael Chen',
                'position' => 'Founder, InnovateLab',
                'image' => 'author-2.webp'
            ],
            [
                'text' => 'The team\'s professionalism and expertise made our project a success. Highly recommend Storm Inc for any web development needs.',
                'author' => 'Emma Rodriguez',
                'position' => 'Director, DataFlow Solutions',
                'image' => 'author-3.webp'
            ]
        ];
        
        $clients = [
            ['name' => 'TechCorp', 'image' => 'client-1.webp'],
            ['name' => 'InnovateLab', 'image' => 'client-2.webp'],
            ['name' => 'DataFlow Solutions', 'image' => 'client-3.webp'],
            ['name' => 'GlobalTech', 'image' => 'client-4.webp'],
            ['name' => 'FutureSoft', 'image' => 'client-5.webp'],
            ['name' => 'CloudVision', 'image' => 'client-6.webp']
        ];
        
        return view('home', compact('heroStats', 'services', 'testimonials', 'clients'));
    }
    
    /**
     * Handle newsletter subscription.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscribeNewsletter(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255|unique:newsletter_subscriptions,email'
        ]);
        
        // Here you would typically save to database
        // NewsletterSubscription::create(['email' => $request->email]);
        
        // Or send to email marketing service like Mailchimp, ConvertKit, etc.
        // $this->emailService->subscribe($request->email);
        
        return response()->json([
            'success' => true,
            'message' => 'Thank you for subscribing to our newsletter!'
        ]);
    }
    
    /**
     * Handle contact form submission.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function submitContact(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
            'service' => 'nullable|string|in:web-development,ui-ux-design,ecommerce,seo,mobile-development,digital-marketing,cloud-solutions,maintenance,consulting'
        ]);
        
        // Here you would typically save to database and send notification
        // ContactSubmission::create($request->all());
        // Mail::to(config('mail.contact_email'))->send(new ContactFormMail($request->all()));
        
        return response()->json([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you within 24 hours.'
        ]);
    }
}