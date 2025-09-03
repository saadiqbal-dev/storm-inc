/**
 * Storm Inc - Carousel and Interactive Components
 * This file contains all the interactive functionality for the Storm Inc website
 */

// Hero Carousel Class
class HeroCarousel {
  constructor() {
    this.track = document.querySelector(".hero__carousel-track");
    this.slides = document.querySelectorAll(".hero__slide");
    this.heroSection = document.getElementById("hero");
    this.indicators = document.querySelectorAll(".hero__indicators circle");
    this.currentIndex = 0;
    this.absoluteIndex = 0; // Track absolute position for infinite scrolling
    this.slideWidth = 33.333; // Each slide is 33.333% of track width
    this.autoSlideInterval = 6000; // 6 seconds
    this.isTransitioning = false;

    this.init();
  }

  init() {
    this.setupInfiniteCarousel();
    this.setupCarousel();
    this.startAutoSlide();
    this.setupParallax();
  }

  setupInfiniteCarousel() {
    // Clone all slides and append them to create infinite effect
    this.originalSlidesCount = this.slides.length;
    
    // Clone slides before and after for seamless infinite scroll
    this.slides.forEach((slide) => {
      const clonedSlide = slide.cloneNode(true);
      clonedSlide.classList.add('cloned-slide');
      this.track.appendChild(clonedSlide);
    });

    // Update track width to accommodate cloned slides (6 slides total: 3 original + 3 cloned)
    const totalSlides = this.originalSlidesCount * 2;
    this.track.style.width = `${totalSlides * 100}%`;
    
    // Update slide widths
    this.allSlides = document.querySelectorAll(".hero__slide");
    this.allSlides.forEach(slide => {
      slide.style.width = `${100 / totalSlides}%`;
    });
  }

  setupCarousel() {
    // Set initial position to show first slide
    this.track.style.transform = "translateX(0%)";
    this.track.style.transition =
      "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";

    // Setup content wrapper for each slide (including clones)
    this.allSlides.forEach((slide, index) => {
      const content = slide.querySelector(".hero__content");
      if (content) {
        // Create a wrapper for parallax effect if it doesn't exist
        if (
          !content.parentElement.classList.contains("hero__content-wrapper")
        ) {
          const wrapper = document.createElement("div");
          wrapper.className = "hero__content-wrapper";
          content.parentElement.insertBefore(wrapper, content);
          wrapper.appendChild(content);
        }

        // All content is visible
        content.style.opacity = "1";
        content.style.transform = "translateX(0)";
        content.style.transition = "none";
        content.style.position = "relative";
      }
    });

    this.updateIndicators();
  }

  updateIndicators() {
    // Remove active class from all indicators
    this.indicators.forEach((indicator) => {
      indicator.classList.remove("hero__indicator--active");
      indicator.setAttribute("fill", "white");
      indicator.setAttribute("fill-opacity", "0.35");
    });

    // Add active class to current indicator
    if (this.indicators[this.currentIndex]) {
      this.indicators[this.currentIndex].classList.add(
        "hero__indicator--active"
      );
      this.indicators[this.currentIndex].setAttribute("fill", "white");
      this.indicators[this.currentIndex].setAttribute("fill-opacity", "1");
    }
  }

  slideToNext() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const previousIndex = this.currentIndex;
    this.absoluteIndex++;
    this.currentIndex = this.absoluteIndex % this.originalSlidesCount;

    // Calculate the new slide width based on total slides
    const slideWidthNew = 100 / (this.originalSlidesCount * 2);
    
    // Move to next slide
    const translateX = -this.absoluteIndex * slideWidthNew;
    this.track.style.transition =
      "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
    this.track.style.transform = `translateX(${translateX}%)`;

    // Handle text animations
    setTimeout(() => {
      // Calculate actual slide indices considering clones
      const prevSlideIndex = previousIndex;
      const currentSlideIndex = this.currentIndex;
      
      // Animate text for all slides (including clones)
      this.allSlides.forEach((slide, index) => {
        const content = slide.querySelector(".hero__content");
        if (content) {
          const originalIndex = index % this.originalSlidesCount;
          
          if (originalIndex === prevSlideIndex) {
            // Previous slide text goes out
            content.style.transition =
              "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-out";
            content.style.transform = "translateX(-100%)";
            content.style.opacity = "0";
          } else if (originalIndex === currentSlideIndex) {
            // Current slide text comes in
            content.style.transition = "none";
            content.style.transform = "translateX(100%)";
            content.style.opacity = "0";
            
            setTimeout(() => {
              content.style.transition =
                "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.6s ease-in";
              content.style.transform = "translateX(0)";
              content.style.opacity = "1";
            }, 50);
          } else {
            // Other slides stay hidden
            content.style.transition = "none";
            content.style.transform = "translateX(100%)";
            content.style.opacity = "0";
          }
        }
      });
    }, 300);

    this.updateIndicators();

