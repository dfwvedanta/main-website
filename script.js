// ================================
// Header & Footer Include Loader
// ================================

class IncludeLoader {
    constructor() {
        this.loadIncludes();
    }

    async loadIncludes() {
        await Promise.all([
            this.loadHeader(),
            this.loadFooter()
        ]);

        // Update current year in footer
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    async loadHeader() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (!headerPlaceholder) return;

        try {
            const response = await fetch('includes/header.html');
            if (!response.ok) throw new Error('Failed to load header');
            const html = await response.text();
            headerPlaceholder.innerHTML = html;
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    async loadFooter() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) return;

        try {
            const response = await fetch('includes/footer.html');
            if (!response.ok) throw new Error('Failed to load footer');
            const html = await response.text();
            footerPlaceholder.innerHTML = html;
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
}


// ================================
// Navigation
// ================================

class Navigation {
    constructor() {
        this.nav = document.querySelector('.main-nav');
        this.header = document.querySelector('.header');
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        this.mobileLinks = document.querySelectorAll('.mobile-link:not(.mobile-dropdown-toggle)');

        this.init();
    }

    init() {
        // Scroll behavior
        let lastScroll = 0;
        // Optimized with throttle to reduce execution frequency during scroll
        window.addEventListener('scroll', throttle(() => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                this.header?.classList.add('scrolled');
            } else {
                this.header?.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, 100));

        // Mobile burger menu toggle
        this.mobileToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.mobileToggle.classList.toggle('active');
            this.mobileMenu?.classList.toggle('active');
        });

        // Mobile dropdown toggles
        this.mobileDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = toggle.parentElement;
                dropdown.classList.toggle('active');
            });
        });

        // Close mobile menu when clicking a link
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu?.classList.remove('active');
                this.mobileToggle?.classList.remove('active');
                // Close all dropdowns
                document.querySelectorAll('.mobile-dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            });
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header') && !e.target.closest('.mobile-menu')) {
                this.mobileMenu?.classList.remove('active');
                this.mobileToggle?.classList.remove('active');
                // Close all dropdowns
                document.querySelectorAll('.mobile-dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Smooth scroll for anchor links
        const allLinks = document.querySelectorAll('.nav-link, .mobile-link, .mobile-sublink');
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offset = 80;
                        const targetPosition = target.offsetTop - offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ================================
// Scroll Animations
// ================================

class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Add fade-in class to elements that should animate
        const animateElements = document.querySelectorAll(`
            .guideline-card,
            .activity-card,
            .leader-card,
            .event-card,
            .resource-card,
            .intro-content,
            .section-title,
            .hero-stats .stat
        `);

        animateElements.forEach((el, index) => {
            el.classList.add('fade-in-on-scroll');
            this.elements.push(el);
        });

        // Create intersection observer
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        // Observe all elements
        this.elements.forEach(el => this.observer.observe(el));
    }
}


// ================================
// Form Handling
// ================================

class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        console.log('Form submitted:', data);

        // Show success message
        const button = this.form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Message Sent! ✓';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            this.form.reset();
        }, 3000);
    }
}


// ================================
// Loading Animation
// ================================

class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            // Add loaded class to body for any CSS transitions
            document.body.classList.add('loaded');

            // Stagger animation for hero elements
            const heroElements = document.querySelectorAll('.hero-content > *');
            heroElements.forEach((el, index) => {
                el.style.animation = `fade-in-up 1s ease-out ${index * 0.2}s backwards`;
            });
        });
    }
}

// ================================
// Dropdown Menu Handler
// ================================

class DropdownHandler {
    constructor() {
        this.dropdowns = document.querySelectorAll('.nav-dropdown');
        this.init();
    }

    init() {
        // For mobile: toggle dropdowns on click
        this.dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');

                    // Close other dropdowns
                    this.dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                this.dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
}


// ================================
// Initialize Everything
// ================================

// ================================
// Library Search
// ================================

class LibrarySearch {
    constructor() {
        this.searchInput = document.getElementById('library-search-input');
        this.clearBtn = document.getElementById('library-search-clear');
        this.resultsInfo = document.getElementById('library-search-results');

        if (!this.searchInput) return;

        this.allCards = [];
        this.allSections = [];

        this.init();
    }

