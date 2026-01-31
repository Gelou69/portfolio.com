// 1. PROJECT DATA
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

// 2. HERO ANIMATION
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const container = document.querySelector('#hero');

if (left && right && container) {
    left.addEventListener('mouseenter', () => container.classList.add('hover-left'));
    left.addEventListener('mouseleave', () => container.classList.remove('hover-left'));
    right.addEventListener('mouseenter', () => container.classList.add('hover-right'));
    right.addEventListener('mouseleave', () => container.classList.remove('hover-right'));
}

// 3. SCROLL ANIMATION (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.hidden-element');
hiddenElements.forEach((el) => observer.observe(el));

// 4. MODAL LOGIC
const modal = document.querySelector('.modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalGrid = document.getElementById('modal-grid');
const closeBtn = document.querySelector('.close-modal');
const triggers = document.querySelectorAll('.modal-trigger');

triggers.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        const data = projectsData[category];
        
        if (data) {
            modalTitle.innerText = category.toUpperCase() + " PROJECTS";
            modalGrid.innerHTML = data.map(item => `
                <div class="project-card">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="project-info">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                        <a href="${item.link}" target="_blank" style="color:#e94560; font-weight:bold; text-decoration:none; margin-top:10px; display:block;">View Project &rarr;</a>
                    </div>
                </div>
            `).join('');
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    });
});

const closeModalFunc = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

if (closeBtn) closeBtn.addEventListener('click', closeModalFunc);
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunc();
    });
}

// 5. CONTACT FORM HANDLING (AJAX)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const status = document.createElement('p');
        status.style.marginTop = "10px";
        status.style.color = "var(--accent)";
        
        const data = new FormData(e.target);
        
        try {
            const response = await fetch(e.target.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.textContent = "Thanks! Your message has been sent to Angelou.";
                contactForm.reset();
            } else {
                status.textContent = "Oops! There was a problem submitting your form.";
            }
        } catch (error) {
            status.textContent = "Error: Could not connect to the server.";
        }
        
        contactForm.appendChild(status);
        setTimeout(() => status.remove(), 5000);
    });
}
const dangerText = document.querySelector(".danger-text");

if (dangerText) {   
  dangerText.addEventListener("mouseenter", () => {
    dangerText.classList.add("shake");
    setTimeout(() => dangerText.classList.remove("shake"), 300);
  });

  dangerText.addEventListener("click", (e) => {
    e.preventDefault();
    dangerText.textContent = "HAHAHAHA… 😈";
    setTimeout(() => {
      window.location.href = "secret.html";
    }, 900);
  });
}