    // Check if we've reached the cloned section
    if (this.absoluteIndex >= this.originalSlidesCount) {
      setTimeout(() => {
        // Reset to beginning without animation
        this.track.style.transition = "none";
        this.absoluteIndex = this.currentIndex;
        const resetTranslateX = -this.absoluteIndex * slideWidthNew;
        this.track.style.transform = `translateX(${resetTranslateX}%)`;
        
        // Re-enable transition after reset
        setTimeout(() => {
          this.track.style.transition =
            "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
          this.isTransitioning = false;
        }, 50);
      }, 1300); // Wait for animation to complete
    } else {
      setTimeout(() => {
        this.isTransitioning = false;
      }, 1300);
    }
  }

  startAutoSlide() {
    setInterval(() => {
      this.slideToNext();
    }, this.autoSlideInterval);
  }

  setupParallax() {
    let ticking = false;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroHeight = this.heroSection.offsetHeight;

      // Apply dual-layer parallax effect
      if (scrolled < heroHeight) {
        // Layer 1: Background images move at slower speed (creates depth)
        const imageParallaxSpeed = -scrolled * 0.5;
        const heroBackgrounds = document.querySelectorAll(".hero__slide-bg");
        heroBackgrounds.forEach((bg) => {
          // Only apply Y transform for scroll parallax, preserve any X transform from carousel
          const currentTransform = bg.style.transform;
          const scaleMatch = currentTransform.match(/scale\([^)]+\)/);
          const scaleTransform = scaleMatch ? scaleMatch[0] : "";
          bg.style.transform = `translateY(${imageParallaxSpeed}px) ${scaleTransform}`;
        });

        // Layer 2: Text content moves at different speed - but preserve carousel animations
        const textParallaxSpeed = -scrolled * 0.3;
        const heroContents = document.querySelectorAll(".hero__slide:not(.cloned-slide) .hero__content");
        heroContents.forEach((content) => {
          // Get existing horizontal transform from carousel animation
          const currentTransform = content.style.transform;
          const xMatch = currentTransform.match(/translateX\([^)]+\)/);
          const scaleMatch = currentTransform.match(/scale\([^)]+\)/);
          const xTransform = xMatch ? xMatch[0] : "translateX(0)";
          const scaleTransform = scaleMatch ? scaleMatch[0] : "";

          // Combine scroll parallax Y with carousel X and scale
          content.style.transform = `${xTransform} translateY(${textParallaxSpeed}px) ${scaleTransform}`;
        });

        // Removed layered effect for sections to eliminate stuttering
      } else {
        // When past hero, continue parallax effect but with smooth fade-out
        const heroBackgrounds = document.querySelectorAll(".hero__slide-bg");
        heroBackgrounds.forEach((bg) => {
          const currentTransform = bg.style.transform;
          const scaleMatch = currentTransform.match(/scale\([^)]+\)/);
          const scaleTransform = scaleMatch ? scaleMatch[0] : "";
          bg.style.transform = `translateY(-${
            heroHeight * 0.6
          }px) ${scaleTransform}`;
        });

        const heroContents = document.querySelectorAll(".hero__slide:not(.cloned-slide) .hero__content");
        heroContents.forEach((content) => {
          const currentTransform = content.style.transform;
          const xMatch = currentTransform.match(/translateX\([^)]+\)/);
          const scaleMatch = currentTransform.match(/scale\([^)]+\)/);
          const xTransform = xMatch ? xMatch[0] : "translateX(0)";
          const scaleTransform = scaleMatch ? scaleMatch[0] : "";

          content.style.transform = `${xTransform} translateY(-${
            heroHeight * 0.4
          }px) ${scaleTransform}`;
        });

        // Removed section parallax to eliminate stuttering - sections remain in natural position
      }

      // Company image parallax effect - image moves within container
      const companySection = document.querySelector(".company");
      const companyImageContainer = document.querySelector(".company__image");
      const companyImage = document.querySelector(".company__image img");

      if (companySection && companyImageContainer && companyImage) {
        const containerRect = companyImageContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowCenter = windowHeight / 2;

        // Check if container is in viewport
        if (containerRect.bottom > 0 && containerRect.top < windowHeight) {
          // Calculate the container's center position relative to window center
          const containerCenter = containerRect.top + (containerRect.height / 2);
          const distanceFromCenter = containerCenter - windowCenter;
          
          // Normalize the distance to a -1 to 1 range based on window height
          const normalizedPosition = distanceFromCenter / (windowHeight / 2);
          
          // Image is 120% height, giving us 20% extra space to move
          // Clamp the movement to stay within bounds
          const maxMovement = 10; // 10% up or down (20% total range)
          const parallaxOffset = Math.max(-maxMovement, Math.min(maxMovement, normalizedPosition * maxMovement));
          
          // Apply transform - negative values move image up, positive down
          companyImage.style.transform = `translateY(${parallaxOffset}%)`;
          companyImage.style.transition = 'none'; // Remove transition for smooth parallax
        }
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick);
    window.addEventListener("load", handleScroll);
  }
}

