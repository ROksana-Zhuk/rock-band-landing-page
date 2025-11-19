/**
 * Rock Band Landing Page - Main JavaScript
 */

// DOM Elements Cache
const elements = {
    ticketPopup: {
        overlay: document.getElementById("popup-overlay"),
        closeBtn: document.getElementById("popup-close"),
        form: document.getElementById("ticket-form")
    },
    contactPopup: {
        overlay: document.getElementById("contact-popup-overlay"),
        closeBtn: document.getElementById("contact-popup-close")
    },
    contactForm: {
        form: document.getElementById("contact-form")
    },
    navigation: {
        toggle: document.getElementById('nav-toggle'),
        list: document.getElementById('nav-list')
    },
    triggers: {
        ticketButtons: document.querySelectorAll(".ticket-btn"),
        heroButton: document.querySelector(".hero .btn-primary")
    }
};

// Ticket Popup Module
const TicketPopup = {
    validateForm(form) {
        const name = form.querySelector('#ticket-name');
        let isValid = true;

        // Validate name (minimum 3 characters) - only if field has content
        if (name.value.trim().length > 0 && name.value.trim().length < 3) {
            ContactForm.showError(name, 'Ім\'я повинно містити щонайменше 3 символи');
            isValid = false;
        } else {
            ContactForm.clearError(name);
        }

        return isValid;
    },

    validateOnSubmit(form) {
        const name = form.querySelector('#ticket-name');
        let isValid = true;

        // Validate name (minimum 3 characters) - required on submit
        if (name.value.trim().length < 3) {
            ContactForm.showError(name, 'Ім\'я повинно містити щонайменше 3 символи');
            isValid = false;
        } else {
            ContactForm.clearError(name);
        }

        return isValid;
    },

    open() {
        if (elements.ticketPopup.overlay) {
            elements.ticketPopup.overlay.style.display = "flex";
        }
    },

    close() {
        if (elements.ticketPopup.overlay) {
            elements.ticketPopup.overlay.style.display = "none";
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        const form = elements.ticketPopup.form;
        
        if (TicketPopup.validateOnSubmit(form)) {
            alert("Ваш квиток заброньовано! 🎟️");
            form.reset();
            // Clear any remaining errors after successful submission
            form.querySelectorAll('input').forEach(field => {
                ContactForm.clearError(field);
            });
            TicketPopup.close();
        }
    },

    handleBackgroundClick(e) {
        if (e.target === elements.ticketPopup.overlay) {
            TicketPopup.close();
        }
    },

    init() {
        if (elements.triggers.ticketButtons) {
            elements.triggers.ticketButtons.forEach(btn => 
                btn.addEventListener("click", TicketPopup.open)
            );
        }
        if (elements.triggers.heroButton) {
            elements.triggers.heroButton.addEventListener("click", TicketPopup.open);
        }
        if (elements.ticketPopup.closeBtn) {
            elements.ticketPopup.closeBtn.addEventListener("click", TicketPopup.close);
        }
        if (elements.ticketPopup.overlay) {
            elements.ticketPopup.overlay.addEventListener("click", TicketPopup.handleBackgroundClick);
        }
        if (elements.ticketPopup.form) {
            elements.ticketPopup.form.addEventListener("submit", TicketPopup.handleSubmit);
            
            // Add real-time validation on blur for ticket name
            const nameField = elements.ticketPopup.form.querySelector('#ticket-name');
            if (nameField) {
                nameField.addEventListener('blur', () => {
                    if (nameField.value.trim().length > 0) {
                        TicketPopup.validateForm(elements.ticketPopup.form);
                    } else {
                        ContactForm.clearError(nameField);
                    }
                });
            }
        }
    }
};

// Contact Popup Module
const ContactPopup = {
    open() {
        if (elements.contactPopup.overlay) {
            elements.contactPopup.overlay.style.display = "flex";
            elements.contactPopup.overlay.setAttribute("aria-hidden", "false");
        }
    },

    close() {
        if (elements.contactPopup.overlay) {
            elements.contactPopup.overlay.style.display = "none";
            elements.contactPopup.overlay.setAttribute("aria-hidden", "true");
        }
    },

    handleBackgroundClick(e) {
        if (e.target === elements.contactPopup.overlay) {
            ContactPopup.close();
        }
    },

    init() {
        if (elements.contactPopup.closeBtn) {
            elements.contactPopup.closeBtn.addEventListener("click", ContactPopup.close);
        }
        if (elements.contactPopup.overlay) {
            elements.contactPopup.overlay.addEventListener("click", ContactPopup.handleBackgroundClick);
        }
    }
};
// Contact Form Module
const ContactForm = {
    validateForm(form) {
        const name = form.querySelector('#contact-name');
        const message = form.querySelector('#contact-message');
        let isValid = true;

        // Validate name (minimum 3 characters)
        if (name.value.trim().length > 0 && name.value.trim().length < 3) {
            this.showError(name, 'Ім\'я повинно містити щонайменше 3 символи');
            isValid = false;
        } else {
            this.clearError(name);
        }

        // Validate message (minimum 10 characters)
        if (message.value.trim().length > 0 && message.value.trim().length < 10) {
            this.showError(message, 'Повідомлення повинно містити щонайменше 10 символів');
            isValid = false;
        } else {
            this.clearError(message);
        }

        return isValid;
    },

    validateOnSubmit(form) {
        const name = form.querySelector('#contact-name');
        const message = form.querySelector('#contact-message');
        let isValid = true;

        // Validate name (minimum 3 characters) - required on submit
        if (name.value.trim().length < 3) {
            this.showError(name, 'Ім\'я повинно містити щонайменше 3 символи');
            isValid = false;
        } else {
            this.clearError(name);
        }

        // Validate message (minimum 10 characters) - required on submit
        if (message.value.trim().length < 10) {
            this.showError(message, 'Повідомлення повинно містити щонайменше 10 символів');
            isValid = false;
        } else {
            this.clearError(message);
        }

        return isValid;
    },

    showError(field, message) {
        this.clearError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    },

    clearError(field) {
        const existingError = field.parentNode.querySelector('.validation-error');
        if (existingError) {
            existingError.remove();
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        const form = elements.contactForm.form;
        
        if (ContactForm.validateOnSubmit(form)) {
            ContactPopup.open();
            form.reset();
            // Clear any remaining errors after successful submission
            form.querySelectorAll('input, textarea').forEach(field => {
                ContactForm.clearError(field);
            });
        }
    },

    init() {
        if (elements.contactForm.form) {
            elements.contactForm.form.addEventListener("submit", ContactForm.handleSubmit);
            
            // Add real-time validation on blur (when user leaves field)
            const nameField = elements.contactForm.form.querySelector('#contact-name');
            const messageField = elements.contactForm.form.querySelector('#contact-message');
            
            if (nameField) {
                nameField.addEventListener('blur', () => {
                    if (nameField.value.trim().length > 0) {
                        ContactForm.validateForm(elements.contactForm.form);
                    } else {
                        ContactForm.clearError(nameField);
                    }
                });
            }
            
            if (messageField) {
                messageField.addEventListener('blur', () => {
                    if (messageField.value.trim().length > 0) {
                        ContactForm.validateForm(elements.contactForm.form);
                    } else {
                        ContactForm.clearError(messageField);
                    }
                });
            }
        }
    }
};

// Mobile Navigation Module
const MobileNavigation = {
    open() {
        const { list, toggle } = elements.navigation;
        if (!list || !toggle) return;
        
        list.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        const firstLink = list.querySelector('a');
        if (firstLink) firstLink.focus();
    },

    close() {
        const { list, toggle } = elements.navigation;
        if (!list || !toggle) return;
        
        list.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
    },

    toggle(e) {
        e.stopPropagation();
        const isOpen = elements.navigation.list?.classList.contains('open');
        isOpen ? MobileNavigation.close() : MobileNavigation.open();
    },

    handleOutsideClick(e) {
        const { list, toggle } = elements.navigation;
        if (!list?.classList.contains('open')) return;
        
        const target = e.target;
        if (target === toggle || toggle?.contains(target) || list.contains(target)) return;
        
        MobileNavigation.close();
        if (elements.ticketPopup.overlay) {
            elements.ticketPopup.overlay.setAttribute('aria-hidden', 'true');
        }
    },

    handleKeydown(e) {
        if (e.key === 'Escape') {
            if (elements.navigation.list?.classList.contains('open')) {
                MobileNavigation.close();
            }
            if (elements.ticketPopup.overlay?.style.display === 'flex') {
                TicketPopup.close();
            }
        }
    },

    init() {
        const { toggle, list } = elements.navigation;
        if (!toggle) return;

        toggle.addEventListener('click', MobileNavigation.toggle);
        document.addEventListener('click', MobileNavigation.handleOutsideClick);
        document.addEventListener('keydown', MobileNavigation.handleKeydown);

        if (list) {
            const navLinks = list.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', MobileNavigation.close);
            });
        }

        if (elements.ticketPopup.overlay) {
            elements.ticketPopup.overlay.setAttribute('aria-hidden', 'false');
        }
    }
};

// Application Initialization
const App = {
    init() {
        TicketPopup.init();
        ContactPopup.init();
        ContactForm.init();
        MobileNavigation.init();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', App.init);