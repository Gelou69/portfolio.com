// PROJECT DATA
const projectsData = {
    figma: [
        { title: "Evo Helmet Web", desc: "UI Kit & Prototype", img: "figma.jpg", link: "https://www.figma.com/design/vnKRHR0Fg0uOdBdt2cYzFt/Untitled?node-id=0-1&t=HPZnSxYHfcWVajRw-1" },
        { title: "Evo Helmet Mobile App", desc: "User Research & Design", img: "figma1.jpg", link: "https://www.figma.com/design/vnKRHR0Fg0uOdBdt2cYzFt/Untitled?node-id=0-1&t=HPZnSxYHfcWVajRw-1" },
        { title: "Iligan Food Delivery", desc: "User Research & Design", img: "figma2.jpg", link: "https://www.figma.com/design/eJQuKT5L2ConNasWxg2fCh/Untitled?node-id=45-192&t=rQCffJbPwpfqbpyZ-1" }
    ],
    canva: [
        { title: "Branding", desc: "Instagram & LinkedIn Branding", img: "canva.jpg", link: "https://www.canva.com/design/DAG6h78OpqM/6SSAnZzTQ3XHGmhfI6bdUA/edit?utm_content=DAG6h78OpqM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" },
        { title: "Certificate", desc: "Startup Presentation", img: "canva1.jpg", link: "https://www.canva.com/design/DAG5seR0BLQ/cXaUiFwY45F0POpjlIxeRg/edit?utm_content=DAG5seR0BLQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" }
    ],
    github: [
        { title: "Setup", desc: "Full Stack App with Stripe", img: "github1.jpg", link: "https://github.com/Gelou69/Evo-helmet-Shop.git" },
        { title: "All Repository", desc: "Real-time Socket.io", img: "github2.jpg", link: "https://github.com/dashboard" }
    ],
    vercel: [
        { title: "Evo Helmet Shop", desc: "High Performance Site", img: "vercel.jpg", link: "https://evo-helmet-shop.vercel.app/" },
        { title: "Iligan Food Delivery", desc: "React & Tailwind", img: "vercel1.jpg", link: "https://iligan-food-delivery.vercel.app/" }
    ]
};

// CUSTOM CURSOR
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-outline'),
    
    init() {
        if (!this.dot || !this.outline) return;
        
        document.addEventListener('mousemove', (e) => {
            this.dot.style.left = `${e.clientX}px`;
            this.dot.style.top = `${e.clientY}px`;
            
            this.outline.style.left = `${e.clientX}px`;
            this.outline.style.top = `${e.clientY}px`;
        });

        // Cursor grow on hover
        const hoverElements = document.querySelectorAll('a, button, .btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.outline.style.width = '50px';
                this.outline.style.height = '50px';
            });
            el.addEventListener('mouseleave', () => {
                this.outline.style.width = '32px';
                this.outline.style.height = '32px';
            });
        });
    }
};

// NAVBAR SCROLL EFFECT
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// MOBILE MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when visible
            if (entry.target.classList.contains('fade-in')) {
                const skillBars = entry.target.querySelectorAll('.bar-fill');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = `${width}%`;
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// MODAL FUNCTIONALITY
const modal = document.querySelector('.modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalGrid = document.getElementById('modal-grid');
const closeBtn = document.querySelector('.close-modal');
const triggers = document.querySelectorAll('.modal-trigger');

// Open modal
triggers.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        const data = projectsData[category];
        
        if (data) {
            modalTitle.innerText = category.toUpperCase() + " PROJECTS";
            modalGrid.innerHTML = data.map(item => `
                <div class="project-card">
                    <img src="${item.img}" alt="${item.title}" loading="lazy">
                    <div class="project-info">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                        <a href="${item.link}" target="_blank" rel="noopener noreferrer">
                            View Project →
                        </a>
                    </div>
                </div>
            `).join('');
            
            openModal();
        }
    });
});

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal events
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// CONTACT FORM HANDLING
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        const data = new FormData(e.target);
        
        try {
            const response = await fetch(e.target.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Success message
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
                
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            // Error message
            submitBtn.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i> Error!';
            submitBtn.style.background = 'linear-gradient(135deg, #d63031, #e17055)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
            
            console.error('Error:', error);
        }
    });
}

// EASTER EGG - DANGER LINK
const dangerText = document.querySelector(".danger-text");

if (dangerText) {   
    dangerText.addEventListener("mouseenter", () => {
        dangerText.classList.add("shake");
        setTimeout(() => dangerText.classList.remove("shake"), 400);
    });

    dangerText.addEventListener("click", (e) => {
        e.preventDefault();
        dangerText.textContent = "Seriously… 😈";
        dangerText.style.transform = "scale(1.1)";
        
        setTimeout(() => {
            window.location.href = "secret.html";
        }, 900);
    });
}

// PARALLAX EFFECT ON SCROLL
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax on hero section
            const hero = document.querySelector('#hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// LOADING ANIMATION
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    cursor.init();
});

// ADD RIPPLE EFFECT TO BUTTONS
document.querySelectorAll('.btn, .btn-main, .btn-submit').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .btn-main, .btn-submit {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// LAZY LOAD IMAGES
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// PREVENT ANIMATION ON RESIZE
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Add resize animation stopper styles
const resizeStyle = document.createElement('style');
resizeStyle.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(resizeStyle);

console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
console.log('%cMade with ❤️ by Angelou Carpio', 'color: #4ecdc4; font-size: 14px;');