    init() {
        // Collect all searchable cards and their parent sections
        this.allCards = Array.from(document.querySelectorAll('.resource-card, .support-card'));
        this.allSections = Array.from(document.querySelectorAll('.content-section'));

        // Add event listeners
        this.searchInput.addEventListener('input', () => this.handleSearch());
        this.clearBtn.addEventListener('click', () => this.clearSearch());

        // Click anywhere on search box to focus input
        const searchBox = document.querySelector('.library-search-box');
        if (searchBox) {
            searchBox.addEventListener('click', () => {
                this.searchInput.focus();
            });
        }

        // Handle Escape key
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });
    }

    handleSearch() {
        const query = this.searchInput.value.trim().toLowerCase();

        // Show/hide clear button
        if (query) {
            this.clearBtn.style.display = 'flex';
        } else {
            this.clearBtn.style.display = 'none';
            this.showAll();
            this.resultsInfo.style.display = 'none';
            return;
        }

        let visibleCount = 0;

        // Search through all cards
        this.allCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const link = card.querySelector('a')?.textContent.toLowerCase() || '';

            // Get section title
            const section = card.closest('.content-section');
            const sectionTitle = section?.querySelector('.section-title')?.textContent.toLowerCase() || '';

            // Check if query matches
            const matches = title.includes(query) ||
                          description.includes(query) ||
                          link.includes(query) ||
                          sectionTitle.includes(query);

            if (matches) {
                card.classList.remove('search-hidden');
                card.classList.add('search-highlight');
                visibleCount++;
            } else {
                card.classList.add('search-hidden');
                card.classList.remove('search-highlight');
            }
        });

        // Hide sections that have no visible cards
        this.allSections.forEach(section => {
            const visibleCards = section.querySelectorAll('.resource-card:not(.search-hidden), .support-card:not(.search-hidden)');
            if (visibleCards.length === 0 && section.querySelector('.resource-card, .support-card')) {
                section.style.display = 'none';
            } else {
                section.style.display = '';
            }
        });

        // Show results info
        this.showResultsInfo(visibleCount, query);
    }

    showResultsInfo(count, query) {
        this.resultsInfo.style.display = 'block';

        if (count === 0) {
            this.resultsInfo.className = 'search-results-info no-results';
            this.resultsInfo.textContent = `No results found for "${query}". Try different keywords.`;
        } else if (count === 1) {
            this.resultsInfo.className = 'search-results-info';
            this.resultsInfo.textContent = `Found 1 result for "${query}"`;
        } else {
            this.resultsInfo.className = 'search-results-info';
            this.resultsInfo.textContent = `Found ${count} results for "${query}"`;
        }
    }

    showAll() {
        // Show all cards and sections
        this.allCards.forEach(card => {
            card.classList.remove('search-hidden');
            card.classList.remove('search-highlight');
        });

        this.allSections.forEach(section => {
            section.style.display = '';
        });
    }

    clearSearch() {
        this.searchInput.value = '';
        this.clearBtn.style.display = 'none';
        this.resultsInfo.style.display = 'none';
        this.showAll();
        this.searchInput.focus();
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Load header and footer first
    const includeLoader = new IncludeLoader();
    await includeLoader.loadIncludes();

    // Initialize all components after header/footer are loaded
    new Navigation();
    new ScrollAnimations();
    new FormHandler();
    new LoadingAnimation();
    new DropdownHandler();
    new LibrarySearch();
});

// ================================
// Performance Optimization
// ================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ================================
// Newsletter Archive Accordion
// ================================

class NewsletterArchive {
    constructor() {
        this.init();
    }

    init() {
        const yearCards = document.querySelectorAll('.newsletter-year-card');
        
        yearCards.forEach((card, index) => {
            const header = card.querySelector('.newsletter-year-header');
            const expandIcon = card.querySelector('.expand-icon');
            
            // Skip if it's the "earlier years" card
            if (!expandIcon) return;
            
            // Open first card by default
            if (index === 0) {
                card.classList.add('active');
            }
            
            header.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                
                // Close all cards
                yearCards.forEach(c => c.classList.remove('active'));
                
                // Toggle clicked card
                if (!isActive) {
                    card.classList.add('active');
                }
            });
        });
    }
}

// Initialize newsletter archive when DOM is ready
if (document.querySelector('.newsletter-archive')) {
    document.addEventListener('DOMContentLoaded', () => {
        new NewsletterArchive();
    });
}

// ================================
// Newsletter Search, Filter & Sort
// ================================

class NewsletterFilter {
    constructor() {
        this.searchInput = document.getElementById('newsletter-search');
        this.yearFilter = document.getElementById('year-filter');
        this.sortSelect = document.getElementById('sort-select');
        this.yearCards = Array.from(document.querySelectorAll('.newsletter-year-card'));
        
        if (!this.searchInput || !this.yearFilter || !this.sortSelect) return;
        
        this.init();
    }

