document.addEventListener("DOMContentLoaded", () => {
    setupMenuToggle();
    setupSmoothScrolling();
    setupFAQToggle();
    setupStatsAnimation();
    setupTestimonialSlider();
    hidePreloader();
});

// ✅ Toggle Mobile Menu
function setupMenuToggle() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.style.display = navLinks.style.display === "block" ? "none" : "block";
        });
    }
}

// ✅ Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupPortfolioFilter();
    setupLightbox();
});

// Portfolio Filtering
function setupPortfolioFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                const category = item.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}

// Lightbox Popup
function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");

    document.querySelectorAll(".view-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const imgSrc = btn.getAttribute("data-img");
            lightboxImg.src = imgSrc;
            lightbox.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });
}

// ✅ FAQ Toggle Function
function setupFAQToggle() {
    document.querySelectorAll(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const faqItem = button.parentElement;
            const answer = faqItem.querySelector(".faq-answer");

            // Toggle Active State
            faqItem.classList.toggle("active");

            // Change + to - when open
            button.querySelector("span").textContent = faqItem.classList.contains("active") ? "-" : "+";
        });
    });
}

// ✅ Stats Counter Animation with Scroll Trigger
function setupStatsAnimation() {
    const stats = {
        clients: 50,
        projects: 100,
        years: 5
    };
    let animated = false;

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }

    function animateCounter(id, max) {
        let count = 0;
        const element = document.getElementById(id);
        if (!element) return;
        const interval = setInterval(() => {
            element.innerText = count;
            if (count >= max) clearInterval(interval);
            count++;
        }, 30);
    }

    window.addEventListener("scroll", () => {
        const statsSection = document.querySelector(".stats");
        if (statsSection && isInViewport(statsSection) && !animated) {
            animated = true;
            Object.keys(stats).forEach(id => animateCounter(id, stats[id]));
        }
    });
}

// ✅ Testimonial Slider Functionality
function setupTestimonialSlider() {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll(".testimonial");
    const dots = document.querySelectorAll(".dot");

    if (!testimonials.length || !dots.length) return;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle("active", i === index);
            dots[i].classList.toggle("active", i === index);
        });
        currentTestimonial = index;
    }

    // Auto-Slide Testimonials Every 5 Seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Initialize First Testimonial
    showTestimonial(0);
}

// ✅ Hide Preloader When Page is Fully Loaded
function hidePreloader() {
    window.addEventListener("load", () => {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.classList.add("hidden");
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500); // Smooth fade-out effect
        }
    });
}