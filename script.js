// ================================
// WebGL Particle System
// ================================

class CosmicParticles {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }

        this.particleCount = 800;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.time = 0;

        this.init();
        this.resize();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    init() {
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * 2 - 1,
                y: Math.random() * 2 - 1,
                z: Math.random(),
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.0002,
                speedY: (Math.random() - 0.5) * 0.0002,
                alpha: Math.random() * 0.5 + 0.3,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }

        // Set up WebGL
        this.gl.clearColor(0.02, 0.03, 0.1, 1.0);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    onMouseMove(e) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    update() {
        this.time += 0.01;

        this.particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 0.3) {
                particle.x -= dx * 0.001;
                particle.y -= dy * 0.001;
            }

            // Wrap around screen
            if (particle.x > 1) particle.x = -1;
            if (particle.x < -1) particle.x = 1;
            if (particle.y > 1) particle.y = -1;
            if (particle.y < -1) particle.y = 1;

            // Twinkle effect
            particle.alpha = 0.3 + Math.sin(this.time * particle.twinkleSpeed) * 0.3;
        });
    }

    draw() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.particles.forEach(particle => {
            // Calculate color based on depth
            const golden = particle.z > 0.7;
            const r = golden ? 0.83 : 0.9 + particle.z * 0.1;
            const g = golden ? 0.69 : 0.9 + particle.z * 0.1;
            const b = golden ? 0.22 : 1.0;

            this.drawParticle(
                particle.x,
                particle.y,
                particle.size,
                r, g, b,
                particle.alpha
            );
        });
    }

    drawParticle(x, y, size, r, g, b, alpha) {
        const pixelSize = (size / this.canvas.width) * 2;

        // Draw point
        this.gl.begin(this.gl.POINTS);
        this.gl.pointSize(size);

        // Simple particle rendering using canvas 2D fallback
        const ctx = this.canvas.getContext('2d', { willReadFrequently: false });
        if (ctx) {
            const screenX = (x + 1) * this.canvas.width / 2;
            const screenY = (-y + 1) * this.canvas.height / 2;

            ctx.fillStyle = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect
            const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 2);
            gradient.addColorStop(0, `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${alpha * 0.5})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(screenX, screenY, size * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ================================
// Canvas-based Particle System (Fallback)
// ================================

class CanvasParticles {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particleCount = 400;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.time = 0;
        this.connections = [];

        this.init();
        this.resize();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random(),
                size: Math.random() * 2.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.5 + 0.3,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    onMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    update() {
        this.time += 0.01;

        this.particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Mouse interaction - gentle repulsion
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.x -= (dx / distance) * force * 2;
                particle.y -= (dy / distance) * force * 2;
            }

            // Wrap around screen
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;

            // Twinkle effect
            particle.alpha = 0.3 + Math.sin(this.time * particle.twinkleSpeed + particle.twinkleOffset) * 0.4;
        });

        // Find connections between nearby particles
        this.connections = [];
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.connections.push({
                        from: this.particles[i],
                        to: this.particles[j],
                        alpha: (1 - distance / 100) * 0.15
                    });
                }
            }
        }
    }

    draw() {
        // Clear with fade effect for motion blur
        this.ctx.fillStyle = 'rgba(5, 8, 22, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        this.connections.forEach(conn => {
            this.ctx.strokeStyle = `rgba(212, 175, 55, ${conn.alpha})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.stroke();
        });

        // Draw particles
        this.particles.forEach(particle => {
            // Determine color based on depth
            const golden = particle.z > 0.75;
            const r = golden ? 212 : 230 + particle.z * 25;
            const g = golden ? 175 : 230 + particle.z * 25;
            const b = golden ? 55 : 255;

            // Draw glow
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 4
            );
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${particle.alpha * 0.8})`);
            gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${particle.alpha * 0.3})`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw core
            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ================================
// Navigation
// ================================

class Navigation {
    constructor() {
        this.nav = document.querySelector('.main-nav');
        this.navToggle = document.querySelector('.nav-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

        this.init();
    }

    init() {
        // Scroll behavior
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        this.navToggle?.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.remove('active');
                this.navToggle?.classList.remove('active');
            });
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu')) {
                this.mobileMenu.classList.remove('active');
                this.navToggle?.classList.remove('active');
            }
        });

        // Smooth scroll for anchor links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
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
// Parallax Effects
// ================================

class ParallaxEffects {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            // Parallax for hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - scrolled / 600;
            }

            // Parallax for mandala
            const mandala = document.querySelector('.mandala');
            if (mandala) {
                const mandalaSect = mandala.closest('section');
                if (mandalaSect) {
                    const rect = mandalaSect.getBoundingClientRect();
                    const inView = rect.top < window.innerHeight && rect.bottom > 0;
                    if (inView) {
                        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                        mandala.style.transform = `rotate(${progress * 360}deg) scale(${0.8 + progress * 0.2})`;
                    }
                }
            }

            // Parallax for sacred geometry
            const geometry = document.querySelector('.sacred-geometry');
            if (geometry) {
                geometry.style.transform = `rotate(${scrolled * 0.05}deg)`;
            }
        });
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
// Meditation Session Button
// ================================

class MeditationSession {
    constructor() {
        this.button = document.querySelector('.session-btn');
        this.isPlaying = false;
        this.init();
    }

    init() {
        if (!this.button) return;

        this.button.addEventListener('click', () => {
            this.toggleSession();
        });
    }

    toggleSession() {
        this.isPlaying = !this.isPlaying;
        const icon = this.button.querySelector('.btn-icon');

        if (this.isPlaying) {
            icon.textContent = '⏸';
            this.button.querySelector('span:not(.btn-icon)').textContent = 'Pause Practice';
            // Here you could integrate actual audio playback
            console.log('Starting meditation session...');
        } else {
            icon.textContent = '▶';
            this.button.querySelector('span:not(.btn-icon)').textContent = 'Start Practice';
            console.log('Pausing meditation session...');
        }
    }
}

// ================================
// Cursor Effect (Optional Enhancement)
// ================================

class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.init();
    }

    init() {
        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--color-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            mix-blend-mode: difference;
            transition: transform 0.15s ease;
        `;

        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'custom-cursor-follower';
        this.cursorFollower.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            border: 1px solid var(--color-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.5;
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);

        // Track mouse position
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            this.cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        });

        // Smooth follower animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            this.cursorFollower.style.transform = `translate(${followerX - 15}px, ${followerY - 15}px)`;

            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform += ' scale(1.5)';
                this.cursorFollower.style.transform += ' scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = this.cursor.style.transform.replace(' scale(1.5)', '');
                this.cursorFollower.style.transform = this.cursorFollower.style.transform.replace(' scale(1.5)', '');
            });
        });
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

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new ParallaxEffects();
    new FormHandler();
    new MeditationSession();
    new LoadingAnimation();
    new DropdownHandler();

    // Optional: Custom cursor (uncomment to enable)
    // new CustomCursor();

    // Add dynamic copyright year
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        copyrightYear.textContent = `© ${new Date().getFullYear()} Ramakrishna Vedanta Society of North Texas. All rights reserved.`;
    }
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
