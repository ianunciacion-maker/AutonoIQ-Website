// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initProgressBars();
    initContactForm();
    initLoadingScreen();
    
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scrolling and scroll effects
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .testimonial-card, .feature, .section-header').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Initialize animations
function initAnimations() {
    // Stagger animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Floating animation for demo cards
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach((card, index) => {
        card.style.animationDelay = `${index}s`;
    });
    
    // Add hover effects for interactive elements
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Progress bars animation
function initProgressBars() {
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 500);
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const dashboardCard = document.querySelector('.dashboard-card');
    if (dashboardCard) {
        progressObserver.observe(dashboardCard);
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                showNotification('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Re-initialize icons
                lucide.createIcons();
            }, 2000);
        });
        
        // Form validation
        const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidation);
        });
    }
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('invalid', 'valid');
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('invalid');
            return;
        }
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        field.classList.add('invalid');
        return;
    }
    
    // Field is valid
    if (value) {
        field.classList.add('valid');
    }
}

// Clear validation styles
function clearValidation(e) {
    e.target.classList.remove('invalid', 'valid');
}

// Loading screen
function initLoadingScreen() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Utility functions

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Schedule consultation function
function scheduleConsultation() {
    // Show consultation modal or redirect to booking page
    showConsultationModal();
}

// Show consultation modal
function showConsultationModal() {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'consultation-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeConsultationModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Schedule Your Free Consultation</h3>
                <button class="modal-close" onclick="closeConsultationModal()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="consultation-benefits">
                    <div class="benefit-item">
                        <i data-lucide="check-circle"></i>
                        <span>30-minute consultation with AI automation expert</span>
                    </div>
                    <div class="benefit-item">
                        <i data-lucide="check-circle"></i>
                        <span>Custom automation roadmap for your business</span>
                    </div>
                    <div class="benefit-item">
                        <i data-lucide="check-circle"></i>
                        <span>ROI projections and timeline estimates</span>
                    </div>
                    <div class="benefit-item">
                        <i data-lucide="check-circle"></i>
                        <span>No obligation - completely free</span>
                    </div>
                </div>
                <form id="consultationForm" class="consultation-form">
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" name="firstName" placeholder="First Name" required>
                        </div>
                        <div class="form-group">
                            <input type="text" name="lastName" placeholder="Last Name" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number" required>
                    </div>
                    <div class="form-group">
                        <input type="text" name="company" placeholder="Company Name" required>
                    </div>
                    <div class="form-group">
                        <select name="businessSize" required>
                            <option value="">Business Size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="200+">200+ employees</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="priority" required>
                            <option value="">Primary Interest</option>
                            <option value="customer-service">Customer Service Automation</option>
                            <option value="process">Process Automation</option>
                            <option value="analytics">Data Analytics</option>
                            <option value="marketing">Marketing Automation</option>
                            <option value="security">Security Automation</option>
                            <option value="hr">HR & Recruitment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea name="goals" placeholder="What are your main goals for automation? (optional)" rows="3"></textarea>
                    </div>
                    <button type="submit" class="cta-btn primary large">
                        <i data-lucide="calendar"></i>
                        Schedule My Free Consultation
                    </button>
                </form>
            </div>
        </div>
    `;
    
    // Add modal styles
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .consultation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                animation: modalFadeIn 0.3s ease-out;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background: white;
                border-radius: 16px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                animation: modalSlideIn 0.3s ease-out;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #1a202c;
            }
            
            .modal-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            
            .modal-close:hover {
                background-color: #f7fafc;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .consultation-benefits {
                margin-bottom: 2rem;
                padding: 1.5rem;
                background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
                border-radius: 12px;
            }
            
            .benefit-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 0.75rem;
                color: #4a5568;
            }
            
            .benefit-item:last-child {
                margin-bottom: 0;
            }
            
            .benefit-item i {
                color: #667eea;
                flex-shrink: 0;
            }
            
            .consultation-form .form-group {
                margin-bottom: 1.5rem;
            }
            
            .consultation-form .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @media (max-width: 768px) {
                .consultation-form .form-row {
                    grid-template-columns: 1fr;
                }
                
                .modal-header,
                .modal-body {
                    padding: 1.5rem;
                }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Initialize icons in modal
    lucide.createIcons();
    
    // Handle form submission
    const consultationForm = document.getElementById('consultationForm');
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleConsultationBooking(this);
    });
}

// Close consultation modal
function closeConsultationModal() {
    const modal = document.querySelector('.consultation-modal');
    if (modal) {
        modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Handle consultation booking
function handleConsultationBooking(form) {
    const formData = new FormData(form);
    const bookingData = {};
    formData.forEach((value, key) => {
        bookingData[key] = value;
    });
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Booking Consultation...';
    submitBtn.disabled = true;
    
    // Simulate booking process (replace with actual API call)
    setTimeout(() => {
        // Close modal
        closeConsultationModal();
        
        // Show success notification
        showNotification(
            'Consultation booked successfully! Check your email for confirmation and next steps.',
            'success'
        );
        
        // In a real implementation, you would:
        // 1. Send data to your booking API
        // 2. Integrate with calendar system (Google Calendar, Calendly, etc.)
        // 3. Send confirmation emails
        // 4. Store lead information in CRM
        
        console.log('Consultation booking data:', bookingData);
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i data-lucide="x"></i>
            </button>
        </div>
    `;
    
    // Add notification styles if not exist
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 2rem;
                max-width: 400px;
                z-index: 10001;
                animation: notificationSlideIn 0.3s ease-out;
            }
            
            .notification-content {
                background: white;
                border-radius: 12px;
                padding: 1rem 1.5rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                border-left: 4px solid #667eea;
            }
            
            .notification-success .notification-content {
                border-left-color: #10b981;
            }
            
            .notification-success i:first-child {
                color: #10b981;
            }
            
            .notification i:first-child {
                color: #667eea;
                flex-shrink: 0;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                margin-left: auto;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            
            .notification-close:hover {
                background-color: #f7fafc;
            }
            
            @keyframes notificationSlideIn {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    right: 1rem;
                    left: 1rem;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Initialize icons
    lucide.createIcons();
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'notificationSlideIn 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Testimonials slider (if needed)
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 3) {
        // Implementation for testimonial slider would go here
        // For now, we're showing all testimonials in a grid
    }
}

// Add form validation styles
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .form-group input.invalid,
    .form-group select.invalid,
    .form-group textarea.invalid {
        border-color: #e53e3e;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
    
    .form-group input.valid,
    .form-group select.valid,
    .form-group textarea.valid {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
`;
document.head.appendChild(validationStyles);

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call performance optimization
optimizePerformance();

// Add CSS for better UX
const uxStyles = document.createElement('style');
uxStyles.textContent = `
    /* Smooth transitions for better UX */
    * {
        transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }
    
    /* Focus styles for accessibility */
    .cta-btn:focus,
    input:focus,
    select:focus,
    textarea:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
    
    /* Loading state for buttons */
    .cta-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    /* Hover effects for cards */
    .service-card,
    .testimonial-card {
        cursor: default;
    }
`;
document.head.appendChild(uxStyles);