// Header scroll effect
class HeaderScroll {
  constructor() {
    this.header = document.querySelector(".header");
    this.scrollThreshold = 100; // Pixels to scroll before effect triggers
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll());
    // Initial check in case page is already scrolled
    this.handleScroll();
  }

  handleScroll() {
    const scrolled = window.pageYOffset;

    if (scrolled > this.scrollThreshold) {
      this.header.classList.add("header--scrolled");
    } else {
      this.header.classList.remove("header--scrolled");
    }
  }
}

// Testimonials Carousel Class
class TestimonialsCarousel {
  constructor() {
    this.track = document.querySelector(".testimonials__carousel-track");
    this.indicators = document.querySelectorAll(
      ".testimonials__indicators circle, .testimonials__indicators .testimonials__indicator"
    );
    this.currentSlide = 0;
    this.totalSlides = 2;

    this.init();
  }

  init() {
    this.updateIndicators();
    this.setupIndicatorClicks();
    this.startCarousel();
  }

  setupIndicatorClicks() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index);
      });
      indicator.style.cursor = "pointer";
    });
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    const translateX = this.currentSlide * -50; // Move by 50% for each slide
    this.track.style.transform = `translateX(${translateX}%)`;
    this.updateIndicators();
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.classList.remove("testimonials__indicator--active");
      // Handle both SVG circle elements and regular elements
      if (indicator.tagName === "circle") {
        indicator.setAttribute("fill", "#D9D9D9");
        indicator.setAttribute("fill-opacity", "1");
      } else {
        indicator.style.fill = "#D9D9D9";
        indicator.style.fillOpacity = "1";
      }
    });

    if (this.indicators[this.currentSlide]) {
      this.indicators[this.currentSlide].classList.add(
        "testimonials__indicator--active"
      );
      // Handle both SVG circle elements and regular elements
      if (this.indicators[this.currentSlide].tagName === "circle") {
        this.indicators[this.currentSlide].setAttribute("fill", "#999393");
        this.indicators[this.currentSlide].setAttribute("fill-opacity", "1");
      } else {
        this.indicators[this.currentSlide].style.fill = "#999393";
        this.indicators[this.currentSlide].style.fillOpacity = "1";
      }
    }
  }

  startCarousel() {
    setInterval(() => {
      this.nextSlide();
    }, 4000); // Change slide every 4 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    const translateX = this.currentSlide * -50; // Move by 50% for each slide
    this.track.style.transform = `translateX(${translateX}%)`;
    this.updateIndicators();
  }
}

// Footer Reveal Effect - Calculate and set spacer height
class FooterReveal {
  constructor() {
    this.footer = document.querySelector(".footer");
    this.spacer = document.getElementById("footer-spacer");
    this.init();
  }

  init() {
    this.setSpacerHeight();
    window.addEventListener("resize", () => this.setSpacerHeight());
  }

  setSpacerHeight() {
    if (this.footer && this.spacer) {
      // Get the actual height of the footer
      const footerHeight = this.footer.offsetHeight;
      // Set spacer height to match footer height
      this.spacer.style.height = `${footerHeight}px`;
    }
  }
}

// Header Dropdown Management
class HeaderDropdown {
  constructor() {
    this.dropdownLinks = document.querySelectorAll("[data-dropdown]");
    this.dropdowns = document.querySelectorAll(".header__dropdown");
    this.activeDropdown = null;
    this.activeMenuItem = null;
    this.init();
  }

  init() {
    // Add click event listeners to dropdown links
    this.dropdownLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const dropdownId = link.getAttribute("data-dropdown");
        const menuItem = link.closest(".header__menu-item");
        this.toggleDropdown(dropdownId, menuItem);
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".header__menu-item") &&
        !e.target.closest(".header__dropdown")
      ) {
        this.closeAllDropdowns();
      }
    });
  }

  toggleDropdown(dropdownId, menuItem) {
    const dropdown = document.getElementById(dropdownId);

    if (this.activeDropdown === dropdown && this.activeMenuItem === menuItem) {
      // Close if clicking same dropdown
      this.closeAllDropdowns();
    } else {
      // Close any open dropdown first
      this.closeAllDropdowns();
      // Open new dropdown
      this.openDropdown(dropdown, menuItem);
    }
  }

  openDropdown(dropdown, menuItem) {
    if (dropdown && menuItem) {
      dropdown.classList.add("active");
      menuItem.classList.add("active");
      this.activeDropdown = dropdown;
      this.activeMenuItem = menuItem;
    }
  }

  closeAllDropdowns() {
    this.dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
    document.querySelectorAll(".header__menu-item").forEach((item) => {
      item.classList.remove("active");
    });
    this.activeDropdown = null;
    this.activeMenuItem = null;
  }
}

// Initialize components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroCarousel();
  new HeaderScroll();
  new TestimonialsCarousel();
  new FooterReveal();
  new HeaderDropdown();
});
