/**
 * Storm Inc - Main JavaScript
 * Modern, unobtrusive JavaScript following best practices
 */

(function (window, document, $) {
  "use strict";

  // Main application namespace to avoid global pollution
  const StormApp = {
    // Configuration
    config: {
      breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
      },
      animationDuration: 300,
      debounceDelay: 250,
    },

    // Utility functions
    utils: {
      // Debounce function for performance
      debounce: function (func, wait, immediate) {
        let timeout;
        return function executedFunction() {
          const context = this;
          const args = arguments;
          const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          const callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      },

      // Throttle function for scroll events
      throttle: function (func, limit) {
        let inThrottle;
        return function () {
          const args = arguments;
          const context = this;
          if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
          }
        };
      },

      // Get current viewport width
      getViewportWidth: function () {
        return Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        );
      },

      // Check if element is in viewport
      isInViewport: function (element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      },

      // Smooth scroll to element
      scrollToElement: function (target, offset = 0) {
        const element =
          typeof target === "string" ? document.querySelector(target) : target;
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      },
    },

    // Navigation functionality
    navigation: {
      init: function () {
        this.setupSmoothScroll();
        this.setupMobileMenuBehavior();
        this.setupActiveStateTracking();
      },

      setupSmoothScroll: function () {
        // Smooth scroll for anchor links
        $(document).on("click", 'a[href^="#"]:not([href="#"])', function (e) {
          const target = $(this.getAttribute("href"));
          if (target.length) {
            e.preventDefault();
            const headerHeight = $(".header").outerHeight() || 0;
            StormApp.utils.scrollToElement(target[0], headerHeight + 20);

            // Update URL without jumping
            if (history.pushState) {
              history.pushState(null, null, this.getAttribute("href"));
            }
          }
        });
      },

      setupMobileMenuBehavior: function () {
        // Custom mobile menu functionality for screens ≤768px
        const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
        const mobileMenuClose = document.getElementById("mobile-menu-close");
        const mobileMenu = document.getElementById("mobile-menu");
        const mobileMenuLinks = document.querySelectorAll(
          ".mobile-menu__nav-link:not(.mobile-menu__nav-link--dropdown)"
        );
        const mobileDropdownButtons = document.querySelectorAll(
          ".mobile-menu__nav-link--dropdown"
        );

        if (mobileMenuToggle && mobileMenu) {
          // Open mobile menu
          mobileMenuToggle.addEventListener("click", function () {
            mobileMenu.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent scrolling
          });

          // Close mobile menu
          const closeMobileMenu = function () {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = ""; // Restore scrolling
          };

          if (mobileMenuClose) {
            mobileMenuClose.addEventListener("click", closeMobileMenu);
          }

          // Close menu when clicking on navigation links (not dropdown buttons)
          mobileMenuLinks.forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
          });

          // Handle dropdown toggles
          mobileDropdownButtons.forEach(function (button) {
            button.addEventListener("click", function (e) {
              e.preventDefault();

              // Get the dropdown ID
              const dropdownId = button.getAttribute("data-dropdown");
              const dropdown = document.getElementById(
                dropdownId + "-dropdown"
              );

              if (dropdown) {
                // Toggle active states
                button.classList.toggle("active");
                dropdown.classList.toggle("active");

                // Close other dropdowns
                mobileDropdownButtons.forEach(function (otherButton) {
                  if (otherButton !== button) {
                    otherButton.classList.remove("active");
                    const otherDropdownId =
                      otherButton.getAttribute("data-dropdown");
                    const otherDropdown = document.getElementById(
                      otherDropdownId + "-dropdown"
                    );
                    if (otherDropdown) {
                      otherDropdown.classList.remove("active");
                    }
                  }
                });
              }
            });
          });

          // Close menu when clicking outside
          mobileMenu.addEventListener("click", function (e) {
            if (e.target === mobileMenu) {
              closeMobileMenu();
            }
          });

          // Close menu with ESC key
          document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
              closeMobileMenu();
            }
          });
        }

        // Legacy Bootstrap mobile menu behavior (for desktop menu)
        $(".navbar-nav .nav-link").on("click", function () {
          const navbarCollapse = $(".navbar-collapse");
          if (navbarCollapse.hasClass("show")) {
            $(".navbar-toggler").click();
          }
        });

        // Close mobile menu when clicking outside
        $(document).on("click", function (e) {
          const navbar = $(".navbar-collapse");
          const toggler = $(".navbar-toggler");

          if (
            navbar.hasClass("show") &&
            !navbar.is(e.target) &&
            navbar.has(e.target).length === 0 &&
            !toggler.is(e.target)
          ) {
            toggler.click();
          }
        });
      },

      setupActiveStateTracking: function () {
        // Update active nav item based on scroll position
        const updateActiveNavItem = StormApp.utils.throttle(function () {
          const scrollPosition = $(window).scrollTop() + 100;
          const sections = $("section[id]");

          sections.each(function () {
            const section = $(this);
            const sectionTop = section.offset().top;
            const sectionHeight = section.outerHeight();
            const sectionId = section.attr("id");

            if (
              scrollPosition >= sectionTop &&
              scrollPosition < sectionTop + sectionHeight
            ) {
              $(".navbar-nav .nav-link").removeClass("active");
              $(`.navbar-nav .nav-link[href="#${sectionId}"]`).addClass(
                "active"
              );
            }
          });
        }, 100);

        $(window).on("scroll", updateActiveNavItem);
      },
    },

    // Form handling
    forms: {
      init: function () {
        this.setupValidation();
        this.setupSubmission();
      },

      setupValidation: function () {
        // Real-time form validation
        $("form").each(function () {
          const form = this;

          // Validate on submit
          $(form).on("submit", function (e) {
            if (!form.checkValidity()) {
              e.preventDefault();
              e.stopPropagation();
            }
            $(form).addClass("was-validated");
          });

          // Real-time validation for individual fields
          $(form)
            .find("input, textarea, select")
            .on("blur", function () {
              const field = $(this);
              const isValid = this.checkValidity();

              field.removeClass("is-valid is-invalid");
              field.addClass(isValid ? "is-valid" : "is-invalid");
            });
        });
      },

      setupSubmission: function () {
        // Handle form submissions with loading states
        $('form[data-ajax="true"]').on("submit", function (e) {
          e.preventDefault();

          const form = $(this);
          const submitButton = form.find('[type="submit"]');
          const originalText = submitButton.text();

          // Show loading state
          submitButton.prop("disabled", true).html(`
            <span class="loading loading--dark me-2"></span>
            Submitting...
          `);

          // Simulate form submission (replace with actual AJAX call)
          setTimeout(function () {
            submitButton.prop("disabled", false).text(originalText);
            // Handle success/error states here
          }, 2000);
        });
      },
    },

    // Performance optimizations
    performance: {
      init: function () {
        this.setupLazyLoading();
        this.setupImageOptimization();
      },

      setupLazyLoading: function () {
        // Native lazy loading fallback for older browsers
        if ("loading" in HTMLImageElement.prototype) {
          // Native lazy loading is supported
          $("img[data-src]").each(function () {
            $(this)
              .attr("src", $(this).attr("data-src"))
              .removeAttr("data-src");
          });
        } else {
          // Fallback for older browsers
          this.implementIntersectionObserver();
        }
      },

      implementIntersectionObserver: function () {
        if ("IntersectionObserver" in window) {
          const imageObserver = new IntersectionObserver(function (
            entries
          ) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                imageObserver.unobserve(img);
              }
            });
          });

          $("img[data-src]").each(function () {
            imageObserver.observe(this);
          });
        }
      },

      setupImageOptimization: function () {
        // WebP support detection and fallback
        const supportsWebP = (function () {
          const canvas = document.createElement("canvas");
          canvas.width = 1;
          canvas.height = 1;
          return (
            canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0
          );
        })();

        if (!supportsWebP) {
          $('picture source[type="image/webp"]').remove();
        }
      },
    },

    // Accessibility enhancements
    accessibility: {
      init: function () {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupARIAEnhancements();
      },

      setupKeyboardNavigation: function () {
        // ESC key to close modals/dropdowns
        $(document).on("keydown", function (e) {
          if (e.key === "Escape") {
            // Close any open Bootstrap components
            $(".modal.show").modal("hide");
            $(".dropdown-menu.show").dropdown("hide");
            $(".navbar-collapse.show").collapse("hide");
          }
        });

        // Tab trap for modals
        $(document).on("shown.bs.modal", ".modal", function () {
          const modal = $(this);
          const focusableElements = modal.find(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements.first();
          const lastElement = focusableElements.last();

          firstElement.focus();

          modal.on("keydown", function (e) {
            if (e.key === "Tab") {
              if (e.shiftKey) {
                if (document.activeElement === firstElement[0]) {
                  e.preventDefault();
                  lastElement.focus();
                }
              } else {
                if (document.activeElement === lastElement[0]) {
                  e.preventDefault();
                  firstElement.focus();
                }
              }
            }
          });
        });
      },

      setupFocusManagement: function () {
        // Skip link functionality
        $(".skip-link").on("click", function (e) {
          e.preventDefault();
          const target = $($(this).attr("href"));
          if (target.length) {
            target.attr("tabindex", "-1").focus();
          }
        });

        // Focus management for dynamic content
        $(document).on("shown.bs.collapse", function (e) {
          const firstFocusable = $(e.target)
            .find(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            .first();
          if (firstFocusable.length) {
            firstFocusable.focus();
          }
        });
      },

      setupARIAEnhancements: function () {
        // Dynamic ARIA updates for loading states
        $(document).on("submit", "form", function () {
          const form = $(this);
          form.attr("aria-busy", "true");

          // Remove aria-busy after form processing
          setTimeout(function () {
            form.removeAttr("aria-busy");
          }, 2000);
        });

        // ARIA live region for dynamic content updates
        if (!$("#live-region").length) {
          $("body").append(
            '<div id="live-region" class="sr-only" aria-live="polite" aria-atomic="true"></div>'
          );
        }
      },
    },

    // Services grid mobile functionality
    services: {
      init: function () {
        this.setupMobileClickToReveal();
      },

      setupMobileClickToReveal: function () {
        // Only apply on mobile devices (≤768px)
        if (StormApp.utils.getViewportWidth() <= 768) {
          // Add click event to expandable service items
          $(".services__item--expandable").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            const $this = $(this);

            // Toggle expanded class
            $this.toggleClass("expanded");

            // Close other expanded items (optional - remove if you want multiple items open)
            $(".services__item--expandable").not($this).removeClass("expanded");
          });

          // Close expanded items when clicking outside the grid
          $(document).on("click.servicesOutside", function (e) {
            // Check if the click is outside any service item
            if (!$(e.target).closest(".services__item--expandable").length) {
              $(".services__item--expandable").removeClass("expanded");
            }
          });
        }

        // Handle window resize to add/remove click handlers
        let resizeTimer;
        $(window).on("resize", function () {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function () {
            // Remove all click handlers first
            $(".services__item--expandable").off("click");
            $(document).off("click.servicesOutside");

            // Re-apply based on viewport width
            if (StormApp.utils.getViewportWidth() <= 768) {
              $(".services__item--expandable").on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();

                const $this = $(this);

                // Toggle expanded class
                $this.toggleClass("expanded");

                // Close other expanded items
                $(".services__item--expandable")
                  .not($this)
                  .removeClass("expanded");
              });

              // Re-apply outside click handler
              $(document).on("click.servicesOutside", function (e) {
                if (
                  !$(e.target).closest(".services__item--expandable").length
                ) {
                  $(".services__item--expandable").removeClass("expanded");
                }
              });
            } else {
              // Remove expanded class on desktop
              $(".services__item--expandable").removeClass("expanded");
            }
          }, 250);
        });
      },
    },

    // Partners infinite scroll
    partners: {
      scrollPosition: 0,
      scrollSpeed: 2, // Pixels per frame
      animationId: null,

      init: function () {
        this.setupInfiniteScroll();
      },

      setupInfiniteScroll: function () {
        const $track = $(".partners__slide-track");
        if (!$track.length) return;

        // Get original logos (supports both class names for compatibility)
        const $logos = $track.find(".partners__images-img, .partners__images-img__template");
        const logoCount = $logos.length / 4; // We have 4 sets, get single set count

        // Keep only 2 sets of logos for smooth infinite scroll
        $track.empty();

        // Add two full sets
        for (let j = 0; j < 2; j++) {
          for (let i = 0; i < logoCount; i++) {
            $track.append($logos.eq(i).clone());
          }
        }

        // Start the animation
        this.animateScroll($track);

        // Pause on hover
        $track.on("mouseenter", () => {
          this.pauseScroll();
        });

        $track.on("mouseleave", () => {
          this.resumeScroll($track);
        });
      },

      animateScroll: function ($track) {
        const animate = () => {
          this.scrollPosition += this.scrollSpeed;

          // Get the first logo (supports both class names for compatibility)
          const $firstLogo = $track.find(".partners__images-img, .partners__images-img__template").first();
          const logoWidth = $firstLogo.outerWidth(true);

          // When the first logo is completely scrolled out of view, move it to the end
          if (this.scrollPosition >= logoWidth) {
            // Move the first logo to the end
            $track.append($firstLogo);

            // Adjust the scroll position by subtracting the width of the moved logo
            this.scrollPosition -= logoWidth;

            // Immediately update the transform to prevent jump
            $track.css({
              transform: `translate3d(-${this.scrollPosition}px, 0, 0)`,
            });
          }

          // Apply smooth transform
          $track.css({
            transform: `translate3d(-${this.scrollPosition}px, 0, 0)`,
          });

          // Continue animation
          this.animationId = requestAnimationFrame(animate);
        };

        this.animationId = requestAnimationFrame(animate);
      },

      pauseScroll: function () {
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }
      },

      resumeScroll: function ($track) {
        if (!this.animationId) {
          this.animateScroll($track);
        }
      },
    },

    // Blog Filter Badges
    blogFilters: {
      init: function () {
        this.setupFilterBadges();
      },

      setupFilterBadges: function () {
        const $badges = $('.blog-filter-badge');
        if (!$badges.length) return;

        $badges.on('click', function (e) {
          e.preventDefault();
          
          // Remove active class from all badges
          $badges.removeClass('blog-filter-badge--active');
          
          // Add active class to clicked badge
          $(this).addClass('blog-filter-badge--active');
          
          // Get filter value
          const filter = $(this).data('filter');
          
          // Filter blog posts (placeholder for future implementation)
          // This is where you would filter the actual blog posts
          console.log('Filter selected:', filter);
          
          // Trigger custom event for other scripts
          $(document).trigger('blogfilter:changed', [filter]);
        });
      }
    },

    // Parallax scroll effect
    parallax: {
      elements: [],
      isAnimating: false,
      observer: null,

      init: function () {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return;
        }

        // Find all parallax elements
        const parallaxSections = document.querySelectorAll('[data-parallax]');
        if (!parallaxSections.length) return;

        // Setup each parallax element
        parallaxSections.forEach(section => {
          const bg = section.querySelector('[data-parallax-bg]');
          if (bg) {
            this.elements.push({
              section: section,
              bg: bg,
              offset: 0
            });
          }
        });

        if (this.elements.length === 0) return;

        // Setup IntersectionObserver
        this.setupObserver();

        // Initial position update
        this.updatePositions();

        // Setup scroll listener with requestAnimationFrame
        this.setupScrollListener();
      },

      setupObserver: function () {
        const options = {
          rootMargin: '100px 0px 100px 0px' // Start effect slightly before element is visible
        };

        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const element = this.elements.find(el => el.section === entry.target);
            if (element) {
              element.isVisible = entry.isIntersecting;
            }
          });
        }, options);

        // Observe all sections
        this.elements.forEach(element => {
          this.observer.observe(element.section);
        });
      },

      setupScrollListener: function () {
        let ticking = false;

        const requestTick = () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              this.updatePositions();
              ticking = false;
            });
            ticking = true;
          }
        };

        // Use passive listener for better performance
        window.addEventListener('scroll', requestTick, { passive: true });
        window.addEventListener('resize', requestTick, { passive: true });
      },

      updatePositions: function () {
        // No transform calculations needed - CSS background-attachment: fixed handles the effect on all devices
        // This method kept for potential future enhancements
      },

      destroy: function () {
        if (this.observer) {
          this.observer.disconnect();
        }
        window.removeEventListener('scroll', this.updatePositions);
        window.removeEventListener('resize', this.updatePositions);
      }
    },

    // Scroll animations
    scrollAnimations: {
      elements: [],
      isAnimating: false,
      observer: null,

      init: function () {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return;
        }

        // Find all animatable elements
        const animatableElements = document.querySelectorAll('[data-animate]');
        if (!animatableElements.length) return;

        // Setup each animatable element
        animatableElements.forEach(element => {
          this.elements.push({
            element: element,
            animation: element.dataset.animate || 'fadeInUp',
            delay: parseInt(element.dataset.animateDelay) || 0,
            duration: parseInt(element.dataset.animateDuration) || 800,
            triggered: false
          });
        });

        if (this.elements.length === 0) return;

        // Setup IntersectionObserver
        this.setupObserver();
      },

      setupObserver: function () {
        const options = {
          rootMargin: '50px 0px -50px 0px', // Start animation slightly before element is visible
          threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const elementData = this.elements.find(el => el.element === entry.target);
            if (elementData && entry.isIntersecting && !elementData.triggered) {
              this.triggerAnimation(elementData);
              elementData.triggered = true;
            }
          });
        }, options);

        // Observe all elements
        this.elements.forEach(elementData => {
          // Add initial hidden state
          elementData.element.classList.add('animate-hidden');
          this.observer.observe(elementData.element);
        });
      },

      triggerAnimation: function (elementData) {
        const element = elementData.element;

        // Add animation classes
        setTimeout(() => {
          element.classList.remove('animate-hidden');
          element.classList.add('animate-visible', `animate-${elementData.animation}`);

          // Set custom duration if provided
          if (elementData.duration !== 800) {
            element.style.animationDuration = elementData.duration + 'ms';
          }
        }, elementData.delay);
      },

      destroy: function () {
        if (this.observer) {
          this.observer.disconnect();
        }
      }
    },

    // Initialize all modules
    init: function () {
      // Wait for DOM to be ready
      $(document).ready(() => {
        this.navigation.init();
        this.forms.init();
        this.performance.init();
        this.accessibility.init();
        this.services.init();
        this.partners.init();
        this.blogFilters.init();
        this.parallax.init();
        this.scrollAnimations.init();

        // Trigger custom event for other scripts
        $(document).trigger("stormapp:initialized");
      });

      // Handle window load
      $(window).on("load", () => {
        // Remove any loading classes
        $("body").removeClass("loading");

        // Trigger custom event
        $(document).trigger("stormapp:loaded");
      });
    },
  };

  // Initialize the application
  StormApp.init();

  // Expose StormApp globally for extensibility
  window.StormApp = StormApp;
})(window, document, jQuery);
