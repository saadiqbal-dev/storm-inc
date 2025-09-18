/**
 * Storm Inc - Carousel and Interactive Components
 * This file contains all the interactive functionality for the Storm Inc website
 */

// Transform Manager Class - Handles combining multiple transform sources
class TransformManager {
  constructor() {
    this.transforms = new Map();
  }

  setTransform(element, key, value) {
    if (!this.transforms.has(element)) {
      this.transforms.set(element, new Map());
    }
    this.transforms.get(element).set(key, value);
    this.applyTransforms(element);
  }

  removeTransform(element, key) {
    if (this.transforms.has(element)) {
      this.transforms.get(element).delete(key);
      this.applyTransforms(element);
    }
  }

  applyTransforms(element) {
    if (!this.transforms.has(element)) return;

    const elementTransforms = this.transforms.get(element);
    const transformString = Array.from(elementTransforms.values()).join(" ");
    element.style.transform = transformString;
  }

  clear(element) {
    if (this.transforms.has(element)) {
      this.transforms.get(element).clear();
      element.style.transform = "";
    }
  }

  clearAll() {
    this.transforms.clear();
  }
}

// Hero Carousel Class
class HeroCarousel {
  constructor() {
    this.track = document.querySelector(".hero__carousel-track");
    this.slides = document.querySelectorAll(".hero__slide");
    this.heroSection = document.getElementById("hero");
    this.indicators = document.querySelectorAll(".hero__indicators circle");
    this.currentIndex = 0;
    this.absoluteIndex = 0; // Track absolute position for infinite scrolling
    this.autoSlideInterval = 6000; // 6 seconds
    this.isTransitioning = false;
    this.isPaused = false;
    this.autoSlideTimer = null;
    this.scrollRAF = null;
    this.lastScrollTime = 0;
    this.scrollThrottle = 16; // ~60fps
    this.transformManager = new TransformManager();
    this.isDestroyed = false;
    this.currentVisibleContent = null; // Track currently visible slide content
    this.currentVisibleWrapper = null; // Track currently visible slide content wrapper for parallax

    // Mouse drag state
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragCurrentX = 0;

    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    this.init();
  }

  init() {
    if (!this.track || !this.slides.length) return;

    this.setupInfiniteCarousel();
    this.setupCarousel();
    this.applyKenBurnsSmoothing();
    this.setupAccessibility();
    this.setupEventListeners();
    this.startAutoSlide();
    this.setupParallax();
  }

  applyKenBurnsSmoothing() {
    // Avoid background "snap" by making Ken Burns alternate smoothly
    const backgrounds = document.querySelectorAll(".hero__slide-bg");
    backgrounds.forEach((bg) => {
      bg.style.animationDirection = "alternate";
      bg.style.animationIterationCount = "infinite";
      bg.style.animationFillMode = "both";
    });
  }

  setupInfiniteCarousel() {
    // Clone all slides for seamless infinite scroll in both directions
    this.originalSlidesCount = this.slides.length;

    // Clone slides at the end for forward navigation
    this.slides.forEach((slide) => {
      const clonedSlide = slide.cloneNode(true);
      clonedSlide.classList.add("cloned-slide", "cloned-slide-after");
      this.track.appendChild(clonedSlide);
    });

    // Clone slides at the beginning for backward navigation
    const firstSlide = this.track.firstElementChild;
    for (let i = this.slides.length - 1; i >= 0; i--) {
      const clonedSlide = this.slides[i].cloneNode(true);
      clonedSlide.classList.add("cloned-slide", "cloned-slide-before");
      this.track.insertBefore(clonedSlide, firstSlide);
    }

    // Update track and slide references
    this.allSlides = document.querySelectorAll(".hero__slide");
    const totalSlides = this.allSlides.length;

    // Set track width to accommodate all slides (original + clones)
    this.track.style.width = `${totalSlides * 100}%`;

    // Update individual slide widths
    this.slideWidth = 100 / totalSlides;
    this.allSlides.forEach((slide) => {
      slide.style.width = `${this.slideWidth}%`;
    });

    // Start at the first original slide (after the prepended clones)
    this.absoluteIndex = this.originalSlidesCount;
    const initialTranslate = -this.absoluteIndex * this.slideWidth;
    this.transformManager.setTransform(
      this.track,
      "carousel",
      `translate3d(${initialTranslate}%, 0, 0)`
    );
  }

