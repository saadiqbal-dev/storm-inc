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
    this.track.style.transition =
      "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";

    // Setup content wrapper for each slide
    this.slides.forEach((slide, index) => {
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
    const previousIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;

    // First, start moving the images
    const translateX = -this.currentIndex * this.slideWidth;
    this.track.style.transition =
      "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
    this.track.style.transform = `translateX(${translateX}%)`;

    // Then, after 300ms delay, move the text faster to catch up
    setTimeout(() => {
      // Move text out of previous slide
      const prevContent =
        this.slides[previousIndex].querySelector(".hero__content");
      if (prevContent) {
        prevContent.style.transition =
          "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-out";
        prevContent.style.transform = "translateX(-100%)";
        prevContent.style.opacity = "0";
      }

      // Move text in for current slide
      const currentContent =
        this.slides[this.currentIndex].querySelector(".hero__content");
      if (currentContent) {
        // Position text off-screen to the right first
        currentContent.style.transition = "none";
        currentContent.style.transform = "translateX(100%)";
        currentContent.style.opacity = "0";

        // Then animate it in faster than the image
        setTimeout(() => {
          currentContent.style.transition =
            "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.6s ease-in";
          currentContent.style.transform = "translateX(0)";
          currentContent.style.opacity = "1";
        }, 50);
      }

      // Handle all other slides to keep them in sync
      this.slides.forEach((slide, index) => {
        if (index !== previousIndex && index !== this.currentIndex) {
          const content = slide.querySelector(".hero__content");
          if (content) {
            content.style.transition = "none";
            content.style.transform = "translateX(100%)";
            content.style.opacity = "0";
          }
        }
      });
    }, 300); // 300ms delay after image starts moving

    this.updateIndicators();

    // Reset to first slide seamlessly after last slide
    if (this.currentIndex === 0) {
      setTimeout(() => {
        // Reset without transition
        this.track.style.transition = "none";
        this.track.style.transform = "translateX(0%)";

        // Reset text positions
        this.slides.forEach((slide, index) => {
          const content = slide.querySelector(".hero__content");
          if (content) {
            content.style.transition = "none";
            if (index === 0) {
              content.style.transform = "translateX(0)";
              content.style.opacity = "1";
            } else {
              content.style.transform = "translateX(100%)";
              content.style.opacity = "0";
            }
          }
        });

        // Re-enable transitions
        setTimeout(() => {
          this.track.style.transition =
            "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
        }, 50);
      }, 1500);
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
        const heroContents = document.querySelectorAll(".hero__content");
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

        const heroContents = document.querySelectorAll(".hero__content");
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

      // Company image parallax effect
      const companySection = document.querySelector(".company");
      const companyImage = document.querySelector("div.company__image img");

      if (companySection && companyImage) {
        const rect = companySection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if section is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Simple parallax calculation based on how much the section has scrolled into view
          const scrollPercent =
            (windowHeight - rect.top) / (windowHeight + rect.height);
          const parallaxOffset = (scrollPercent - 0.5) * -300; // More noticeable movement

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