    init() {
        // Search functionality
        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            this.filterNewsletters(searchTerm);
        });

        // Year filter
        this.yearFilter.addEventListener('change', (e) => {
            const selectedYear = e.target.value;
            this.filterByYear(selectedYear);
        });

        // Sort functionality
        this.sortSelect.addEventListener('change', (e) => {
            const sortOrder = e.target.value;
            this.sortYears(sortOrder);
        });
    }

    filterNewsletters(searchTerm) {
        let visibleCount = 0;

        this.yearCards.forEach(card => {
            const yearTitle = card.querySelector('.year-title')?.textContent.toLowerCase() || '';
            const newsletterItems = card.querySelectorAll('.newsletter-item');
            let cardHasVisible = false;

            newsletterItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const isVisible = text.includes(searchTerm);
                
                if (isVisible) {
                    item.classList.remove('hidden');
                    cardHasVisible = true;
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Show/hide year card based on whether it has visible items
            if (cardHasVisible || yearTitle.includes(searchTerm)) {
                card.classList.remove('hidden');
                if (searchTerm && cardHasVisible) {
                    card.classList.add('active'); // Auto-expand if search matches
                }
            } else {
                card.classList.remove('hidden');
                card.classList.remove('active');
            }
        });

        this.showNoResults(visibleCount === 0 && searchTerm !== '');
    }

    filterByYear(year) {
        this.yearCards.forEach(card => {
            const yearTitle = card.querySelector('.year-title')?.textContent || '';
            
            if (year === 'all' || yearTitle === year) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
                card.classList.remove('active');
            }
        });
    }

    sortYears(order) {
        const archive = document.querySelector('.newsletter-archive');
        if (!archive) return;

        const sortedCards = this.yearCards.sort((a, b) => {
            const yearA = parseInt(a.querySelector('.year-title')?.textContent || '0');
            const yearB = parseInt(b.querySelector('.year-title')?.textContent || '0');
            
            return order === 'newest' ? yearB - yearA : yearA - yearB;
        });

        // Re-append cards in sorted order
        sortedCards.forEach(card => archive.appendChild(card));
    }

    showNoResults(show) {
        let noResultsMsg = document.querySelector('.no-results');
        
        if (show && !noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <p>No newsletters found matching your search.</p>
            `;
            document.querySelector('.newsletter-archive').appendChild(noResultsMsg);
        } else if (!show && noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

// Initialize newsletter filter when DOM is ready
if (document.querySelector('.newsletter-controls')) {
    document.addEventListener('DOMContentLoaded', () => {
        new NewsletterFilter();
    });
}
/**
 * CMS Data Loader
 * Loads content from CMS JSON files and renders to frontend
 */

class CMSLoader {
    constructor() {
        this.baseURL = '/api';
        this.cache = {};
    }

    /**
     * Fetch JSON data
     */
    async fetchJSON(endpoint) {
        if (this.cache[endpoint]) {
            return this.cache[endpoint];
        }

        try {
            const response = await fetch(`${this.baseURL}/${endpoint}.json`);
            if (!response.ok) throw new Error(`Failed to load ${endpoint}`);
            const data = await response.json();
            this.cache[endpoint] = data;
            return data;
        } catch (error) {
            console.error(`Error loading ${endpoint}:`, error);
            return null;
        }
    }

    /**
     * Load all CMS data
     */
    async loadAll() {
        const [pages, events, newsletters, settings] = await Promise.all([
            this.fetchJSON('pages'),
            this.fetchJSON('events'),
            this.fetchJSON('newsletters'),
            this.fetchJSON('settings')
        ]);

        return { pages, events, newsletters, settings };
    }

    /**
     * Get page by slug
     */
    async getPage(slug) {
        const pageIndex = await this.fetchJSON('page-index');
        return pageIndex ? pageIndex[slug] : null;
    }

    /**
     * Get all events
     */
    async getEvents() {
        return await this.fetchJSON('events');
    }

    /**
     * Get all newsletters
     */
    async getNewsletters() {
        return await this.fetchJSON('newsletters');
    }

    /**
     * Get settings
     */
    async getSettings() {
        return await this.fetchJSON('settings');
    }

    /**
     * Render markdown to HTML (simple version)
     */
    renderMarkdown(markdown) {
        if (!markdown) return '';

        let html = markdown;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold and italic
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // Lists
        html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        html = html.replace(/^- (.+)$/gim, '<li>$1</li>');

        // Paragraphs
        html = html.split('\n\n').map(para => {
            para = para.trim();
            if (para && !para.startsWith('<')) {
                return `<p>${para}</p>`;
            }
            return para;
        }).join('\n');

        return html;
    }

    /**
     * Load and render current page content
     */
    async renderCurrentPage() {
        // Get current page slug from URL
        const path = window.location.pathname;
        const slug = path.replace(/\.html$/, '').replace(/^\//, '') || 'index';

        const page = await this.getPage(slug);

        if (page) {
            // Update page title
            if (page.title) {
                document.title = `${page.title} - Ramakrishna Vedanta Society of North Texas`;
            }

            // Update hero section if exists
            const heroTitle = document.querySelector('.page-hero-title');
            const heroSubtitle = document.querySelector('.page-hero-subtitle');

            if (heroTitle && page.heroTitle) {
                heroTitle.textContent = page.heroTitle;
            }
            if (heroSubtitle && page.heroSubtitle) {
                heroSubtitle.textContent = page.heroSubtitle;
            }

            // Update main content
            const mainContent = document.querySelector('.content-section .content-text');
            if (mainContent && page.body) {
                mainContent.innerHTML = this.renderMarkdown(page.body);
            }

            console.log('Page loaded from CMS:', page.title);
        }
    }

    /**
     * Update header navigation from CMS
     */
    async updateNavigation() {
        const settings = await this.getSettings();
        if (!settings || !settings.navigation) return;

        const { menuItems } = settings.navigation;

        // Update desktop nav
        const desktopNav = document.querySelector('.nav');
        if (desktopNav && menuItems) {
            // Clear existing (except logo)
            // Then rebuild from CMS data
            // (Simplified for now - full implementation would rebuild menu)
            console.log('Navigation loaded from CMS');
        }
    }

    /**
     * Update footer from CMS
     */
    async updateFooter() {
        const settings = await this.getSettings();
        if (!settings || !settings.footer) return;

        const { footerColumns, copyright, social } = settings.footer;

        // Update copyright
        const copyrightEl = document.querySelector('.footer-bottom p');
        if (copyrightEl && copyright) {
            const year = new Date().getFullYear();
            copyrightEl.textContent = `© ${year} ${copyright}`;
        }

        console.log('Footer loaded from CMS');
    }
}

// Create global CMS loader instance
window.cmsLoader = new CMSLoader();

// DISABLED: Auto-loading to preserve existing website exactly as-is
// To enable CMS for a page, add data-cms-enabled="true" to <body>
// Or manually call: window.cmsLoader.renderCurrentPage()

// Auto-initialize only if page explicitly opts in
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        const body = document.body;
        // Only load CMS if page explicitly enables it
        if (body && body.dataset.cmsEnabled === 'true' && !window.location.pathname.includes('/admin')) {
            await window.cmsLoader.renderCurrentPage();
            await window.cmsLoader.updateNavigation();
            await window.cmsLoader.updateFooter();
        }
    });
} else {
    // DOM already loaded
    const body = document.body;
    if (body && body.dataset.cmsEnabled === 'true' && !window.location.pathname.includes('/admin')) {
        window.cmsLoader.renderCurrentPage();
        window.cmsLoader.updateNavigation();
        window.cmsLoader.updateFooter();
    }
}


// ================================
// Holy Trio Modal Functionality
// ================================

function initHolyTrioModals() {
    const holyTrioCards = document.querySelectorAll('.holy-trio-card');
    
    holyTrioCards.forEach(card => {
        card.addEventListener('click', () => {
            const figure = card.getAttribute('data-figure');
            const modal = document.getElementById(`${figure}-modal`);
            
            if (modal) {
                modal.classList.add('modal-open');
                document.body.style.overflow = 'hidden';
                
                // Animate teaching cards in sequence
                setTimeout(() => {
                    const cards = modal.querySelectorAll('.teaching-card');
                    cards.forEach((teachingCard, index) => {
                        setTimeout(() => {
                            teachingCard.style.opacity = '1';
                            teachingCard.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }, 300);
            }
        });
    });
    
    // Setup close handlers for all holy trio modals
    ['vivekananda', 'ramakrishna', 'sarada-devi'].forEach(figure => {
        const modal = document.getElementById(`${figure}-modal`);
        if (!modal) return;
        
        const modalClose = modal.querySelector('.modal-close');
        const modalOverlay = modal.querySelector('.modal-overlay');
        
        const closeModal = () => {
            modal.classList.remove('modal-open');
            document.body.style.overflow = '';
            
            const cards = modal.querySelectorAll('.teaching-card');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
        };
        
        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('modal-open')) {
                closeModal();
            }
        });
    });
}

// Initialize Holy Trio modals when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initHolyTrioModals, 200);
    });
} else {
    setTimeout(initHolyTrioModals, 200);
}

