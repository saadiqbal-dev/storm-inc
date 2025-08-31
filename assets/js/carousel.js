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
    this.indicators = document.querySelectorAll(
      ".hero__indicators circle"
    );
    this.currentIndex = 0;
    this.slideWidth = 33.333; // Each slide is 33.333% of track width
    this.autoSlideInterval = 6000; // 6 seconds

    this.init();
  }

  init() {
    this.setupCarousel();
    this.startAutoSlide();
    this.setupParallax();
  }

  setupCarousel() {
    // Set initial position to show first slide
    this.track.style.transform = "translateX(0%)";
    this.track.style.transition = "transform 1s ease-in-out";
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
      this.indicators[this.currentIndex].setAttribute(
        "fill-opacity",
        "1"
      );
    }
  }

  slideToNext() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    const translateX = -this.currentIndex * this.slideWidth;
    this.track.style.transform = `translateX(${translateX}%)`;
    this.updateIndicators();

    // Reset to first slide seamlessly after last slide
    if (this.currentIndex === 0) {
      setTimeout(() => {
        this.track.style.transition = "none";
        this.track.style.transform = "translateX(0%)";
        setTimeout(() => {
          this.track.style.transition = "transform 1s ease-in-out";
        }, 50);
      }, 1000);
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
        // Layer 1: Background images move at half speed (slower than scroll)
        const imageParallaxSpeed = -scrolled * 0;
        const heroBackgrounds =
          document.querySelectorAll(".hero__slide-bg");
        heroBackgrounds.forEach((bg) => {
          bg.style.transform = `translateY(${imageParallaxSpeed}px)`;
        });

        // Layer 2: Text content moves at 60% of image speed
        const textParallaxSpeed = -scrolled * 0.1;
        const heroContents = document.querySelectorAll(".hero__content");
        heroContents.forEach((content) => {
          content.style.transform = `translateY(${textParallaxSpeed}px)`;
        });

        // Create layered effect for next sections (removed footer from parallax)
        const contentSections = document.querySelectorAll(
          ".company, .industry, .services, .partners, .join, .testimonials"
        );
        contentSections.forEach((section) => {
          const layerOffset = -Math.min(scrolled * 0, heroHeight * 0.3);
          section.style.transform = `translateY(${layerOffset}px)`;
        });
      } else {
        // When past hero, hide backgrounds and text
        const heroBackgrounds =
          document.querySelectorAll(".hero__slide-bg");
        heroBackgrounds.forEach((bg) => {
          bg.style.transform = `translateY(-${heroHeight * 0.5}px)`;
        });

        const heroContents = document.querySelectorAll(".hero__content");
        heroContents.forEach((content) => {
          content.style.transform = `translateY(-${heroHeight * 0.3}px)`;
        });

        const contentSections = document.querySelectorAll(
          ".company, .industry, .services, .partners, .join, .testimonials"
        );
        contentSections.forEach((section) => {
          section.style.transform = "translateY(0px)";
        });
      }

      // Company image parallax effect
      const companySection = document.querySelector(".company");
      const companyImage = document.querySelector(
        "div.company__image img"
      );

      if (companySection && companyImage) {
        const rect = companySection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if section is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Simple parallax calculation based on how much the section has scrolled into view
          const scrollPercent =
            (windowHeight - rect.top) / (windowHeight + rect.height);
          const parallaxOffset = (scrollPercent - 0.5) * -100; // More noticeable movement

          companyImage.style.transform = `translateY(${parallaxOffset}px)`;
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
    this.currentSlide = 0;
    this.totalSlides = 2;
    
    this.startCarousel();
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

    if (
      this.activeDropdown === dropdown &&
      this.activeMenuItem === menuItem
    ) {
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