  setupCarousel() {
    // Set transition for smooth animations
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
          // Ensure wrapper has no transform transition so parallax is instant
          wrapper.style.transition = "none";
        }

        // Set initial visibility based on position
        const isCurrentSlide = index === this.absoluteIndex;
        content.style.opacity = isCurrentSlide ? "1" : "0";
        this.transformManager.setTransform(
          content,
          "carousel",
          isCurrentSlide ? "translate3d(0, 0, 0)" : "translate3d(100%, 0, 0)"
        );
        content.style.transition = "none";
        content.style.position = "relative";
      }
    });

    this.updateIndicators();

    // Initialize current visible content
    this.updateCurrentVisibleContent();
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

    // Update current visible content reference
    this.updateCurrentVisibleContent();
  }

  updateCurrentVisibleContent() {
    // Find the currently visible slide's content element
    const visibleSlideIndex = this.absoluteIndex;
    if (this.allSlides && this.allSlides[visibleSlideIndex]) {
      const newContent =
        this.allSlides[visibleSlideIndex].querySelector(".hero__content");
      const newWrapper = newContent ? newContent.parentElement : null;

      // Clear parallax from previous wrapper if it exists
      if (
        this.currentVisibleWrapper &&
        this.currentVisibleWrapper !== newWrapper
      ) {
        this.transformManager.removeTransform(
          this.currentVisibleWrapper,
          "parallax"
        );
      }

      this.currentVisibleContent = newContent;
      this.currentVisibleWrapper = newWrapper;
    }
  }

  slideToNext() {
    this.slideTo(this.currentIndex + 1);
  }

  slideToPrev() {
    this.slideTo(this.currentIndex - 1);
  }

  slideTo(targetIndex) {
    if (this.isTransitioning || this.isDestroyed) return;

    return new Promise((resolve) => {
      this.isTransitioning = true;

      const previousIndex = this.currentIndex;
      const direction = targetIndex > this.currentIndex ? 1 : -1;

      // Update indices
      this.currentIndex =
        ((targetIndex % this.originalSlidesCount) + this.originalSlidesCount) %
        this.originalSlidesCount;
      this.absoluteIndex += targetIndex - previousIndex;

      // Move carousel
      const translateX = -this.absoluteIndex * this.slideWidth;
      this.track.style.transition = this.prefersReducedMotion
        ? "transform 0.3s ease-in-out"
        : "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
      this.transformManager.setTransform(
        this.track,
        "carousel",
        `translate3d(${translateX}%, 0, 0)`
      );

      // Animate text content with better synchronization
      this.animateContent(previousIndex, this.currentIndex, direction);
      this.updateIndicators();

      // Handle infinite scroll reset
      const resetDelay = this.prefersReducedMotion ? 350 : 1300;

      setTimeout(() => {
        // Check if we need to reset position for infinite scroll
        if (this.absoluteIndex >= this.originalSlidesCount * 2) {
          // Went too far forward, reset to middle
          this.resetPosition(this.currentIndex + this.originalSlidesCount);
        } else if (this.absoluteIndex < this.originalSlidesCount) {
          // Went too far backward, reset to middle
          this.resetPosition(this.currentIndex + this.originalSlidesCount);
        }

        this.isTransitioning = false;
        resolve();
      }, resetDelay);
    });
  }

  resetPosition(newAbsoluteIndex) {
    this.track.style.transition = "none";
    this.absoluteIndex = newAbsoluteIndex;
    const resetTranslateX = -this.absoluteIndex * this.slideWidth;
    this.transformManager.setTransform(
      this.track,
      "carousel",
      `translate3d(${resetTranslateX}%, 0, 0)`
    );

    // Force reflow before re-enabling transitions
    void this.track.offsetHeight;

    setTimeout(() => {
      this.track.style.transition = this.prefersReducedMotion
        ? "transform 0.3s ease-in-out"
        : "transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
    }, 50);
  }

  animateContent(fromIndex, toIndex, direction) {
    // Clear parallax transforms from all wrappers before animating
    this.allSlides.forEach((slide) => {
      const wrapper = slide.querySelector(".hero__content-wrapper");
      if (wrapper) {
        this.transformManager.removeTransform(wrapper, "parallax");
      }
    });

    if (this.prefersReducedMotion) {
      // Simple fade for reduced motion
      this.allSlides.forEach((slide) => {
        const content = slide.querySelector(".hero__content");
        if (content) {
          const slideIndex = Array.from(this.allSlides).indexOf(slide);
          const originalIndex = this.getOriginalIndex(slideIndex);

          if (originalIndex === toIndex) {
            content.style.opacity = "1";
          } else {
            content.style.opacity = "0";
          }
        }
      });
      return;
    }

    // Full animation for normal motion preference
    this.allSlides.forEach((slide) => {
      const content = slide.querySelector(".hero__content");
      if (content) {
        const slideIndex = Array.from(this.allSlides).indexOf(slide);
        const originalIndex = this.getOriginalIndex(slideIndex);

        if (originalIndex === fromIndex) {
          // Previous slide animates out
          content.style.transition =
            "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-out";
          this.transformManager.setTransform(
            content,
            "carousel",
            `translate3d(${direction > 0 ? -100 : 100}%, 0, 0)`
          );
          content.style.opacity = "0";
        } else if (originalIndex === toIndex) {
          // New slide animates in
          content.style.transition = "none";
          this.transformManager.setTransform(
            content,
            "carousel",
            `translate3d(${direction > 0 ? 100 : -100}%, 0, 0)`
          );
          content.style.opacity = "0";

          // Trigger animation after a frame
          requestAnimationFrame(() => {
            content.style.transition =
              "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.6s ease-in";
            this.transformManager.setTransform(
              content,
              "carousel",
              "translate3d(0, 0, 0)"
            );
            content.style.opacity = "1";
          });
        } else {
          // Other slides stay hidden
          content.style.transition = "none";
          this.transformManager.setTransform(
            content,
            "carousel",
            "translate3d(100%, 0, 0)"
          );
          content.style.opacity = "0";
        }
      }
    });
  }

  getOriginalIndex(slideIndex) {
    // Handle cloned slides
    if (slideIndex < this.originalSlidesCount) {
      // Before clones
      return slideIndex;
    } else if (slideIndex < this.originalSlidesCount * 2) {
      // Original slides
      return slideIndex - this.originalSlidesCount;
    } else {
      // After clones
      return slideIndex - this.originalSlidesCount * 2;
    }
  }

  startAutoSlide() {
    if (this.isDestroyed) return;

    // Clear existing timer if any
    this.stopAutoSlide();

    // Reset pause state to ensure auto-slide starts
    this.isPaused = false;

    // Start new timer
    this.autoSlideTimer = setInterval(() => {
      if (!this.isPaused && !this.isTransitioning && !this.isDestroyed) {
        this.slideToNext();
      }
    }, this.autoSlideInterval);

    // Pause when tab is not visible
    if (!this.visibilityHandler) {
      this.visibilityHandler = this.handleVisibilityChange.bind(this);
      document.addEventListener("visibilitychange", this.visibilityHandler);
    }
  }

  stopAutoSlide() {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
      this.autoSlideTimer = null;
    }
  }

  pause() {
    this.isPaused = true;
    this.stopAutoSlide();
  }

  resume() {
    this.isPaused = false;
    this.startAutoSlide();
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    } else {
      this.resume();
    }
  }

  setupAccessibility() {
    // Add ARIA labels
    this.heroSection.setAttribute("role", "region");
    this.heroSection.setAttribute("aria-label", "Image carousel");
    this.heroSection.setAttribute("aria-roledescription", "carousel");

    // Add live region for announcements
    const liveRegion = document.createElement("div");
    liveRegion.className = "sr-only";
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    this.heroSection.appendChild(liveRegion);
    this.liveRegion = liveRegion;

    // Update indicators with ARIA
    this.indicators.forEach((indicator, index) => {
      indicator.setAttribute("role", "button");
      indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);
      indicator.setAttribute("tabindex", "0");
    });

    // Add controls hint
    const controlsHint = document.createElement("div");
    controlsHint.className = "sr-only";
    controlsHint.textContent = "Use arrow keys to navigate, space to pause";
    this.heroSection.insertBefore(controlsHint, this.heroSection.firstChild);
  }

  setupEventListeners() {
    // Keyboard navigation
    this.heroSection.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          this.slideToPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          this.slideToNext();
          break;
        case " ":
        case "Spacebar":
          e.preventDefault();
          this.isPaused ? this.resume() : this.pause();
          break;
      }
    });

    // Only pause when directly interacting with controls, not entire hero section
    // Pause when focusing on interactive elements within hero
    this.heroSection.addEventListener("focusin", (e) => {
      // Only pause if focusing on interactive elements (buttons, indicators)
      if (e.target.matches('button, [role="button"], a')) {
        this.pause();
      }
    });

    this.heroSection.addEventListener("focusout", (e) => {
      // Resume when focus leaves interactive elements
      if (!this.heroSection.contains(e.relatedTarget)) {
        this.resume();
      }
    });

    // Make indicators clickable
    this.indicators.forEach((indicator, index) => {
      const clickHandler = () => {
        if (!this.isTransitioning) {
          const targetAbsolute = index + this.absoluteIndex - this.currentIndex;
          this.slideTo(index);
        }
      };

      indicator.addEventListener("click", clickHandler);
      indicator.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          clickHandler();
        }
      });

      // Add hover effect and pause on hover
      indicator.style.cursor = "pointer";
      indicator.addEventListener("mouseenter", () => {
        if (!indicator.classList.contains("hero__indicator--active")) {
          indicator.setAttribute("fill-opacity", "0.6");
        }
        // Pause carousel when hovering over indicators
        this.pause();
      });
      indicator.addEventListener("mouseleave", () => {
        if (!indicator.classList.contains("hero__indicator--active")) {
          indicator.setAttribute("fill-opacity", "0.35");
        }
        // Resume carousel when leaving indicators
        this.resume();
      });
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    this.heroSection.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.heroSection.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      },
      { passive: true }
    );

    // Mouse drag support (desktop)
    let mouseDown = false;
    let mouseStartX = 0;
    let mouseCurrentX = 0;

    const onMouseDown = (e) => {
      if (e.button !== 0) return; // Only left click
      mouseDown = true;
      mouseStartX = e.clientX;
      mouseCurrentX = mouseStartX;
      this.isDragging = true;
      this.dragStartX = mouseStartX;
      this.dragCurrentX = mouseCurrentX;
      this.pause();
      // Prevent text selection while dragging
      document.body.style.userSelect = "none";
      this.heroSection.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
      if (!mouseDown) return;
      mouseCurrentX = e.clientX;
      const deltaX = mouseCurrentX - mouseStartX;
      this.dragCurrentX = mouseCurrentX;
      // Visual feedback: offset track with a temporary drag transform
      this.transformManager.setTransform(
        this.track,
        "drag",
        `translate3d(${deltaX}px, 0, 0)`
      );
    };

    const endMouseDrag = () => {
      if (!mouseDown) return;
      mouseDown = false;
      const deltaX = mouseCurrentX - mouseStartX;
      this.isDragging = false;
      // Remove drag transform
      this.transformManager.removeTransform(this.track, "drag");
      // Restore selection/cursor
      document.body.style.userSelect = "";
      this.heroSection.style.cursor = "";

      const threshold = 50;
      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0) {
          this.slideToNext();
        } else {
          this.slideToPrev();
        }
      }
      this.resume();
    };

    this.heroSection.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseup", endMouseDrag, { passive: true });
    this.heroSection.addEventListener("mouseleave", endMouseDrag, {
      passive: true,
    });
  }

  handleSwipe(startX, endX) {
    const threshold = 50; // Minimum swipe distance
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left, go next
        this.slideToNext();
      } else {
        // Swipe right, go previous
        this.slideToPrev();
      }
    }
  }

  setupParallax() {
    const handleScroll = () => {
      const now = Date.now();

      // Throttle scroll events
      if (now - this.lastScrollTime < this.scrollThrottle) {
        return;
      }
      this.lastScrollTime = now;

      const scrolled = window.pageYOffset;
      const heroHeight = this.heroSection.offsetHeight;

      // Skip parallax if reduced motion is preferred
      if (this.prefersReducedMotion) return;

      // Apply dual-layer parallax effect
      if (scrolled < heroHeight) {
        // Layer 1: Background images move at slower speed (creates depth)
        // Apply to ALL backgrounds for smoother effect
        const imageParallaxSpeed = -scrolled * 0.5;
        const heroBackgrounds = document.querySelectorAll(".hero__slide-bg");
        heroBackgrounds.forEach((bg) => {
          this.transformManager.setTransform(
            bg,
            "parallax",
            `translate3d(0, ${imageParallaxSpeed}px, 0)`
          );
        });

        // Layer 2: Text content moves at different speed (apply to wrappers to avoid transition lag)
        const textParallaxSpeed = -scrolled * 0.3;
        const wrappers = document.querySelectorAll(".hero__content-wrapper");
        wrappers.forEach((wrap) => {
          this.transformManager.setTransform(
            wrap,
            "parallax",
            `translate3d(0, ${textParallaxSpeed}px, 0)`
          );
        });
      } else {
        // When past hero, continue parallax effect but with smooth fade-out
        const maxBgTransform = -heroHeight * 0.6;
        const maxTextTransform = -heroHeight * 0.4;

        const heroBackgrounds = document.querySelectorAll(".hero__slide-bg");
        heroBackgrounds.forEach((bg) => {
          this.transformManager.setTransform(
            bg,
            "parallax",
            `translate3d(0, ${maxBgTransform}px, 0)`
          );
        });

        // Apply to all wrappers for consistency
        const wrappers = document.querySelectorAll(".hero__content-wrapper");
        wrappers.forEach((wrap) => {
          this.transformManager.setTransform(
            wrap,
            "parallax",
            `translate3d(0, ${maxTextTransform}px, 0)`
          );
        });
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
          const containerCenter = containerRect.top + containerRect.height / 2;
          const distanceFromCenter = containerCenter - windowCenter;

          // Normalize the distance to a -1 to 1 range based on window height
          const normalizedPosition = distanceFromCenter / (windowHeight / 2);

          // Image is 120% height, giving us 20% extra space to move
          // Clamp the movement to stay within bounds
          const maxMovement = 10; // 10% up or down (20% total range)
          const parallaxOffset = Math.max(
            -maxMovement,
            Math.min(maxMovement, normalizedPosition * maxMovement)
          );

          // Apply transform - negative values move image up, positive down
          companyImage.style.transform = `translateY(${parallaxOffset}%)`;
          companyImage.style.transition = "none"; // Remove transition for smooth parallax
        }
      }
    };

    // Use requestAnimationFrame for smooth scrolling
    const requestScroll = () => {
      if (this.scrollRAF) {
        cancelAnimationFrame(this.scrollRAF);
      }

      this.scrollRAF = requestAnimationFrame(() => {
        if (!this.isDestroyed) {
          handleScroll();
        }
      });
    };

    window.addEventListener("scroll", requestScroll, { passive: true });
    window.addEventListener("load", handleScroll);

    // Store references for cleanup
    this.scrollHandler = requestScroll;
  }

  // Destroy method for cleanup
  destroy() {
    if (this.isDestroyed) return;
    this.isDestroyed = true;

    // Stop auto slide
    this.stopAutoSlide();

    // Remove event listeners
    window.removeEventListener("scroll", this.scrollHandler);
    if (this.visibilityHandler) {
      document.removeEventListener("visibilitychange", this.visibilityHandler);
    }

    // Cancel animation frames
    if (this.scrollRAF) {
      cancelAnimationFrame(this.scrollRAF);
    }

    // Clear transforms
    this.transformManager.clearAll();

    // Remove added DOM elements
    if (this.liveRegion) {
      this.liveRegion.remove();
    }

    // Remove cloned slides
    const clonedSlides = document.querySelectorAll(".cloned-slide");
    clonedSlides.forEach((slide) => slide.remove());

    // Reset track width
    if (this.track) {
      this.track.style.width = "";
      this.track.style.transform = "";
    }

    // Clear references
    this.track = null;
    this.slides = null;
    this.allSlides = null;
    this.heroSection = null;
    this.indicators = null;
    this.transformManager = null;
  }
}

// Header scroll effect
// Header scroll functionality has been moved to header.js

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

// Footer reveal and header dropdown functionality have been moved to header.js
// This allows these features to work on all pages without carousel dependency

// Initialize carousel components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Store references for potential cleanup
  window.StormCarousels = {
    hero: new HeroCarousel(),
    testimonials: new TestimonialsCarousel(),
  };

  // Note: HeaderScroll, FooterReveal, and HeaderDropdown are now initialized in header.js
});
