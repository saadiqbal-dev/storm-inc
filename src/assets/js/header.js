/**
 * Header Controller - Manages dropdown menus and scroll effects
 * Works independently on all pages without carousel dependency
 */

(function (window, document) {
  "use strict";

  class HeaderController {
    constructor() {
      // Configuration
      this.config = {
        scrollThreshold: 50, // Pixels before triggering scroll effect
        debounceDelay: 10, // Milliseconds for scroll debounce
      };

      // State
      this.isScrolled = false;
      this.activeDropdown = null;
      this.activeMenuItem = null;

      // Cache DOM elements
      this.header = document.querySelector('.header');
      this.dropdownLinks = document.querySelectorAll('[data-dropdown]');
      this.dropdowns = document.querySelectorAll('.header__dropdown');
      
      // Initialize if header exists
      if (this.header) {
        this.init();
      }
    }

    init() {
      this.setupDropdowns();
      this.setupScrollEffect();
      this.checkInitialScroll();
      this.setupDropdownColumns();
    }

    /**
     * Setup dropdown menu functionality
     */
    setupDropdowns() {
      // Click handlers for dropdown toggles
      this.dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const dropdownId = link.getAttribute('data-dropdown');
          const menuItem = link.closest('.header__menu-item');
          this.toggleDropdown(dropdownId, menuItem);
        });
      });

      // Close dropdowns on outside click
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.header__menu-item') && 
            !e.target.closest('.header__dropdown')) {
          this.closeAllDropdowns();
        }
      });

      // Close dropdowns on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.activeDropdown) {
          this.closeAllDropdowns();
        }
      });

      // Prevent dropdown from closing when clicking inside it
      this.dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      });
    }

    /**
     * Setup scroll effect for header background change
     */
    setupScrollEffect() {
      let ticking = false;
      
      // Throttled scroll handler for better performance
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.updateHeaderOnScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Update header appearance based on scroll position
     */
    updateHeaderOnScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      
      if (scrollY > this.config.scrollThreshold && !this.isScrolled) {
        // Add scrolled class when scrolling down
        this.header.classList.add('header--scrolled');
        this.isScrolled = true;
      } else if (scrollY <= this.config.scrollThreshold && this.isScrolled) {
        // Remove scrolled class when back at top
        this.header.classList.remove('header--scrolled');
        this.isScrolled = false;
      }
    }

    /**
     * Check scroll position on initial page load
     */
    checkInitialScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      
      if (scrollY > this.config.scrollThreshold) {
        this.header.classList.add('header--scrolled');
        this.isScrolled = true;
      }
    }

    /**
     * Setup dropdown columns based on number of links
     * If more than 3 links, use 2 columns. Otherwise, use 1 column.
     */
    setupDropdownColumns() {
      const linkLists = document.querySelectorAll('.dropdown-capabilities__links-list');

      linkLists.forEach(list => {
        const links = list.querySelectorAll('.dropdown-capabilities__link');

        if (links.length > 3) {
          list.classList.add('dropdown-capabilities__links-list--two-columns');
        } else {
          list.classList.remove('dropdown-capabilities__links-list--two-columns');
        }
      });
    }

    /**
     * Toggle dropdown open/closed
     */
    toggleDropdown(dropdownId, menuItem) {
      const dropdown = document.getElementById(dropdownId);
      
      if (!dropdown) return;
      
      if (this.activeDropdown === dropdown && this.activeMenuItem === menuItem) {
        // Close if clicking the same dropdown
        this.closeAllDropdowns();
      } else {
        // Close any open dropdown and open the new one
        this.closeAllDropdowns();
        this.openDropdown(dropdown, menuItem);
      }
    }

    /**
     * Open a specific dropdown
     */
    openDropdown(dropdown, menuItem) {
      if (dropdown && menuItem) {
        // Add active classes
        dropdown.classList.add('active');
        menuItem.classList.add('active');
        
        // Update active references
        this.activeDropdown = dropdown;
        this.activeMenuItem = menuItem;
        
        // Set ARIA attributes for accessibility
        const link = menuItem.querySelector('[data-dropdown]');
        if (link) {
          link.setAttribute('aria-expanded', 'true');
        }
      }
    }

    /**
     * Close all dropdowns
     */
    closeAllDropdowns() {
      // Remove active classes from all dropdowns
      this.dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
      
      // Remove active classes from all menu items
      document.querySelectorAll('.header__menu-item').forEach(item => {
        item.classList.remove('active');
        
        // Update ARIA attributes
        const link = item.querySelector('[data-dropdown]');
        if (link) {
          link.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Clear active references
      this.activeDropdown = null;
      this.activeMenuItem = null;
    }

    /**
     * Destroy the header controller (cleanup)
     */
    destroy() {
      // Remove all event listeners
      this.dropdownLinks.forEach(link => {
        link.replaceWith(link.cloneNode(true));
      });
      
      // Reset header state
      if (this.header) {
        this.header.classList.remove('header--scrolled');
      }
      
      this.closeAllDropdowns();
    }
  }

  /**
   * Footer Reveal Effect - Creates spacer for reveal animation
   * Calculates footer height and sets spacer to match
   */
  class FooterReveal {
    constructor() {
      this.footer = document.querySelector('.footer');
      this.spacer = document.getElementById('footer-spacer');
      
      if (this.footer && this.spacer) {
        this.init();
      }
    }

    init() {
      // Set initial height
      this.setSpacerHeight();
      
      // Update on window resize with debounce
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.setSpacerHeight();
        }, 250);
      });
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

  // Initialize when DOM is ready
  const initializeHeader = () => {
    // Create global instance for potential external access
    window.headerController = new HeaderController();
    // Initialize footer reveal effect
    window.footerReveal = new FooterReveal();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHeader);
  } else {
    // DOM is already loaded
    initializeHeader();
  }

})(window, document);